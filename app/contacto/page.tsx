"use client";

import { useI18n } from "@/lib/i18n";
import { profile, ui } from "@/lib/content";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <header className="detail-head">
        <div className="container">
          <p className="eyebrow">{t(ui.nav.contact)}</p>
          <h1>{t(ui.contact.title)}</h1>
          <p style={{ maxWidth: 560 }}>{t(ui.contact.subtitle)}</p>
        </div>
      </header>

      <section style={{ paddingBottom: 60 }}>
        <div className="container">
          <p className="contact-big">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>

          <div className="meta-row" style={{ marginTop: 40, gap: "14px 28px" }}>
            <span>{profile.location}</span>
            {profile.phones.map((p) => (
              <a key={p} href={`tel:+57${p.replace(/\s/g, "")}`}>
                {p}
              </a>
            ))}
            <span>{profile.address}</span>
          </div>

          <div className="meta-row" style={{ marginTop: 16, gap: "14px 28px" }}>
            {profile.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>

          <div style={{ marginTop: 44 }}>
            <a href={`mailto:${profile.email}`} className="btn-accent">
              {t(ui.contact.emailCta)} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
