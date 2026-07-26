"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { profile, ui } from "@/lib/content";
import Icon from "./Icon";

export default function AboutProject() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <>
      <button
        className="sb-link sb-settings"
        onClick={() => setOpen(true)}
        aria-label={t(ui.about.nav)}
      >
        <span className="sb-ico">
          <Icon name="info" size={20} />
        </span>
        <span className="sb-text">
          <span className="sb-title">{t(ui.about.nav)}</span>
        </span>
        <span className="sb-tip">{t(ui.about.nav)}</span>
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="about-overlay"
            onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
              >
                <Icon name="resume" size={16} />
                {t(ui.about.cta)}
              </Link>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
