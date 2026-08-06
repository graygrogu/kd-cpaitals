import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en";
import { hi } from "./hi";
import type { Dict } from "./types";

export type Lang = "en" | "hi";
const dicts: Record<Lang, Dict> = { en, hi };
const STORAGE_KEY = "kdc-lang";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void; toggle: () => void };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "hi") return saved;
    return navigator.language?.toLowerCase().startsWith("hi") ? "hi" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, t: dicts[lang], setLang, toggle: () => setLang((l) => (l === "en" ? "hi" : "en")) }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
