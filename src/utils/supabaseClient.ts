import { createClient } from "@supabase/supabase-js";
import { projectId as fallbackProjectId, publicAnonKey as fallbackAnonKey } from "../../utils/supabase/info";

const env = import.meta.env as Record<string, string | undefined>;

const projectId = env.VITE_SUPABASE_PROJECT_ID || fallbackProjectId;
const supabaseUrl = env.VITE_SUPABASE_URL || `https://${projectId}.supabase.co`;
const supabaseKey =
  env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  env.VITE_SUPABASE_ANON_KEY ||
  fallbackAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
  },
});
