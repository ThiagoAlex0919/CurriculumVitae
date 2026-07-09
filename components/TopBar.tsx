"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { profile, ui } from "@/lib/content";

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .slice(0, 2)
  .join("");

export default function TopBar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/") return null;

  const pageLabel = pathname.startsWith("/trayectoria")
    ? t(ui.nav.work)
    : pathname.startsWith("/laboratorio")
    ? t(ui.nav.lab)
    : pathname.startsWith("/contacto")
    ? t(ui.nav.contact)
    : "";

  return (
    <div className={`topbar ${show ? "show" : ""}`} aria-hidden={!show}>
      <span className="tb-mark">{initials}</span>
      <span className="tb-name">{profile.name}</span>
      {pageLabel && <span className="tb-sep">/</span>}
      {pageLabel && <span className="tb-page">{pageLabel}</span>}
    </div>
  );
}
