"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useApp } from "./Providers";
import { EASE } from "./Reveal";
import { LANGS, type Key } from "@/lib/i18n";

const LINKS: { id: string; key: Key }[] = [
  { id: "products", key: "nav.products" },
  { id: "finder", key: "nav.picker" },
  { id: "quality", key: "nav.quality" },
  { id: "delivery", key: "nav.delivery" },
  { id: "faq", key: "nav.faq" },
];

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useApp();
  return (
    <div role="group" aria-label={t("language")} className={`flex rounded-lg bg-sand p-0.5 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-md px-2 py-1 caption-3 uppercase transition-colors duration-300 ease-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
            lang === l ? "bg-paper text-ink shadow-sm" : "text-ink-faint hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useApp();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const top = document.getElementById("top");
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-45% 0px -50% 0px" });
    if (top) topIo.observe(top);
    return () => {
      io.disconnect();
      topIo.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const step = Math.min(0.06, 0.4 / (LINKS.length + 1));

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Main"
          className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl border border-line bg-paper/75 p-2 shadow-sm backdrop-blur-xl"
        >
          <a
            href="#top"
            className="flex items-center gap-2 rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
            aria-label="Great Soatobod Production"
          >
            <Image src="/assets/mark.png" alt="" width={38} height={32} className="h-8 w-auto" priority />
            <span className="title-4 hidden sm:inline">Great Soatobod Production</span>
            <span className="title-4 sm:hidden">GSP</span>
          </a>

          <ul className="hidden items-center lg:flex">
            {LINKS.map(({ id, key }) => (
              <li key={id} className="relative">
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-sand"
                    transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                  />
                )}
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className={`relative block rounded-lg px-3 py-2 button-sm transition-colors duration-300 ease-base focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 ${
                    active === id ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangSwitch className="hidden sm:flex" />
            <a href="#quote" className="btn-primary button-sm hidden sm:inline-flex">
              {t("cta")}
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("menu")}
              className="btn-ghost h-10 w-10 p-0 lg:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-0 block h-0.5 w-5 rounded-full bg-ink"
                  animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 block h-0.5 w-5 rounded-full bg-ink"
                  animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-6">
              {LINKS.map(({ id, key }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * step }}
                >
                  <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-2 heading-4">
                    {t(key)}
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="flex flex-col gap-4 pt-6"
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: LINKS.length * step }}
              >
                <LangSwitch className="self-start" />
                <a href="#quote" onClick={() => setOpen(false)} className="btn-primary button-md w-full py-3">
                  {t("cta")}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
