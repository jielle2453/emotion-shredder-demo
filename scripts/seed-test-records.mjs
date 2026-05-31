import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);

const projectId = env.VITE_SUPABASE_PROJECT_ID;
const functionSlug = env.VITE_SUPABASE_FUNCTION_SLUG || "make-server-5234bb79";
const publishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY;
const anonKey = env.VITE_SUPABASE_ANON_KEY || publishableKey;
const baseUrl = env.VITE_BACKEND_URL || `https://${projectId}.supabase.co/functions/v1/${functionSlug}`;
const indexes = process.argv.slice(2).map(Number).filter(Number.isInteger);
const flowerIndexes = indexes.length > 0 ? indexes : [0, 5, 11];

if (!projectId || !publishableKey || !anonKey) {
  throw new Error("Missing Supabase env values in .env.local");
}

for (const flowerIndex of flowerIndexes) {
  const id = `record_seed_${Date.now()}_${flowerIndex}`;
  const record = {
    id,
    text: `Seed test flower ${flowerIndex}`,
    date: new Date().toISOString(),
    keyword: "測試",
    summary: "這是一筆測試花朵紀錄。",
    flowerIndex,
  };

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/kv/set`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${anonKey}`,
      apikey: publishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: id, value: record }),
  });

  if (!response.ok) {
    throw new Error(`Failed to seed ${id}: ${await response.text()}`);
  }

  console.log(`Seeded ${id}`);
}
