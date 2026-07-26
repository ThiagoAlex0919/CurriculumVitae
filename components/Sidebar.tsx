"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ui, profile, sideNav } from "@/lib/content";
import Icon from "./Icon";
import Settings from "./Settings";

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.includes("#")) return false; // enlaces con ancla no marcan activo
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

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
        {sideNav.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`sb-link ${isActive(l.href) ? "active" : ""}`}
          >
            <span className="sb-ico">
              <Icon name={l.icon} size={20} />
            </span>
            <span className="sb-text">
              <span className="sb-eyebrow">{t(l.sub)}</span>
              <span className="sb-title">{t(l.title)}</span>
            </span>
            <span className="sb-tip">{t(l.title)}</span>
          </Link>
        ))}
      </nav>

      <div className="sb-bottom">
        <Settings placement="up" />
        <p className="sb-rights">
          © {new Date().getFullYear()} {profile.name}
          <br />
          {t(ui.footer.rights)}
        </p>
      </div>
    </aside>
  );
}
