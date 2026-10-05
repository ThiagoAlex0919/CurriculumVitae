"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/lib/i18n";
import { ui } from "@/lib/content";
import Icon from "./Icon";

/* ------------------------------------------------------------------
   Modal de bienvenida — TEMPORAL (sitio en construcción)

   • Para APAGARLO: cambia WELCOME_ENABLED a false.
   • Para que vuelva a salirle a TODOS (p. ej. con otro mensaje):
     cambia WELCOME_KEY (ej. "welcome-v2"). Los textos están en
     lib/content.ts → ui.welcome.
   • Se muestra una sola vez por navegador; al cerrarlo se recuerda.
------------------------------------------------------------------- */
const WELCOME_ENABLED = true;
const WELCOME_KEY = "welcome-construccion-v1";

export default function WelcomeModal() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!WELCOME_ENABLED) return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(WELCOME_KEY) === "1";
    } catch {}
    if (seen) return;
    /* Pequeña espera para no tapar la animación de entrada del sitio */
    const timer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(WELCOME_KEY, "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ctaRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      /* Mantener el foco dentro del modal (solo 2 elementos) */
      if (e.key === "Tab") {
        const items = document.querySelectorAll<HTMLElement>(
          ".welcome-modal button"
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="welcome-overlay" onClick={close} role="presentation">
      <div
        className="welcome-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        aria-describedby="welcome-body"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="welcome-close"
          onClick={close}
          aria-label={t(ui.welcome.close)}
        >
          <Icon name="x" size={18} />
        </button>

        <div className="welcome-art" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ilustraciones/astronauta.webp" alt="" />
        </div>

        <span className="welcome-badge">
          <i className="ph ph-hammer" aria-hidden="true" />
          {t(ui.welcome.badge)}
        </span>

        <h2 id="welcome-title" className="welcome-title">
          {t(ui.welcome.title)}
        </h2>
        <p id="welcome-body" className="welcome-body">
          {t(ui.welcome.body)}
        </p>
        <p className="welcome-note">{t(ui.welcome.note)}</p>

        <button ref={ctaRef} className="welcome-cta" onClick={close}>
          {t(ui.welcome.cta)}
          <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>,
    document.body
  );
}
