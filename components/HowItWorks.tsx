"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ChatCircleText, Package, PaperPlaneTilt, type Icon } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import type { Key } from "@/lib/i18n";

const STEPS: { icon: Icon; t: Key; d: Key }[] = [
  { icon: PaperPlaneTilt, t: "s1.t", d: "s1.d" },
  { icon: ChatCircleText, t: "s2.t", d: "s2.d" },
  { icon: Package, t: "s3.t", d: "s3.d" },
];

export function HowItWorks() {
  const { t } = useApp();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 50%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="px-4 py-20 md:px-8 md:py-24" aria-labelledby="how-title">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 id="how-title" className="heading-4 md:heading-2 mt-4">{t("how.title")}</h2>
          <p className="body-3 mt-4 max-w-md text-ink-muted">{t("how.sub")}</p>
        </Reveal>

        <ol ref={ref} className="relative space-y-6 pl-16">
          <span className="absolute bottom-6 left-6 top-6 w-0.5 rounded-full bg-line" aria-hidden />
          <motion.span
            className="absolute bottom-6 left-6 top-6 w-0.5 origin-top rounded-full bg-brand-deep"
            style={{ scaleY: reduce ? 1 : progress }}
            aria-hidden
          />
          {STEPS.map(({ icon: I, t: tk, d }, i) => (
            <Reveal as="li" key={tk} delay={i * 0.06} className="relative rounded-3xl bg-sand p-6 md:p-8">
              <span className="absolute -left-16 top-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-paper bg-brand-deep text-paper">
                <I size={20} weight="bold" aria-hidden />
              </span>
              <span className="caption-3 text-brand-deep">0{i + 1}</span>
              <h3 className="heading-5 mt-2">{t(tk)}</h3>
              <p className="body-3 mt-2 text-ink-muted">{t(d)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
