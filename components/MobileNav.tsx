"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { ui, sideNav } from "@/lib/content";
import Icon from "./Icon";
import AboutModal from "./AboutModal";

const byHref = (href: string) => sideNav.find((l) => l.href === href)!;

// Orden en la barra: experience, portfolio, lab, resume
const mainItems = [
  byHref("/experiencia"),
  byHref("/trayectoria"),
  byHref("/laboratorio"),
  byHref("/hoja-de-vida"),
];
const contactItem = byHref("/contacto");

export default function MobileNav() {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <nav className="mobile-nav" aria-label={t(ui.menu)} ref={ref}>
      {mainItems.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`mnav-item ${isActive(l.href) ? "active" : ""}`}
        >
          <span className="mnav-ico">
            <Icon name={l.icon} size={19} />
          </span>
          <span className="mnav-label">{t(l.short)}</span>
        </Link>
      ))}

      <button
        className={`mnav-item ${moreOpen ? "active" : ""}`}
        onClick={() => setMoreOpen((o) => !o)}
        aria-expanded={moreOpen}
        aria-label={t({ es: "Más", en: "More" })}
      >
        <span className="mnav-ico">
          <Icon name="dots" size={19} />
        </span>
        <span className="mnav-label">{t({ es: "Más", en: "More" })}</span>
      </button>

      {moreOpen && (
        <div className="mnav-sheet" role="menu">
          <Link
            href={contactItem.href}
            className="mnav-row mnav-row--link"
            onClick={() => setMoreOpen(false)}
          >
            {t(contactItem.short)}
          </Link>

          <div className="mnav-row">
            <span className="mnav-row-label">{t(ui.settings.language)}</span>
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

          <div className="mnav-row">
            <span className="mnav-row-label">{t(ui.settings.theme)}</span>
            <div
              className="theme-toggle"
              role="group"
              aria-label={t(ui.settings.theme)}
            >
              <button
                className={theme === "light" ? "on" : ""}
                onClick={() => setTheme("light")}
                aria-label={t(ui.settings.light)}
              >
                <Icon name="sun" size={16} />
              </button>
              <button
                className={theme === "dark" ? "on" : ""}
                onClick={() => setTheme("dark")}
                aria-label={t(ui.settings.dark)}
              >
                <Icon name="moon" size={16} />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="mnav-row mnav-row--link"
            onClick={() => {
              setMoreOpen(false);
              setAboutOpen(true);
            }}
          >
            {t(ui.about.nav)}
          </button>
        </div>
      )}
    </nav>
    <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
