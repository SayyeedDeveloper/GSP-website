"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, EnvelopeSimple, Phone, ShieldCheck } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { EASE, Reveal } from "./Reveal";
import { EMAIL, PHONE, PHONE_LABEL, type ProductId } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/products";

type Errors = { name?: boolean; phone?: boolean; email?: boolean };

export function QuoteForm() {
  const { t, product, chooseProduct } = useApp();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [okName, setOkName] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const volume = String(f.get("volume") ?? "").trim();
    const next: Errors = {
      name: name.length < 2,
      phone: phone.replace(/\D/g, "").length < 9,
      email: email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email),
    };
    setErrors(next);
    const firstBad = (["name", "phone", "email"] as const).find((k) => next[k]);
    if (firstBad) {
      document.getElementById(`f-${firstBad}`)?.focus();
      return;
    }
    setSending(true);
    const bag = t(PRODUCTS[product].option);
    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nBag type: ${bag}\nVolume: ${volume}`;
    // No backend on the source site: hand the request to the visitor's mail app.
    // Swap this for an API route (app/api/quote/route.ts) when a CRM or Telegram bot is ready.
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request: ${bag}`)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => {
      setSending(false);
      setOkName(name);
    }, 600);
  }

  const clear = (k: keyof Errors) => errors[k] && setErrors((e) => ({ ...e, [k]: false }));

  return (
    <section id="quote" className="px-4 pb-20 md:px-8 md:pb-24">
      <div className="weave mx-auto grid max-w-6xl gap-12 rounded-4xl p-6 md:p-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{t("c.eyebrow")}</p>
          <h2 className="heading-4 md:heading-2 mt-4">{t("c.title")}</h2>
          <p className="body-3 mt-4 text-ink-muted">{t("c.d")}</p>
          <ul className="mt-8 space-y-4 body-2">
            <li className="flex items-center gap-3"><ShieldCheck size={20} className="text-brand-deep" aria-hidden />{t("c.r1")}</li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-brand-deep" aria-hidden />
              <a href={`tel:${PHONE}`} className="underline decoration-line underline-offset-4 transition-colors duration-300 ease-base hover:decoration-brand-deep">{PHONE_LABEL}</a>
            </li>
            <li className="flex items-center gap-3">
              <EnvelopeSimple size={20} className="text-brand-deep" aria-hidden />
              <a href={`mailto:${EMAIL}`} className="underline decoration-line underline-offset-4 transition-colors duration-300 ease-base hover:decoration-brand-deep">{EMAIL}</a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-paper p-6 shadow-sm md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="f-name" className="title-4">{t("form.name")} <span className="text-red-600" aria-hidden>*</span></label>
                <input id="f-name" name="name" type="text" autoComplete="name" required onInput={() => clear("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} className="field mt-2" />
                {errors.name && <p id="e-name" className="caption-2 mt-2 text-red-600">{t("err.name")}</p>}
              </div>
              <div>
                <label htmlFor="f-phone" className="title-4">{t("form.phone")} <span className="text-red-600" aria-hidden>*</span></label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+998 __ ___ __ __" onInput={() => clear("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} className="field mt-2" />
                {errors.phone && <p id="e-phone" className="caption-2 mt-2 text-red-600">{t("err.phone")}</p>}
              </div>
              <div>
                <label htmlFor="f-email" className="title-4">{t("form.email")}</label>
                <input id="f-email" name="email" type="email" autoComplete="email" onInput={() => clear("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} className="field mt-2" />
                {errors.email && <p id="e-email" className="caption-2 mt-2 text-red-600">{t("err.email")}</p>}
              </div>
              <div>
                <label htmlFor="f-type" className="title-4">{t("form.type")}</label>
                <select id="f-type" name="type" value={product} onChange={(e) => chooseProduct(e.target.value as ProductId)} className="field mt-2">
                  {(Object.keys(PRODUCTS) as ProductId[]).map((id) => (
                    <option key={id} value={id}>{t(PRODUCTS[id].option)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-volume" className="title-4">{t("form.volume")}</label>
                <input id="f-volume" name="volume" type="text" placeholder={t("form.volph")} className="field mt-2" />
              </div>
            </div>
            <button type="submit" disabled={sending} className="btn-primary button-md mt-6 w-full py-3">
              {sending ? t("form.sending") : t("cta")}
            </button>
            <p className="caption-5 mt-3 text-ink-faint">{t("form.note")}</p>
            <AnimatePresence>
              {okName && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-4 flex gap-2 rounded-xl bg-brand-soft p-3 body-6 text-brand-ink"
                >
                  <CheckCircle weight="fill" className="mt-0.5 shrink-0 text-brand-deep" aria-hidden />
                  {t("ok").replace("{name}", okName)}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
