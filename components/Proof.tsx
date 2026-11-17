"use client";

import { Quotes } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";

/** No testimonials or client logos exist on the source site, so these stay as marked placeholders (B8). */
export function Proof() {
  const { t } = useApp();
  return (
    <section className="bg-sand px-4 py-20 md:px-8 md:py-24" aria-labelledby="proof-title">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t("pr.eyebrow")}</p>
          <h2 id="proof-title" className="heading-4 md:heading-2 mt-4">{t("pr.title")}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[1, 2].map((n, i) => (
            <Reveal as="figure" key={n} delay={i * 0.06} className="rounded-3xl bg-paper p-6 md:p-8">
              <Quotes weight="fill" className="text-3xl text-brand" aria-hidden />
              <blockquote className="title-1 mt-4">
                <span className="tbd">{`{{testimonial_${n}}}`}</span>
              </blockquote>
              <figcaption className="caption-1 mt-6 text-ink-muted">
                <span className="tbd">{`{{client_name_${n}}}`}</span>, <span className="tbd">{`{{client_company_${n}}}`}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex h-16 items-center justify-center rounded-2xl bg-paper caption-4">
              <span className="tbd">{"{{client_logo}}"}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
