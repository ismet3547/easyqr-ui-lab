"use client";

import { usePathname } from "next/navigation";

// Static exports serve trailing-slash URLs. Keep SSR and client navigation equal.
export function useRoutePath() {
  return usePathname().replace(/\/+$/, "") || "/";
}
