import { requestJson } from "./backend";

export const set = async (key: string, value: any): Promise<void> => {
  await requestJson<{ success: boolean }>("/kv/set", {
    method: "POST",
    body: JSON.stringify({ key, value }),
  });
};

export const getByPrefix = async (prefix: string): Promise<any[]> => {
  return requestJson<any[]>(`/kv/getByPrefix?prefix=${encodeURIComponent(prefix)}`, {
    method: "GET",
  });
};
