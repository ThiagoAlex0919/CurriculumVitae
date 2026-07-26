"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ui } from "@/lib/content";
import Settings from "./Settings";

export default function PageHeader({
  extra,
  alwaysExpanded = false,
}: {
  extra?: React.ReactNode;
  alwaysExpanded?: boolean;
}) {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (alwaysExpanded) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysExpanded]);

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
    <div className={`content-header ${scrolled ? "is-stuck" : "is-compact"}`}>
      <span className="ch-label">{label}</span>
      <div
        className="ch-actions"
        style={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        {extra}
        <Settings placement="down" />
      </div>
    </div>
  );
}
