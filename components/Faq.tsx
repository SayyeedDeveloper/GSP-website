"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { EASE, Reveal } from "./Reveal";
import type { Key } from "@/lib/i18n";

const QA: { q: Key; a: Key }[] = [
  { q: "f1.q", a: "f1.a" },
  { q: "f10.q", a: "f10.a" },
  { q: "f3.q", a: "f3.a" },
  { q: "f5.q", a: "f5.a" },
  { q: "f7.q", a: "f7.a" },
  { q: "f11.q", a: "f11.a" },
  { q: "f8.q", a: "f8.a" },
];

export function Faq() {
  const { t } = useApp();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">{t("faq.eyebrow")}</p>
          <h2 className="heading-4 md:heading-3 mt-4">{t("faq.title")}</h2>
          <p className="body-3 mt-4 text-ink-muted">{t("faq.sub")}</p>
        </Reveal>
        <Reveal className="divide-y divide-line rounded-3xl border border-line lg:col-span-2">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="px-6">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left title-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 rounded-lg"
                  >
                    {t(item.q)}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-base ${isOpen ? "bg-brand-deep text-paper" : "bg-sand text-ink"}`}
                    >
                      <Plus weight="bold" aria-hidden />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ opacity: 0, y: reduce ? 0 : -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <p className="body-3 pb-6 text-ink-muted">
                        {t(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
