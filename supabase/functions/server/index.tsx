import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();
const KEYWORD_SPLIT_PATTERN = /[、,，/／\s\n]+/;
const MAX_KEYWORDS = 5;
const MAX_KEYWORD_LENGTH = 6;
const MAX_SUMMARY_LENGTH = 30;
const TEXT_SPLIT_PATTERN = /[\s,，.。!！?？;；、\n]+/;
const LEADING_KEYWORD_WORDS = [
  "這幾天",
  "最近",
  "今天",
  "明天",
  "昨天",
  "一直",
  "總是",
  "都在",
  "正在",
  "有一點",
  "有點",
  "有些",
  "覺得",
  "感覺",
  "因為",
  "就是",
  "可能",
  "不知道",
  "快要",
  "這個",
  "那個",
  "這次",
  "那次",
  "好像",
  "真的",
  "非常",
  "比較",
  "蠻",
  "挺",
  "我們",
  "我",
  "要",
  "想要",
  "想",
  "很",
  "好",
  "超",
  "在",
  "都",
  "也",
  "又",
  "還",
];
const TRAILING_KEYWORD_WORDS = ["了", "喔", "哦", "啦", "啊", "呀", "呢", "吧", "的", "中"];
const INNER_KEYWORD_SPLIT_PATTERN = /好像|可能|覺得|感覺|真的|非常|比較|蠻|挺|有點|有些|很/;
const EMOTION_LABEL_HINTS = [
  "矛盾",
  "嘲諷",
  "中性",
  "焦慮",
  "傷心",
  "難過",
  "煩躁",
  "疲憊",
  "開心",
  "期待",
  "不安",
  "委屈",
  "平靜",
  "釋放",
  "混亂",
  "安心",
];

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

function normalizeKeywords(result: Record<string, unknown>) {
  const rawKeywords = Array.isArray(result.keywords)
    ? result.keywords
    : typeof result.keyword === "string"
      ? result.keyword.split(KEYWORD_SPLIT_PATTERN)
      : [];

  return dedupeKeywordList(Array.from(
    new Set(
      rawKeywords
        .map((value) => Array.from(String(value ?? "").trim()).slice(0, MAX_KEYWORD_LENGTH).join(""))
        .filter(Boolean),
    ),
  )).slice(0, MAX_KEYWORDS);
}

function dedupeKeywordList(keywords: string[]) {
  return keywords.filter((keyword, index) => {
    return !keywords.some((other, otherIndex) => {
      return otherIndex !== index && other.length > keyword.length && other.includes(keyword);
    });
  });
}

function trimExtractedKeyword(value: string) {
  let text = value.trim();
  let changed = true;

  while (changed) {
    changed = false;

    for (const word of LEADING_KEYWORD_WORDS) {
      if (text.startsWith(word) && text.length > word.length) {
        text = text.slice(word.length).trim();
        changed = true;
      }
    }

    for (const word of TRAILING_KEYWORD_WORDS) {
      if (text.endsWith(word) && text.length > word.length) {
        text = text.slice(0, -word.length).trim();
        changed = true;
      }
    }
  }

  return Array.from(text).slice(0, MAX_KEYWORD_LENGTH).join("");
}

function extractKeywordsFromSegment(segment: string) {
  const compactSegment = trimExtractedKeyword(segment);
  if (!compactSegment) return [];

  const splitParts = compactSegment
    .split(INNER_KEYWORD_SPLIT_PATTERN)
    .map(trimExtractedKeyword)
    .filter((keyword) => keyword.length >= 2);

  return splitParts.length > 0 ? splitParts : [compactSegment];
}

function extractKeywordsFromText(text: string) {
  return Array.from(
    new Set(
      text
        .split(TEXT_SPLIT_PATTERN)
        .flatMap(extractKeywordsFromSegment)
        .filter((keyword) => keyword.length >= 2),
    ),
  ).slice(0, MAX_KEYWORDS);
}

function normalizeEmotionLabel(result: Record<string, unknown>, keywords: string[]) {
  const sourceText = [
    typeof result.emotionLabel === "string" ? result.emotionLabel : "",
    typeof result.summary === "string" ? result.summary : "",
    ...keywords,
  ].join(" ");
  const hinted = EMOTION_LABEL_HINTS.find((label) => sourceText.includes(label));
  if (hinted) return hinted;

  const raw = typeof result.emotionLabel === "string" ? result.emotionLabel.trim() : "";
  return Array.from(raw.replace(/[，,。！？!?、\s]/g, "")).slice(0, 4).join("") || "中性";
}

