"use client";

import { Quotes, Star } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { BRANDS, BrandLogo, brand } from "./BrandLogos";
import type { Key } from "@/lib/i18n";

/** Sample reviews from fictional client brands. Swap for real, approved quotes before launch. */
const REVIEWS: { q: Key; role: Key; name: string; initials: string; brandId: string }[] = [
  { q: "r1.q", role: "r1.role", name: "Jasur Rahmonov", initials: "JR", brandId: "oltinsoy" },
  { q: "r2.q", role: "r2.role", name: "Dilnoza Karimova", initials: "DK", brandId: "sayhun" },
  { q: "r3.q", role: "r3.role", name: "Bekzod Usmonov", initials: "BU", brandId: "navbahor" },
];

function Stars() {
  return (
    <span className="flex gap-0.5 text-amber-500" aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} weight="fill" aria-hidden />
      ))}
    </span>
  );
}

function Person({ r, light = false }: { r: (typeof REVIEWS)[number]; light?: boolean }) {
  const { t } = useApp();
  const b = brand(r.brandId);
  return (
    <figcaption className="flex items-center gap-3">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full body-4"
        style={light ? { backgroundColor: "#FFFFFF", color: b.color } : { backgroundColor: `${b.color}1F`, color: b.color }}
        aria-hidden
      >
        {r.initials}
      </span>
      <span className="flex flex-col">
        <span className={`title-3 ${light ? "text-paper" : "text-ink"}`}>{r.name}</span>
        <span className={`caption-2 ${light ? "text-paper/70" : "text-ink-muted"}`}>
          {t(r.role)}, {b.name}
        </span>
      </span>
    </figcaption>
  );
}

export function Proof() {
  const { t } = useApp();
  const [main, ...rest] = REVIEWS;
  const mainBrand = brand(main.brandId);

  return (
    <section className="bg-sand px-4 py-20 md:px-8 md:py-24" aria-labelledby="proof-title">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("pr.eyebrow")}</p>
            <h2 id="proof-title" className="heading-4 md:heading-2 mt-4">{t("pr.title")}</h2>
          </div>
          <p className="body-3 max-w-sm text-ink-muted">{t("pr.sub")}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Featured review */}
          <Reveal as="figure" className="weave-dark relative flex flex-col justify-between overflow-hidden rounded-4xl p-6 text-paper md:p-10 lg:col-span-3">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-xl bg-paper px-3 py-2">
                  <BrandLogo b={mainBrand} colored />
                </span>
                <Stars />
              </div>
              <Quotes weight="fill" className="mt-10 text-4xl text-brand-mint" aria-hidden />
              <blockquote className="heading-6 md:heading-5 mt-4 font-medium">{t(main.q)}</blockquote>
            </div>
            <div className="mt-10">
              <Person r={main} light />
            </div>
          </Reveal>

          {/* Two supporting reviews */}
          <div className="grid gap-6 lg:col-span-2">
            {rest.map((r, i) => {
              const b = brand(r.brandId);
              return (
                <Reveal as="figure" key={r.brandId} delay={0.08 * (i + 1)} className="flex flex-col justify-between rounded-3xl bg-paper p-6 md:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <BrandLogo b={b} colored size="sm" />
                      <Stars />
                    </div>
                    <blockquote className="body-2 mt-6 text-ink">{t(r.q)}</blockquote>
                  </div>
                  <div className="mt-6">
                    <Person r={r} />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Logo wall */}
        <Reveal className="mt-6">
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" aria-label="Clients">
            {BRANDS.map((b) => (
              <li key={b.id}>
                <span
                  className="group flex h-20 items-center justify-center rounded-2xl bg-paper px-4 text-ink-faint transition-colors duration-300 ease-base hover:text-[var(--brand)]"
                  style={{ ["--brand" as string]: b.color }}
                >
                  <BrandLogo b={b} size="sm" />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
