import type { EmotionRecord } from "./backend";
import { supabase } from "./supabaseClient";

export type StoredEmotionRecord = EmotionRecord;

type EmotionRecordRow = {
  id: string;
  user_id: string;
  text: string;
  date: string;
  keyword: string | null;
  keywords: string[] | null;
  emotion_label: string | null;
  summary: string | null;
  flower_index: number;
  note: string | null;
  error: string | null;
};

function fromRow(row: EmotionRecordRow): StoredEmotionRecord {
  return {
    id: row.id,
    text: row.text,
    date: row.date,
    keyword: row.keyword ?? "",
    keywords: row.keywords ?? [],
    emotionLabel: row.emotion_label ?? "",
    summary: row.summary ?? "",
    flowerIndex: row.flower_index,
    note: row.note ?? "",
    error: row.error ?? undefined,
  };
}

async function getCurrentUserId() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user?.id ?? null;
}

export async function getEmotionRecords(): Promise<StoredEmotionRecord[]> {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from("emotion_records")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as EmotionRecordRow[])
    .map(fromRow)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function saveEmotionRecord(record: StoredEmotionRecord): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("請先登入");

  const { error } = await supabase
    .from("emotion_records")
    .upsert(
      {
        id: record.id,
        user_id: userId,
        text: record.text,
        date: record.date,
        keyword: record.keyword ?? "",
        keywords: record.keywords ?? [],
        emotion_label: record.emotionLabel ?? "",
        summary: record.summary ?? "",
        flower_index: record.flowerIndex,
        note: record.note ?? "",
        error: record.error ?? null,
      },
      { onConflict: "id" },
    );

  if (error) throw error;
}

export async function updateEmotionRecordNote(id: string, note: string): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("請先登入");

  const { error } = await supabase
    .from("emotion_records")
    .update({ note })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function deleteAllEmotionRecords(): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) return;

  const { error } = await supabase
    .from("emotion_records")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}

export function localDateKey(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayLocalDateKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function revealedEmotionRecords(records: StoredEmotionRecord[]): StoredEmotionRecord[] {
  const today = todayLocalDateKey();
  return records.filter((record) => localDateKey(record.date) !== today);
}

function recordTime(record: StoredEmotionRecord) {
  const time = new Date(record.date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export function recordsForLocalDate(records: StoredEmotionRecord[], dateKey: string): StoredEmotionRecord[] {
  return records
    .filter((record) => localDateKey(record.date) === dateKey)
    .sort((a, b) => recordTime(a) - recordTime(b));
}

export function dailyFinalEmotionRecords(records: StoredEmotionRecord[]): StoredEmotionRecord[] {
  const latestByDate = new Map<string, StoredEmotionRecord>();

  for (const record of records) {
    const key = localDateKey(record.date);
    const current = latestByDate.get(key);

    if (!current || recordTime(record) >= recordTime(current)) {
      latestByDate.set(key, record);
    }
  }

  return Array.from(latestByDate.values()).sort((a, b) => recordTime(b) - recordTime(a));
}

export function uniqueFlowerIndexes(records: StoredEmotionRecord[], flowerCount: number): number[] {
  return Array.from(
    new Set(
      records
        .map((record) => record.flowerIndex)
        .filter((index) => index >= 0 && index < flowerCount),
    ),
  );
}

export function recordsInMonth(records: StoredEmotionRecord[], year: number, month: number): StoredEmotionRecord[] {
  return records.filter((record) => {
    const date = new Date(record.date);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });
}
