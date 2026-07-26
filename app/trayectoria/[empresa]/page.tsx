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

      {/* Sobre mi trabajo (70) + sectores (30) */}
      <section className="tray-about">
        <div className="tray-about-work">
          <span className="tray-eyebrow2">{t(ui.company.workLabel)}</span>
          <p className="tray-intro-lead">
            {t(company.projectsIntro ?? company.story)}
          </p>
        </div>
        {company.clients.length > 0 && (
          <div className="tray-about-sectors">
            <span className="tray-eyebrow2">{t(ui.company.sectors)}</span>
            <ul className="tray-sector-list">
              {company.clients.map((c) => (
                <li className="tray-sector" key={c}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Grid de proyectos */}
      <section className="tray-section">
        <h2 className="tray-eyebrow2">{t(ui.company.projectsTitle)}</h2>
        <div className="tray-cards">
          {company.projects.map((p) => renderCard(p))}
        </div>
      </section>
    </div>
  );
}
