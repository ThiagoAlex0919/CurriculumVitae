"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { companies, ui } from "@/lib/content";

export default function TrayectoriaPage() {
  const { t } = useI18n();

  return (
    <>
      <header className="detail-head">
        <div className="container">
          <p className="eyebrow">{t(ui.nav.work)}</p>
          <h1>{t(ui.work.title)}</h1>
          <p style={{ maxWidth: 560 }}>{t(ui.work.subtitle)}</p>
        </div>
      </header>

      <section style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="card-grid">
            {companies.map((c) => (
              <Link href={`/trayectoria/${c.slug}`} className="card" key={c.slug}>
                <div className="card-top">
                  <div className="badge-init">{c.initials}</div>
                  <div>
                    <h3>{c.name}</h3>
                    <div className="role">{t(c.role)}</div>
                    <div className="period">{c.period}</div>
                  </div>
                </div>
                <p className="desc">{t(c.industry)}</p>
                <span className="arrow">
                  {c.projects.length}{" "}
                  {t(ui.company.solutions).toLowerCase()} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
