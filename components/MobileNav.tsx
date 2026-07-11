"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ui, sideNav } from "@/lib/content";
import Icon from "./Icon";

export default function MobileNav() {
  const { t } = useI18n();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <nav className="mobile-nav" aria-label={t(ui.menu)}>
      {sideNav.map((l) => (
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
    </nav>
  );
}
