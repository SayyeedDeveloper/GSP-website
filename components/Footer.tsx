"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, TelegramLogo } from "@phosphor-icons/react";
import { useApp } from "./Providers";
import { EMAIL, PHONE, PHONE_LABEL } from "@/lib/i18n";

export function Footer() {
  const { t } = useApp();
  const link = "transition-colors duration-300 ease-base hover:text-ink";
  return (
    <footer className="border-t border-line px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <Image src="/assets/logo.png" alt="Great Soatobod Production" width={300} height={44} className="h-8 w-auto" />
          <p className="body-6 mt-4 max-w-xs text-ink-muted">{t("ft.about")}</p>
        </div>
        <nav aria-label="Footer">
          <p className="title-4">{t("ft.info")}</p>
          <ul className="body-6 mt-4 space-y-2 text-ink-muted">
            <li><a className={link} href="#products">{t("nav.products")}</a></li>
            <li><a className={link} href="#quality">{t("nav.quality")}</a></li>
            <li><a className={link} href="#delivery">{t("nav.delivery")}</a></li>
            <li><a className={link} href="#quote">{t("nav.contact")}</a></li>
          </ul>
        </nav>
        <div>
          <p className="title-4">{t("nav.contact")}</p>
          <ul className="body-6 mt-4 space-y-2 text-ink-muted">
            <li><a className={link} href={`tel:${PHONE}`}>{PHONE_LABEL}</a></li>
            <li><a className={link} href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            {/* The old site linked both socials to the phone number. Replace with real URLs. */}
            <li className="flex items-center gap-2"><TelegramLogo aria-hidden /> Telegram <span className="tbd caption-4">{"{{telegram_url}}"}</span></li>
            <li className="flex items-center gap-2"><InstagramLogo aria-hidden /> Instagram <span className="tbd caption-4">{"{{instagram_url}}"}</span></li>
          </ul>
        </div>
      </div>
      <div className="caption-5 mx-auto mt-12 flex max-w-6xl flex-col gap-4 text-ink-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Great Soatobod Production</p>
        <p className="flex gap-4">
          <Link className={link} href="/legal#privacy">{t("ft.privacy")}</Link>
          <Link className={link} href="/legal#terms">{t("ft.terms")}</Link>
        </p>
      </div>
    </footer>
  );
}
