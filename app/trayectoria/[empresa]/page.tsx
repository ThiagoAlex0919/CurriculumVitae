"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import type { Localized } from "@/lib/i18n";
import { findCompany, ui } from "@/lib/content";
import type { Project } from "@/lib/content";

export default function CompanyPage() {
  const { t } = useI18n();
  const params = useParams<{ empresa: string }>();
  const company = findCompany(params.empresa);

  if (!company) return notFound();

  // Proyecto protagonista = el destacado más reciente (o el primero).
  const featured = company.projects.filter((p) => p.featured);
  const pool = featured.length ? featured : company.projects;
  const hero = [...pool].sort(
    (a, b) => Number(b.year) - Number(a.year)
  )[0];
  const rest = company.projects.filter((p) => p.slug !== hero?.slug);

  // Resalta la parte "highlight" dentro del nombre del proyecto.
  const renderTitle = (name: Localized, highlight?: Localized) => {
    const full = t(name);
    const hl = highlight ? t(highlight) : "";
    if (!hl || !full.includes(hl)) return <>{full}</>;
    const [before, ...tail] = full.split(hl);
    return (
      <>
        {before}
        <span className="tray-hl">{hl}</span>
        {tail.join(hl)}
      </>
    );
  };

  const renderCard = (p: Project, hero = false) => (
    <Link
      key={p.slug}
      href={`/trayectoria/${company.slug}/${p.slug}`}
      className={`tray-card${hero ? " tray-card--hero" : ""}`}
      style={p.image ? { backgroundImage: `url(${p.image})` } : undefined}
    >
      <div className="tray-card-shade" />
      <div className="tray-card-inner">
        <div className="tray-card-head">
          <span className="tray-card-product">{p.product ?? company.name}</span>
          <span className="tray-card-year">{p.year}</span>
        </div>
        <div className="tray-card-body">
          {p.category && <span className="tray-card-cat">{t(p.category)}</span>}
          <h3 className="tray-card-title">
            {renderTitle(p.name, p.highlight)}
          </h3>
          <p className="tray-card-desc">{t(p.cardSummary ?? p.challenge)}</p>
        </div>
        <div className="tray-card-foot">
          {p.focus && <span className="tray-card-focus">{t(p.focus)}</span>}
          <span className="tray-card-cta">{t(ui.company.viewCase)} →</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="tray-page">
      {/* Banner */}
      <div
        className="tray-banner"
        style={
          company.banner
            ? { backgroundImage: `url(${company.banner})` }
            : undefined
        }
      >
        <div className="tray-banner-overlay" />
        <Link href="/trayectoria" className="tray-back">
          <span aria-hidden>←</span> {t(ui.company.backPortfolio)}
        </Link>
        {company.logo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={company.logo} alt={company.name} className="tray-logo" />
        )}
        <div className="tray-banner-bottom">
          <div className="tray-banner-title">
            <span className="tray-banner-label">
              {t(ui.company.portfolioLabel)}
            </span>
            <h1 className="tray-banner-h1">
              {t(ui.company.projectsAt)}{" "}
              <span className="tray-hl">{company.name}</span>
            </h1>
          </div>
          <div className="tray-meta">
            <div className="tray-meta-item">
              <span className="tray-meta-k">{t(ui.company.role)}</span>
              <span className="tray-meta-v">
                {t(company.roleShort ?? company.role)}
              </span>
            </div>
            {company.team && (
              <div className="tray-meta-item">
                <span className="tray-meta-k">{t(ui.company.team)}</span>
                <span className="tray-meta-v">{t(company.team)}</span>
              </div>
            )}
            <div className="tray-meta-item">
              <span className="tray-meta-k">{t(ui.company.period)}</span>
              <span className="tray-meta-v">{company.period}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intro + proyecto protagonista (40/60) */}
      <section className="tray-spotlight">
        <div className="tray-spotlight-text">
          <p className="tray-intro-lead">
            {t(company.projectsIntro ?? company.story)}
          </p>
          {company.clients.length > 0 && (
            <div className="tray-chips">
              <span className="tray-chips-label">{t(ui.company.clients)}</span>
              <div className="tray-chips-row">
                {company.clients.map((c) => (
                  <span className="tray-chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {hero && renderCard(hero, true)}
      </section>

      {/* Siguientes proyectos */}
      {rest.length > 0 && (
        <section className="tray-section">
          <h2 className="tray-h2">{t(ui.company.moreProjects)}</h2>
          <div className="tray-cards">{rest.map((p) => renderCard(p))}</div>
        </section>
      )}
    </div>
  );
}
