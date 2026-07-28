"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { findProject, ui } from "@/lib/content";
import Icon from "@/components/Icon";
import BehanceCase from "@/components/BehanceCase";

export default function ProjectPage() {
  const { t } = useI18n();
  const params = useParams<{ empresa: string; proyecto: string }>();
  const { company, project } = findProject(params.empresa, params.proyecto);
  const [tagsOpen, setTagsOpen] = useState(false);

  if (!company || !project) return notFound();

  const isBehance = project.storyStatus === "behance";
  const cs = project.caseStudy;
  const L = ui.project.cs;

  const resp = cs?.responsibilities ?? [];
  const visibleTags = tagsOpen ? resp : resp.slice(0, 3);

  return (
    <div className="proj-page">
      <Link href={`/trayectoria/${company.slug}`} className="proj-back">
        <span aria-hidden>←</span> {t(ui.project.back)} · {company.name}
      </Link>

      {/* Hero */}
      <section className="proj-hero">
        <div className="proj-hero-info">
          <div className="proj-brand">
            {company.logoColor && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={company.logoColor} alt={company.name} />
            )}
            <span>{company.studio ?? company.name}</span>
          </div>
          <h1 className="proj-title">{t(project.name)}</h1>

          {resp.length > 0 && (
            <div className="proj-tags">
              {visibleTags.map((r, i) => (
                <span className="proj-tag" key={i}>
                  {t(r)}
                </span>
              ))}
              {resp.length > 3 && (
                <button
                  className="proj-tag proj-tag-more"
                  onClick={() => setTagsOpen((o) => !o)}
                >
                  {tagsOpen ? t(L.viewLess) : `+${resp.length - 3}`}
                </button>
              )}
            </div>
          )}

          {project.figmaUrl && (
            <a
              className="proj-figma"
              href={project.figmaUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t(ui.project.openFigma)} <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
        <div className="proj-hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.heroImage ?? project.image} alt={t(project.name)} />
        </div>
      </section>

      {/* Meta bar horizontal (Producto, Rol, Año, Plataforma, Tipo) */}
      {cs ? (
        <div className="proj-metabar">
          {cs.meta.map((m, i) => (
            <div className="proj-metabar-item" key={i}>
              <div className="proj-metabar-label">{t(m.label)}</div>
              <div className="proj-metabar-value">{t(m.value)}</div>
            </div>
          ))}
        </div>
      ) : (
        <hr className="proj-divider" />
      )}

      {isBehance ? (
        <BehanceCase project={project} />
      ) : cs ? (
        <article className="cs">
          {/* Overview */}
          <section className="cs-section">
            <p className="cs-eyebrow">{t(L.overview)}</p>
            {cs.overview.map((p, i) => (
              <p className="cs-text" key={i}>
                {t(p)}
              </p>
            ))}
          </section>

          {/* The Challenge + Objectives (dos columnas) */}
          <section className="cs-section">
            <div className="cs-two">
              <div>
                <h2 className="cs-title">{t(L.challenge)}</h2>
                {cs.challenge.map((p, i) => (
                  <p className="cs-text" key={i}>
                    {t(p)}
                  </p>
                ))}
              </div>
              <div>
                <p className="cs-eyebrow">{t(L.objectives)}</p>
                <ul className="cs-list cs-check">
                  {cs.objectives.map((o, i) => (
                    <li key={i}>{t(o)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Understanding the Problem */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.problem)}</h2>
            <p className="cs-text">{t(cs.problemIntro)}</p>
            <div className="cs-cards">
              {cs.painPoints.map((p, i) => (
                <div className="cs-card" key={i}>
                  <div className="cs-card-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="cs-card-title">{t(p.title)}</h3>
                  <p className="cs-card-text">{t(p.text)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Design Approach */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.approach)}</h2>
            <p className="cs-text">{t(cs.approachIntro)}</p>
            <ul className="cs-list">
              {cs.designDecisions.map((d, i) => (
                <li key={i}>{t(d)}</li>
              ))}
            </ul>
            {cs.approachClosing && (
              <p className="cs-text">{t(cs.approachClosing)}</p>
            )}
          </section>

          {/* Solution */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.solution)}</h2>
            <p className="cs-text">{t(cs.solutionIntro)}</p>
            <ul className="cs-list cs-check">
              {cs.solutionPoints.map((s, i) => (
                <li key={i}>{t(s)}</li>
              ))}
            </ul>
            {cs.solutionClosing && (
              <p className="cs-text cs-lead">{t(cs.solutionClosing)}</p>
            )}
          </section>

          {/* Resultados + Indicadores (destacados) */}
          <section className="cs-results">
            <div className="cs-results-block">
              <h2 className="cs-title">{t(L.outcomes)}</h2>
              {cs.outcomesIntro && (
                <p className="cs-text">{t(cs.outcomesIntro)}</p>
              )}
              <div className="cs-outcomes">
                {cs.outcomes.map((o, i) => (
                  <div className="cs-outcome" key={i}>
                    <span className="cs-outcome-ic" aria-hidden>
                      <Icon name="star" size={16} />
                    </span>
                    <span>{t(o)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-results-block">
              <h2 className="cs-title">{t(L.indicators)}</h2>
              {cs.indicatorsNote && (
                <p className="cs-note">{t(cs.indicatorsNote)}</p>
              )}
              <div className="cs-table">
                <div className="cs-tr cs-th">
                  <span>{t(L.metricCol)}</span>
                  <span>{t(L.objectiveCol)}</span>
                  <span>{t(L.valueCol)}</span>
                </div>
                {cs.indicators.map((ind, i) => (
                  <div className="cs-tr" key={i}>
                    <span className="cs-metric-name">{t(ind.metric)}</span>
                    <span>{t(ind.objective)}</span>
                    <span className="cs-metric-target">{t(ind.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
      ) : (
        <article className="cs">
          <section className="cs-section">
            <p className="cs-eyebrow">{t(ui.project.challenge)}</p>
            <p className="cs-text">{t(project.challenge)}</p>
          </section>
          <section className="cs-section">
            <p className="cs-eyebrow">{t(ui.project.process)}</p>
            <p className="cs-text">{t(project.process)}</p>
          </section>
          <section className="cs-section">
            <p className="cs-eyebrow">{t(ui.project.solution)}</p>
            <p className="cs-text cs-lead">{t(project.solution)}</p>
          </section>
          {project.metrics && project.metrics.length > 0 && (
            <section className="cs-section">
              <p className="cs-eyebrow">{t(ui.project.metrics)}</p>
              <div className="cs-metrics">
                {project.metrics.map((m, i) => (
                  <div className="cs-metric" key={i}>
                    <div className="cs-metric-value">{m.value}</div>
                    <div className="cs-metric-label">{m.label}</div>
                    <div className="cs-metric-note">{t(m.note)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      )}
    </div>
  );
}
