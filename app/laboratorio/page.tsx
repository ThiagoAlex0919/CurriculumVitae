"use client";

import { useI18n } from "@/lib/i18n";
import { lab, ui } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export default function LabPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHeader />
      <header className="detail-head">
        <div className="container">
          <p className="eyebrow">{t(ui.nav.lab)}</p>
          <h1>{t(ui.lab.title)}</h1>
          <p style={{ maxWidth: 600 }}>{t(ui.lab.subtitle)}</p>
        </div>
      </header>

      <section style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="card-grid">
            {lab.map((entry) => (
              <div className="card" key={entry.slug} style={{ cursor: "default" }}>
                <h3 style={{ marginBottom: 12 }}>{t(entry.title)}</h3>
                <p className="desc" style={{ marginBottom: 14 }}>
                  {t(entry.summary)}
                </p>
                <p className="desc" style={{ color: "var(--ink-mute)", fontSize: 14 }}>
                  {t(entry.detail)}
                </p>
                <div className="tag-list" style={{ marginTop: 16 }}>
                  {entry.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
