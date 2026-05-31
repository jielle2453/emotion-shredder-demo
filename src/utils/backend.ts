import { projectId as fallbackProjectId, publicAnonKey as fallbackAnonKey } from "../../utils/supabase/info";
import { supabase } from "./supabaseClient";

const env = import.meta.env as Record<string, string | undefined>;

const projectId = env.VITE_SUPABASE_PROJECT_ID || fallbackProjectId;
const apiKey =
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  fallbackAnonKey;
const authorizationKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  fallbackAnonKey;
const functionSlug = env.VITE_SUPABASE_FUNCTION_SLUG || "make-server-5234bb79";
const backendUrl =
  env.VITE_BACKEND_URL ||
  `https://${projectId}.supabase.co/functions/v1/${functionSlug}`;

const SERVER_URL = backendUrl.replace(/\/$/, "");

export type EmotionAnalysis = {
  keyword: string;
  keywords?: string[];
  emotionLabel?: string;
  summary: string;
  flowerIndex: number;
};

export type EmotionRecord = EmotionAnalysis & {
  id: string;
  text: string;
  date: string;
  note?: string;
  error?: string;
};

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { data: sessionData } = await supabase.auth.getSession();
  const bearerToken = sessionData.session?.access_token || authorizationKey;

  const res = await fetch(`${SERVER_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      apikey: apiKey,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.error ||
      data?.message ||
      `Backend request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}

export async function analyzeEmotion(text: string): Promise<EmotionAnalysis> {
  return requestJson<EmotionAnalysis>("/analyze", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}
