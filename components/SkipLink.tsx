"use client";

import { useApp } from "./Providers";

export function SkipLink() {
  const { t } = useApp();
  return (
    <a href="#main" className="btn-primary button-sm sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">
      {t("skip")}
    </a>
  );
}
