"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DICTS, LANGS, type Key, type Lang, type ProductId } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
  product: ProductId;
  chooseProduct: (p: ProductId, scroll?: boolean) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [product, setProduct] = useState<ProductId>("plain");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gsp-lang") as Lang | null;
      if (saved && LANGS.includes(saved)) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("gsp-lang", l);
    } catch {}
  }, []);

  const t = useCallback((k: Key) => DICTS[lang][k] ?? DICTS.en[k], [lang]);

  const chooseProduct = useCallback((p: ProductId, scroll = false) => {
    setProduct(p);
    if (scroll) {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 700);
    }
  }, []);

  return <AppCtx.Provider value={{ lang, setLang, t, product, chooseProduct }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside <Providers>");
  return ctx;
}
