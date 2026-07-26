"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { ui } from "@/lib/content";
import Icon from "./Icon";

export default function Settings({
  placement = "down",
  variant = "header",
}: {
  placement?: "up" | "down";
  variant?: "header" | "sidebar";
}) {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const menu = (
    <div
      className={`settings-menu ${variant === "sidebar" ? "sidebar" : placement}`}
      role="menu"
    >
      <div className="settings-title">{t(ui.settings.title)}</div>

      <div className="settings-row">
        <span className="settings-label">{t(ui.settings.language)}</span>
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

      <div className="settings-row">
        <span className="settings-label">{t(ui.settings.theme)}</span>
        <div
          className="theme-toggle"
          role="group"
          aria-label={t(ui.settings.theme)}
        >
          <button
            className={theme === "light" ? "on" : ""}
            onClick={() => setTheme("light")}
            aria-pressed={theme === "light"}
            aria-label={t(ui.settings.light)}
            title={t(ui.settings.light)}
          >
            <Icon name="sun" size={16} />
          </button>
          <button
            className={theme === "dark" ? "on" : ""}
            onClick={() => setTheme("dark")}
            aria-pressed={theme === "dark"}
            aria-label={t(ui.settings.dark)}
            title={t(ui.settings.dark)}
          >
            <Icon name="moon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  if (variant === "sidebar") {
    return (
      <div className="settings settings--sidebar" ref={ref}>
        <button
          className={`sb-link sb-settings ${open ? "on" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={t(ui.settings.title)}
          aria-expanded={open}
        >
          <span className="sb-ico">
            <Icon name="gear" size={20} />
          </span>
          <span className="sb-text">
            <span className="sb-title">{t(ui.settings.title)}</span>
          </span>
          <span className="sb-tip">{t(ui.settings.title)}</span>
        </button>
        {open && menu}
      </div>
    );
  }

  return (
    <div className="settings" ref={ref}>
      <button
        className={`settings-btn ${open ? "on" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={t(ui.settings.title)}
        aria-expanded={open}
      >
        <Icon name="gear" size={20} />
      </button>
      {open && menu}
    </div>
  );
}
