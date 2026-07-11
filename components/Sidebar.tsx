"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ui, profile } from "@/lib/content";
import Icon from "./Icon";

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
    { href: "/", title: ui.nav.home, sub: ui.navSub.home, icon: "resume" },
    { href: "/trayectoria", title: ui.nav.work, sub: ui.navSub.work, icon: "portfolio" },
    { href: "/laboratorio", title: ui.nav.lab, sub: ui.navSub.lab, icon: "lab" },
    { href: "/contacto", title: ui.nav.contact, sub: ui.navSub.contact, icon: "connect" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="sidebar" data-collapsed={collapsed}>
      <div className="sb-top">
        <button
          className="sb-menu"
          onClick={onToggle}
          aria-label={t(ui.menu)}
        >
          <span className="sb-menu-ico">
            <Icon name="menu" size={20} />
          </span>
          <span className="sb-menu-label">{t(ui.menu)}</span>
        </button>
      </div>

      <nav className="sb-nav">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`sb-link ${isActive(l.href) ? "active" : ""}`}
            title={t(l.title)}
          >
            <span className="sb-ico">
              <Icon name={l.icon} size={20} />
            </span>
            <span className="sb-text">
              <span className="sb-eyebrow">{t(l.sub)}</span>
              <span className="sb-title">{t(l.title)}</span>
            </span>
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
        <p className="sb-rights">
          © {new Date().getFullYear()} {profile.name}
          <br />
          {t(ui.footer.rights)}
        </p>
      </div>
    </aside>
  );
}
