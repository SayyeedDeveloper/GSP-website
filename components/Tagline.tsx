"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useApp } from "./Providers";

/** B11: tagline reveal. Each word turns from muted to full colour as it crosses a trigger line. */
export function Tagline() {
  const { t, lang } = useApp();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const words = t("tagline").split(/\s+/);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".tw-word"));
    if (reduce || !("IntersectionObserver" in window)) {
      spans.forEach((s) => s.classList.add("on"));
      return;
    }
    spans.forEach((s) => s.classList.remove("on"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -40% 0px" }
    );
    spans.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [lang, reduce]);

  return (
    <section className="weave px-4 py-24 md:px-8 md:py-24" aria-label="Tagline">
      <div className="mx-auto max-w-6xl">
        <p ref={ref} className="heading-4 md:heading-1 max-w-[680px] md:max-w-4xl">
          {words.map((w, i) => (
            <span key={`${lang}-${i}`}>
              <span className="tw-word">{w}</span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