function normalizeSummary(value: unknown) {
  const fallback = "我感覺到你正在整理一段不容易的心情。";
  const raw = typeof value === "string" && value.trim() ? value.trim() : fallback;
  const chars = Array.from(raw);
  if (chars.length <= MAX_SUMMARY_LENGTH) return raw;

  const trimmed = chars.slice(0, MAX_SUMMARY_LENGTH).join("").replace(/[，,、；;：:]$/, "");
  return /[。！？!?]$/.test(trimmed) ? trimmed : `${trimmed}。`;
}

app.use('*', logger(console.log));

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
  return c.json({ status: "ok", keywordVersion: "literal-keywords-v2" });
});

app.post("/make-server-5234bb79/analyze", async (c) => {
  try {
    const authError = await requireAuthenticatedUser(c);
    if (authError) return authError;

    const { text } = await c.req.json();
    if (!text) {
      return c.json({ error: "Text is required" }, 400);
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return c.json({ error: "GEMINI_API_KEY is not set" }, 500);
    }
    const GEMINI_MODELS = (Deno.env.get("GEMINI_MODELS") || "gemini-2.5-flash,gemini-2.5-flash-lite,gemini-2.0-flash")
      .split(",")
      .map((model) => model.trim())
      .filter(Boolean);

    const FLOWERS = [
      "罌粟花 Poppy：疲憊、麻木、想暫時逃離",
      "勿忘我 Forget-me-not：思念、失落、捨不得",
      "金盞花 Marigold：焦慮、煩躁、等待被安慰",
      "水仙花 Narcissus：自我懷疑、孤單、需要被看見",
      "曼陀羅 Datura：壓抑、混亂、危險的吸引力",
      "蒲公英 Dandelion：釋放、重新開始、輕盈",
      "繡球花 Hydrangea：複雜、委屈、想被理解",
      "向日葵 Sunflower：希望、鼓勵、想靠近光",
      "玫瑰 Rose：愛、受傷、強烈感受",
      "劍蘭 Gladiolus：撐住、防衛、保護自己",
      "鬱金香 Tulip：溫柔、和解、慢慢復原",
      "薰衣草 Lavender：平靜、安撫、需要休息",
    ];

    const prompt = `
你是「情緒碎紙機」的花卉情緒分析器。請分析使用者輸入："${text}"

任務：
1. 從使用者原文中擷取 1 到 5 個具體關鍵字，使用繁體中文，每個最多 6 個字。關鍵字必須優先取自原文中明確出現的事件、主題、對象、狀態或情緒詞，可以合理縮短，但不要改寫成抽象分類。不要回傳完整句子，不要重複。
   正確例子：「要畢業了，最近都在找工作，好焦慮喔」=> ["畢業", "找工作", "焦慮"]
   錯誤例子：["困惑", "不確定", "迷茫"]，因為這些不是使用者原文的重點詞。
2. 用 2 到 4 個字標出摘要第一行的情緒語氣 emotionLabel，例如「矛盾」、「嘲諷」、「中性」、「焦慮」、「釋放」。不要超過 4 個字。
3. 寫一段溫柔、具體、像 app 內回饋文字的摘要，使用繁體中文，18 到 28 個字。
4. 從下列 12 種花中選一個最符合的 flowerIndex，只能回傳 0 到 11 的整數。
${FLOWERS.map((f, i) => `${i}. ${f}`).join("\n")}

請只回傳 JSON，不要加 markdown，不要加任何說明：
{
  "keywords": ["畢業", "找工作", "焦慮"],
  "keyword": "畢業、找工作、焦慮",
  "emotionLabel": "焦慮",
  "summary": "給使用者的短句",
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
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
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

    const result = JSON.parse(resultText);
    const extractedKeywords = extractKeywordsFromText(text);
    const keywords = dedupeKeywordList(Array.from(new Set([...extractedKeywords, ...normalizeKeywords(result)]))).slice(0, MAX_KEYWORDS);
    const keyword = keywords.join("、") || "感受";
    const emotionLabel = normalizeEmotionLabel(result, keywords);
    const parsedFlowerIndex = Number(result.flowerIndex);
    const flowerIndex = Number.isInteger(parsedFlowerIndex)
      ? Math.min(11, Math.max(0, parsedFlowerIndex))
      : 0;

    return c.json({
      ...result,
      keywords: keywords.length ? keywords : [keyword],
      keyword,
      emotionLabel,
      summary: normalizeSummary(result.summary),
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
