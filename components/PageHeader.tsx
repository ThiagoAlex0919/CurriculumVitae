"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ui } from "@/lib/content";

export default function PageHeader() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label = pathname.startsWith("/experiencia")
    ? t(ui.nav.work)
    : pathname.startsWith("/trayectoria")
    ? t({ es: "Portafolio", en: "Portfolio" })
    : pathname.startsWith("/laboratorio")
    ? t(ui.nav.lab)
    : pathname.startsWith("/contacto")
    ? t(ui.nav.contact)
    : t(ui.headerLabel);

  return (
    <div className={`content-header ${scrolled ? "is-stuck" : ""}`}>
      <span className="ch-label">{label}</span>
      <div className="lang" role="group" aria-label="Language">
        <button
          className={locale === "es" ? "on" : ""}
          onClick={() => setLocale("es")}
          aria-pressed={locale === "es"}
        >
          ES
        </button>
        <button
          className={locale === "en" ? "on" : ""}
          onClick={() => setLocale("en")}
          aria-pressed={locale === "en"}
        >
          EN
        </button>
      </div>
    </div>
  );
}
