"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { EASE, Reveal } from "./Reveal";
import { PRODUCTS, USES } from "@/lib/products";

export function BagFinder() {
  const { t, chooseProduct } = useApp();
  const reduce = useReducedMotion();
  const [use, setUse] = useState(0);
  const productId = USES[use].product;
  const p = PRODUCTS[productId];

  return (
    <section id="finder" className="px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{t("picker.eyebrow")}</p>
          <h2 className="heading-4 md:heading-2 mt-4">{t("picker.title")}</h2>
          <p className="body-3 mt-4 max-w-md text-ink-muted">{t("picker.sub")}</p>

          <div role="radiogroup" aria-label={t("picker.title")} className="mt-8 flex flex-wrap gap-2">
            {USES.map((u, i) => {
              const on = i === use;
              return (
                <button
                  key={u.key}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setUse(i)}
                  className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 button-sm transition-colors duration-300 ease-base active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30 ${
                    on ? "border-brand-deep text-paper" : "border-line text-ink hover:border-ink-faint"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="finder-pill"
                      className="absolute inset-0 rounded-full bg-brand-deep"
                      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {on && <Check weight="bold" aria-hidden />}
                    {t(u.key)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="weave rounded-4xl p-4" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={productId}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -16 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="rounded-2xl bg-paper p-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-brand-soft">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className={p.fit === "contain" ? "object-contain p-6" : productId === "mesh" ? "object-cover object-top" : "object-cover"}
                  />
                  <span className="absolute left-2 top-2 rounded-md bg-paper px-2 py-1 caption-3 uppercase tracking-wide text-brand-deep">
                    {t("picker.rec")}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="heading-6">{t(p.title)}</h3>
                  <p className="body-3 mt-2 text-ink-muted">{t(p.why)}</p>
                  <button type="button" onClick={() => chooseProduct(productId, true)} className="btn-primary button-md group mt-6 w-full py-3 sm:w-auto sm:px-6">
                    {t("picker.cta")}
                    <ArrowRight weight="bold" className="transition-transform duration-300 ease-base group-hover:translate-x-1" aria-hidden />
                  </button>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
