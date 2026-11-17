"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CheckCircle, SealCheck } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import type { Key } from "@/lib/i18n";

export function Quality() {
  const { t } = useApp();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 200]);
  const stamp = t("q.stamp");

  return (
    <section id="quality" ref={ref} className="px-4 pb-20 md:px-8 md:pb-24">
      <div className="weave-dark mx-auto grid max-w-6xl items-center gap-12 rounded-4xl p-6 text-paper md:p-12 lg:grid-cols-2">
        <Reveal>
          <p className="caption-3 uppercase tracking-widest text-brand-mint">{t("q.eyebrow")}</p>
          <h2 className="heading-4 md:heading-3 mt-4">{t("q.title")}</h2>
          <p className="body-3 mt-4 text-paper/75">{t("q.d")}</p>
          <ul className="mt-8 space-y-4">
            {(["q.l1", "q.l2", "q.l3"] as Key[]).map((k) => (
              <li key={k} className="flex gap-3 body-2">
                <CheckCircle weight="fill" className="mt-0.5 shrink-0 text-xl text-brand-mint" aria-hidden />
                {t(k)}
              </li>
            ))}
          </ul>
          <p className="caption-2 mt-8 text-paper/60">
            <span className="tbd">{"{{certificate_scans}}"}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/assets/bg.jpg" alt="Stacks of filled white woven polypropylene bags in a warehouse" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div
            className="absolute -bottom-8 -left-4 flex h-32 w-32 items-center justify-center rounded-full bg-brand-mint text-brand-ink shadow-xl md:-left-8 md:h-40 md:w-40"
            aria-hidden
          >
            <motion.svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full" style={{ rotate }}>
              <defs>
                <path id="stamp-circle" d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
              </defs>
              <text className="fill-current" style={{ fontSize: 10, fontWeight: 600 }}>
                <textPath href="#stamp-circle" textLength="372" lengthAdjust="spacing">{stamp}</textPath>
              </text>
            </motion.svg>
            <SealCheck weight="fill" className="h-8 w-8 md:h-10 md:w-10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
