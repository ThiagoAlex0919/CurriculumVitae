"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useI18n } from "@/lib/i18n";
import { profile, ui } from "@/lib/content";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);
  const introTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("sidebar-collapsed");
    if (stored === "1") {
      setCollapsed(true);
    } else if (stored === null) {
      if (window.innerWidth < 900) {
        setCollapsed(true);
      } else {
        /* Intro: arranca expandido para que el usuario vea el menú y,
           tras unos segundos, se contrae solo para darle protagonismo
           al contenido. Solo pasa mientras el usuario no haya tocado
           el menú (sin preferencia guardada). */
        introTimer.current = setTimeout(() => setCollapsed(true), 3500);
      }
    }
    setReady(true);
    return () => {
      if (introTimer.current) clearTimeout(introTimer.current);
    };
  }, []);

  const toggle = () => {
    /* el gesto del usuario cancela el auto-colapso de la intro */
    if (introTimer.current) {
      clearTimeout(introTimer.current);
      introTimer.current = null;
    }
    setCollapsed((c) => {
      const next = !c;
      try {
        window.localStorage.setItem("sidebar-collapsed", next ? "1" : "0");
      } catch {}
      return next;
    });
  };

  return (
    <div className="app-shell" data-collapsed={collapsed} data-ready={ready}>
      <Sidebar collapsed={collapsed} onToggle={toggle} />
      <MobileNav />
      <div className="app-main">
        <main>{children}</main>
        <p className="mobile-credits">
          © {new Date().getFullYear()} {profile.name}. {t(ui.footer.rights)}
        </p>
      </div>
    </div>
  );
}
