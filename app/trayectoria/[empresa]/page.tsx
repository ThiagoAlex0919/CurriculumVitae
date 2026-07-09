"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { findCompany, ui } from "@/lib/content";

export default function CompanyPage() {
  const { t } = useI18n();
  const params = useParams<{ empresa: string }>();
  const company = findCompany(params.empresa);

  if (!company) return notFound();

  return (
    <>
      <header className="detail-head">
        <div className="container">
          <Link href="/trayectoria" className="backlink">
            ← {t(ui.work.title)}
          </Link>
          <h1>{company.name}</h1>
          <p style={{ maxWidth: 560, marginTop: 4 }}>
            {t(company.role)} · {company.period}
          </p>
        </div>
      </header>

      <section>
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <div className="k">{t(ui.company.industry)}</div>
              <div className="v">{t(company.industry)}</div>
            </div>
            <div className="info-item">
              <div className="k">{t(ui.company.clients)}</div>
              <div className="v">{company.clients.join(" · ")}</div>
            </div>
            <div className="info-item">
              <div className="k">{t(ui.nav.work)}</div>
              <div className="v">{t(company.area)}</div>
            </div>
          </div>

          <div className="prose-block module">
            <p className="lead-serif" style={{ margin: 0 }}>
              {t(company.story)}
            </p>
          </div>

          <div className="prose-block module">
            <h2>{t(ui.company.profile)}</h2>
            <p>{t(company.profile)}</p>
          </div>

          <div className="prose-block module">
            <h2>{t(ui.company.challenges)}</h2>
            <p>{t(company.challenges)}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t(ui.company.solutions)}</p>
            <p>{t(ui.company.solutionsSub)}</p>
          </div>
          <div className="card-grid">
            {company.projects.map((p) => (
              <Link
                key={p.slug}
                href={`/trayectoria/${company.slug}/${p.slug}`}
                className="card"
              >
                <h3 style={{ marginBottom: 8 }}>{t(p.name)}</h3>
                <div className="role" style={{ marginBottom: 14 }}>
                  {t(p.client)} · {p.year}
                </div>
                <div className="tag-list" style={{ marginBottom: 14 }}>
                  {p.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="desc">{t(p.challenge)}</p>
                <span className="arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
