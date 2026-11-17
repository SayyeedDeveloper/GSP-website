"use client";

import { ChatsCircle, SealCheck, Stack, Truck, type Icon } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import type { Key } from "@/lib/i18n";

const ITEMS: { icon: Icon; t: Key; d: Key; n: string }[] = [
  { icon: SealCheck, t: "b1.t", d: "b1.d", n: "01" },
  { icon: Stack, t: "b2.t", d: "b2.d", n: "02" },
  { icon: Truck, t: "b3.t", d: "b3.d", n: "03" },
  { icon: ChatsCircle, t: "b4.t", d: "b4.d", n: "04" },
];

export function Benefits() {
  const { t } = useApp();
  return (
    <section className="px-4 pb-20 md:px-8 md:pb-24" aria-labelledby="benefits-title">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{t("ben.eyebrow")}</p>
          <h2 id="benefits-title" className="heading-4 md:heading-2 mt-4">{t("ben.title")}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: I, t: tk, d, n }, i) => (
            <Reveal key={tk} delay={i * 0.06} className="group relative overflow-hidden rounded-3xl border border-line bg-paper p-6 transition-colors duration-300 ease-base hover:border-brand/40">
              <span className="absolute right-6 top-6 caption-3 text-ink-faint">{n}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-deep transition-transform duration-500 ease-base group-hover:-translate-y-1">
                <I size={24} aria-hidden />
              </span>
              <h3 className="heading-6 mt-8">{t(tk)}</h3>
              <p className="body-6 mt-2 text-ink-muted">{t(d)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
