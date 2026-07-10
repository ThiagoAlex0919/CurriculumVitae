"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ui, profile } from "@/lib/content";
import Icon from "./Icon";

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .slice(0, 2)
  .join("");

export default function MobileNav() {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();

  const links = [
    { href: "/", label: ui.nav.home, icon: "home" },
    { href: "/trayectoria", label: ui.nav.work, icon: "work" },
    { href: "/laboratorio", label: ui.nav.lab, icon: "lab" },
    { href: "/contacto", label: ui.nav.contact, icon: "contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="mobile-top">
        <Link href="/" className="mtop-brand" aria-label={profile.name}>
          <span className="mtop-mark">{initials}</span>
          <span className="mtop-name">{profile.name}</span>
        </Link>
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
      </header>

      <nav className="mobile-nav" aria-label="Navegación principal">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`mnav-item ${isActive(l.href) ? "active" : ""}`}
          >
            <span className="mnav-ico">
              <Icon name={l.icon} size={21} />
            </span>
            <span className="mnav-label">{t(l.label)}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
