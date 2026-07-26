"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { profile, ui } from "@/lib/content";
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
  const [aboutOpen, setAboutOpen] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [pos, setPos] = useState<{ left: number; bottom: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const n = e.target as Node;
      if (wrapRef.current?.contains(n) || menuRef.current?.contains(n)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const toggle = () => {
    if (!open && variant === "sidebar" && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ left: r.left, bottom: window.innerHeight - r.top + 8 });
    }
    setOpen((o) => !o);
  };

  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const menuInner = (
    <>
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

      <button
        className="settings-about"
        onClick={() => {
          setOpen(false);
          setAboutOpen(true);
        }}
      >
        <Icon name="info" size={17} />
        <span>{t(ui.about.nav)}</span>
      </button>
    </>
  );

  const aboutModal =
    aboutOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="about-overlay"
            onClick={() => setAboutOpen(false)}
            role="presentation"
          >
            <div
              className="about-modal"
              role="dialog"
              aria-modal="true"
              aria-label={t(ui.about.nav)}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="about-close"
                onClick={() => setAboutOpen(false)}
                aria-label={t(ui.about.close)}
              >
                <Icon name="x" size={18} />
              </button>

              <div className="about-avatar">
                {imgOk ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    onError={() => setImgOk(false)}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <h3 className="about-name">{profile.name}</h3>
              <p className="about-role">{t(profile.role)}</p>
              <p className="about-body">{t(ui.about.body)}</p>

              <Link
                href="/hoja-de-vida"
                className="about-cta"
                onClick={() => setAboutOpen(false)}
              >
                <Icon name="resume" size={16} />
                {t(ui.about.cta)}
              </Link>
            </div>
          </div>,
          document.body
        )
      : null;

  if (variant === "sidebar") {
    return (
      <div className="settings settings--sidebar" ref={wrapRef}>
        <button
          ref={btnRef}
          className={`sb-link sb-settings ${open ? "on" : ""}`}
          onClick={toggle}
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

        {open &&
          pos &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              ref={menuRef}
              className="settings-menu settings-menu--float"
              role="menu"
              style={{
                position: "fixed",
                left: pos.left,
                bottom: pos.bottom,
                width: 240,
              }}
            >
              {menuInner}
            </div>,
            document.body
          )}

        {aboutModal}
      </div>
    );
  }

  return (
    <div className="settings" ref={wrapRef}>
      <button
        className={`settings-btn ${open ? "on" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={t(ui.settings.title)}
        aria-expanded={open}
      >
        <Icon name="gear" size={20} />
      </button>
      {open && (
        <div className={`settings-menu ${placement}`} role="menu" ref={menuRef}>
          {menuInner}
        </div>
      )}
      {aboutModal}
    </div>
  );
}
