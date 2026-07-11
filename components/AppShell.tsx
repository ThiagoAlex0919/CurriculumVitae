"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useI18n } from "@/lib/i18n";
import { profile, ui } from "@/lib/content";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const [collapsed, setCollapsed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("sidebar-collapsed");
    if (stored === "1") setCollapsed(true);
    if (window.innerWidth < 900 && stored === null) setCollapsed(true);
    setReady(true);
  }, []);

  const toggle = () => {
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
