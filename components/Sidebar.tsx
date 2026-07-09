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

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
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
    <aside className="sidebar" data-collapsed={collapsed}>
      <div className="sb-top">
        <Link href="/" className="sb-brand" aria-label={profile.name}>
          <span className="sb-brand-mark">{initials}</span>
          <span className="sb-brand-name">{profile.name}</span>
        </Link>
        <button
          className="sb-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          <span className={collapsed ? "flip" : ""}>
            <Icon name="chevron" size={18} />
          </span>
        </button>
      </div>

      <nav className="sb-nav">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`sb-link ${isActive(l.href) ? "active" : ""}`}
            title={t(l.label)}
          >
            <span className="sb-ico">
              <Icon name={l.icon} size={20} />
            </span>
            <span className="sb-label">{t(l.label)}</span>
          </Link>
        ))}
      </nav>

      <div className="sb-bottom">
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
    </aside>
  );
}
