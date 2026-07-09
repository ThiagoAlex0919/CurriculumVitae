"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ui, profile } from "@/lib/content";

export default function Nav() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();

  const links = [
    { href: "/", label: ui.nav.home },
    { href: "/trayectoria", label: ui.nav.work },
    { href: "/laboratorio", label: ui.nav.lab },
    { href: "/contacto", label: ui.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-brand">
          {profile.name}
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "active" : ""}
            >
              {t(l.label)}
            </Link>
          ))}
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
      </div>
    </nav>
  );
}
