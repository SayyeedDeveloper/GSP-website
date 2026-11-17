"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Flask, SealCheck, Truck } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { EASE } from "./Reveal";
import type { Key } from "@/lib/i18n";

const CHIPS: { key: Key; className: string }[] = [
  { key: "chip.flour", className: "left-4 top-6 md:left-8 md:top-10" },
  { key: "chip.grain", className: "right-4 top-16 md:right-8 md:top-24" },
  { key: "chip.onion", className: "left-6 bottom-32 md:left-10 md:bottom-36" },
  { key: "chip.salt", className: "right-6 bottom-24 md:right-12 md:bottom-28" },
];

export function Hero() {
  const { t, lang } = useApp();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bagY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const bagRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -4]);

  const rise = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: d },
  });

  return (
    <section id="top" ref={ref} className="overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p className="eyebrow" {...rise(0)}>
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1 className="hero-gradient heading-3 md:heading-1 mt-4 max-w-[680px] pb-1" {...rise(0.08)}>
            {t("hero.l1")} {lang === "en" && <br className="hidden md:block" />}
            {t("hero.l2")}
          </motion.h1>
          <motion.p className="body-3 md:title-2 mt-6 max-w-[680px] text-ink-muted md:font-normal" {...rise(0.16)}>
            {t("hero.sub")}
          </motion.p>
          <motion.div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" {...rise(0.24)}>
            <a href="#quote" className="btn-primary button-md group px-6 py-3">
              {t("cta")}
              <ArrowRight weight="bold" className="transition-transform duration-300 ease-base group-hover:translate-x-1" aria-hidden />
            </a>
            <p className="caption-2 text-ink-muted">{t("hero.note")}</p>
          </motion.div>
          <motion.ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 caption-1 text-ink-muted" aria-label="Proof" {...rise(0.32)}>
            <li className="flex items-center gap-2"><SealCheck weight="fill" className="text-lg text-brand-deep" aria-hidden />{t("proof.1")}</li>
            <li className="flex items-center gap-2"><Flask weight="fill" className="text-lg text-brand-deep" aria-hidden />{t("proof.2")}</li>
            <li className="flex items-center gap-2"><Truck weight="fill" className="text-lg text-brand-deep" aria-hidden />{t("proof.3")}</li>
          </motion.ul>
        </div>

        <motion.div
          className="weave relative aspect-square w-full overflow-hidden rounded-4xl md:aspect-[4/5] lg:aspect-square"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <motion.div style={{ y: bagY, rotate: bagRotate }} className="absolute inset-12 md:inset-16">
            <Image
              src="/assets/bags-green.webp"
              alt="Green woven polypropylene bags, two filled and three folded flat"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-contain drop-shadow-xl"
            />
          </motion.div>

          {CHIPS.map((c, i) => (
            <motion.span
              key={c.key}
              className={`absolute rounded-full border border-line bg-paper px-3 py-1 caption-1 shadow-sm ${c.className}`}
              initial={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.1 }}
            >
              {t(c.key)}
            </motion.span>
          ))}

          <motion.div
            className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-paper p-2 pr-4 shadow-lg sm:inset-x-auto sm:left-4"
            {...rise(0.9)}
          >
            <Image src="/assets/oqQop.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
            <div>
              <p className="title-4">{t("hero.card.t")}</p>
              <p className="caption-5 text-ink-muted">{t("hero.card.d")}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
