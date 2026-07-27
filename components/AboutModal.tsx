"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { profile, ui } from "@/lib/content";
import Icon from "./Icon";

const initials = profile.name
  .split(" ")
  .slice(0, 2)
  .map((w) => w[0])
  .join("");

export default function AboutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [imgOk, setImgOk] = useState(true);

  if (!open || typeof document === "undefined") return null;

  const text = t(ui.about.body);
  const kw = "AI First";
  const i = text.indexOf(kw);

  return createPortal(
    <div className="about-overlay" onClick={onClose} role="presentation">
      <div
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-label={t(ui.about.nav)}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="about-close"
          onClick={onClose}
          aria-label={t(ui.about.close)}
        >
          <Icon name="x" size={18} />
        </button>

        <div className="about-avatar">
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/imagenes/avatar-alex.png"
              alt={profile.name}
              onError={() => setImgOk(false)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <h3 className="about-name">{profile.name}</h3>
        <p className="about-role">{t(profile.role)}</p>
        <p className="about-body">
          {i < 0 ? (
            text
          ) : (
            <>
              {text.slice(0, i)}
              <span className="about-hl">{kw}</span>
              {text.slice(i + kw.length)}
            </>
          )}
        </p>

        <Link href="/hoja-de-vida" className="about-cta" onClick={onClose}>
          <Icon name="resume" size={16} />
          {t(ui.about.cta)}
        </Link>
      </div>
    </div>,
    document.body
  );
}
