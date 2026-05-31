import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

const MAX_KEYWORDS = 5;
const KEYWORD_SPLIT_PATTERN = /[、,，/／\s\n]+/;
const CJK_MAX_KEYWORD_LENGTH = 6;
const LATIN_MAX_KEYWORD_LENGTH = 18;

type OutputLanguage = "zh" | "en";

async function requireAuthenticatedUser(c: any) {
  const authorization = c.req.header("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

  if (!token) {
    return c.json({ error: "Authentication required" }, 401);
  }

  if (!supabaseUrl || !anonKey) {
    return c.json({ error: "Supabase auth env is not configured" }, 500);
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: anonKey,
    },
  });

  if (!response.ok) {
    return c.json({ error: "Authentication required" }, 401);
  }

  return null;
}

function detectLanguage(text: string): OutputLanguage {
  const latinCount = (text.match(/[A-Za-z]/g) ?? []).length;
  const cjkCount = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  return latinCount > cjkCount ? "en" : "zh";
}

function hasLatinText(text: string) {
  return /[A-Za-z]/.test(text);
}

function trimKeyword(value: unknown, language: OutputLanguage) {
  const text = String(value ?? "")
    .trim()
    .replace(/^["'「『]|["'」』]$/g, "")
    .replace(/[。！？!?；;：:]+$/g, "")
    .trim();

  if (!text) return "";

  const maxLength = language === "en" || hasLatinText(text)
    ? LATIN_MAX_KEYWORD_LENGTH
    : CJK_MAX_KEYWORD_LENGTH;

  return Array.from(text).slice(0, maxLength).join("");
}

function normalizeKeywords(result: Record<string, unknown>, language: OutputLanguage) {
  const rawKeywords = Array.isArray(result.keywords)
    ? result.keywords
    : typeof result.keyword === "string"
      ? result.keyword.split(KEYWORD_SPLIT_PATTERN)
      : [];

  return Array.from(
    new Set(rawKeywords.map((value) => trimKeyword(value, language)).filter(Boolean)),
  ).slice(0, MAX_KEYWORDS);
}

function fallbackKeywords(text: string, language: OutputLanguage) {
  if (language === "en") {
    const stopwords = new Set([
      "the", "and", "for", "that", "this", "with", "have", "about", "from", "just", "really", "feel", "feeling", "been", "into",
    ]);
    return Array.from(
      new Set(
        text
          .toLowerCase()
          .match(/[a-z][a-z'-]{2,}/g)
          ?.filter((word) => !stopwords.has(word))
          .map((word) => trimKeyword(word, language)) ?? [],
      ),
    ).slice(0, MAX_KEYWORDS);
  }

  const compact = text.replace(/[\s，,。！？!?、；;：:「」『』"']/g, "");
  return compact ? [Array.from(compact).slice(0, CJK_MAX_KEYWORD_LENGTH).join("")] : [];
}

function normalizeEmotionLabel(value: unknown, language: OutputLanguage) {
  const fallback = language === "en" ? "Neutral" : "中性";
  const raw = String(value ?? "")
    .trim()
    .replace(/^["'「『]|["'」』]$/g, "")
    .replace(/[。！？!?；;：:]+$/g, "")
    .trim();

  if (!raw) return fallback;

  if (language === "en" || hasLatinText(raw)) {
    return raw.split(/\s+/).slice(0, 2).join(" ") || fallback;
  }

  return Array.from(raw.replace(/[，,。！？!?、\s]/g, "")).slice(0, 4).join("") || fallback;
}

function normalizeSummary(value: unknown, language: OutputLanguage) {
  const fallback = language === "en"
    ? "I have helped you shred that heavy feeling."
    : "已經幫你把壞情緒通通碎掉了！";
  const raw = String(value ?? "").trim() || fallback;
  const maxLength = language === "en" || hasLatinText(raw) ? 160 : 46;
  const chars = Array.from(raw);

  if (chars.length <= maxLength) return raw;

  const trimmed = chars.slice(0, maxLength).join("").replace(/[，,、；;：:\s]+$/g, "");
  if (language === "en" || hasLatinText(trimmed)) {
    return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
  }

  return /[。！？!?]$/.test(trimmed) ? trimmed : `${trimmed}。`;
}

function parseGeminiJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Gemini returned invalid JSON");
    return JSON.parse(match[0]);
  }
}

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey", "x-client-info"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-5234bb79/health", (c) => {
  return c.json({ status: "ok", keywordVersion: "input-language-v1" });
});

app.post("/make-server-5234bb79/analyze", async (c) => {
  try {
    const authError = await requireAuthenticatedUser(c);
    if (authError) return authError;

    const { text } = await c.req.json();
    const userText = String(text ?? "").trim();
    if (!userText) {
      return c.json({ error: "Text is required" }, 400);
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return c.json({ error: "GEMINI_API_KEY is not set" }, 500);
    }

    const outputLanguage = detectLanguage(userText);
    const languageLabel = outputLanguage === "en" ? "English" : "Traditional Chinese";
    const GEMINI_MODELS = (Deno.env.get("GEMINI_MODELS") || "gemini-2.5-flash,gemini-2.5-flash-lite,gemini-2.0-flash")
      .split(",")
      .map((model) => model.trim())
      .filter(Boolean);

    const flowerGuide = [
      "0. Poppy / 罌粟花: regret, goodbye, cherishing present happiness",
      "1. Forget-me-not / 勿忘我: memory, missing someone, fear of being forgotten",
      "2. Marigold / 金盞花: sadness, loss, comparison, jealousy",
      "3. Narcissus / 水仙花: self-worth, confidence, turning back to yourself",
      "4. Datura / 曼陀羅: complicated feelings, darkness, contradiction, uncertainty",
      "5. Dandelion / 蒲公英: release, freedom, wandering, letting go",
      "6. Hydrangea / 繡球花: mixed emotions, contradiction, sincerity, nuance",
      "7. Sunflower / 向日葵: optimism, courage, encouragement, light",
      "8. Rose / 玫瑰: love, longing, tenderness, hurt, being cherished",
      "9. Gladiolus / 劍蘭: pressure, courage, endurance, standing tall",
      "10. Tulip / 鬱金香: gentle beginning, transition, hope and unease",
      "11. Lavender / 薰衣草: calm, anxiety, rest, settling down",
    ].join("\n");

    const prompt = `
You are the emotion analysis engine for an app called Emotion Shredder.

User text:
${userText}

Output language: ${languageLabel}. Use the same dominant language as the user text for "keywords", "keyword", "emotionLabel", and "summary". Do not translate old or imagined content. If the user text is English, return English. If it is Traditional Chinese, return Traditional Chinese.

Tasks:
1. Extract 1 to 5 real keywords from the user's text.
   - Traditional Chinese keywords: 2 to 6 Chinese characters each.
   - English keywords: short words or phrases, 1 to 3 words each.
   - Do not include filler phrases such as "this project seems" or "I feel"; keep the concrete part, such as "project".
2. Create one short emotionLabel.
   - Traditional Chinese: 2 to 4 characters, like "矛盾", "焦慮", "平靜".
   - English: 1 to 2 words, like "Contradiction", "Anxiety", "Calm".
3. Create one gentle summary sentence.
   - Traditional Chinese: keep it short enough for about 3 lines in a mobile card.
   - English: keep it under 22 words.
4. Choose exactly one flowerIndex from this guide:
${flowerGuide}

Return JSON only:
{
  "keywords": ["keyword1", "keyword2"],
  "keyword": "keyword1、keyword2",
  "emotionLabel": "short label",
  "summary": "short sentence",
  "flowerIndex": 0
}
`;

    let resultText = "";
    let lastGeminiError = "";

    for (const model of GEMINI_MODELS) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }],
          }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (resultText) break;
        lastGeminiError = `${model}: Gemini returned an empty response`;
        continue;
      }

      const err = await response.text();
      lastGeminiError = `${model}: ${err}`;
      console.error("Gemini API Error:", lastGeminiError);

      if (![429, 500, 502, 503, 504].includes(response.status)) {
        break;
      }
    }

    if (!resultText) {
      return c.json({ error: "Gemini API error", details: lastGeminiError }, 500);
    }

    const result = parseGeminiJson(resultText);
    let keywords = normalizeKeywords(result, outputLanguage);
    if (!keywords.length) keywords = fallbackKeywords(userText, outputLanguage);
    if (!keywords.length) keywords = [outputLanguage === "en" ? "feeling" : "情緒"];

    const keyword = keywords.join(outputLanguage === "en" ? ", " : "、");
    const parsedFlowerIndex = Number(result.flowerIndex);
    const flowerIndex = Number.isInteger(parsedFlowerIndex)
      ? Math.min(11, Math.max(0, parsedFlowerIndex))
      : 0;

    return c.json({
      keywords,
      keyword,
      emotionLabel: normalizeEmotionLabel(result.emotionLabel, outputLanguage),
      summary: normalizeSummary(result.summary, outputLanguage),
      flowerIndex,
    });
  } catch (err: any) {
    console.error("Error in analyze:", err);
    return c.json({ error: err.message }, 500);
  }
});

app.post("/make-server-5234bb79/kv/set", async (c) => {
  try {
    const { key, value } = await c.req.json();
    if (!key) {
      return c.json({ error: "Key is required" }, 400);
    }
    await kv.set(key, value);
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

app.get("/make-server-5234bb79/kv/getByPrefix", async (c) => {
  try {
    const prefix = c.req.query("prefix");
    if (!prefix) {
      return c.json({ error: "Prefix is required" }, 400);
    }
    const data = await kv.getByPrefix(prefix);
    return c.json(data);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

Deno.serve(app.fetch);
