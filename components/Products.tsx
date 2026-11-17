"use client";

import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { PRODUCTS } from "@/lib/products";
import type { ProductId } from "@/lib/i18n";

const LAYOUT: { id: ProductId; className: string; imgClass: string }[] = [
  { id: "plain", className: "md:col-span-2 md:row-span-2", imgClass: "aspect-[4/3] md:aspect-auto md:flex-1" },
  { id: "mesh", className: "", imgClass: "aspect-[4/3]" },
  { id: "green", className: "", imgClass: "aspect-[4/3]" },
  { id: "custom", className: "md:col-span-3", imgClass: "aspect-[4/3] md:aspect-[3/1]" },
];

export function Products() {
  const { t, chooseProduct } = useApp();
  return (
    <section id="products" className="bg-sand px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("products.eyebrow")}</p>
            <h2 className="heading-4 md:heading-2 mt-4">{t("products.title")}</h2>
          </div>
          <p className="body-3 max-w-sm text-ink-muted">{t("products.sub")}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:grid-rows-[auto_auto]">
          {LAYOUT.map(({ id, className, imgClass }, i) => {
            const p = PRODUCTS[id];
            return (
              <Reveal as="article" key={id} delay={i * 0.06} className={`group flex flex-col rounded-3xl bg-paper p-2 ${className}`}>
                <div className={`relative overflow-hidden rounded-2xl bg-brand-soft ${imgClass}`}>
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className={`transition-transform duration-500 ease-base group-hover:scale-105 ${
                      p.fit === "contain" ? "object-contain p-6" : id === "mesh" ? "object-cover object-top" : "object-cover"
                    }`}
                  />
                </div>
                <div className="flex items-end justify-between gap-4 p-4">
                  <div>
                    <h3 className="title-1">{t(p.title)}</h3>
                    <p className="body-6 mt-2 text-ink-muted">{t(p.desc)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => chooseProduct(id, true)}
                    aria-label={`${t("products.ask")}: ${t(p.title)}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand text-ink transition duration-300 ease-base hover:bg-brand-deep hover:text-paper active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
                  >
                    <ArrowUpRight weight="bold" aria-hidden />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
