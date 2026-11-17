"use client";

import Image from "next/image";
import { ArrowRight, Globe, MapPin, Truck } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";

export function Delivery() {
  const { t } = useApp();
  const chips = [
    { I: MapPin, k: "d.c1" as const },
    { I: Globe, k: "d.c2" as const },
    { I: Truck, k: "d.c3" as const },
  ];
  return (
    <section id="delivery" className="px-4 pb-20 md:px-8 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[3/2] overflow-hidden rounded-4xl">
            <Image src="/assets/man.jpg" alt="White trucks from the company delivery fleet" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="eyebrow">{t("d.eyebrow")}</p>
          <h2 className="heading-4 md:heading-3 mt-4">{t("d.title")}</h2>
          <p className="body-3 mt-4 text-ink-muted">{t("d.d")}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map(({ I, k }) => (
              <li key={k} className="flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 caption-1 text-brand-ink">
                <I weight="bold" aria-hidden />
                {t(k)}
              </li>
            ))}
          </ul>
          <a href="#quote" className="btn-ghost button-md group -ml-3 mt-6 text-brand-deep">
            {t("d.cta")}
            <ArrowRight weight="bold" className="transition-transform duration-300 ease-base group-hover:translate-x-1" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
