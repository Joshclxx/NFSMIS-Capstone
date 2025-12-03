// src/lib/auth.ts
import { cookies } from "next/headers";
import { cache } from "react";
import { getSession } from "@/database/queries/sessionQueries";

// cache() deduplicates requests if called multiple times in one render pass
export const fetchSession = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;
  return await getSession(token);
});
