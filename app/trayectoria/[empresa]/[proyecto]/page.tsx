"use client";

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

  if (!company || !project) return notFound();

  const isBehance = project.storyStatus === "behance";
  const cs = project.caseStudy;
  const L = ui.project.cs;

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
          <p className="proj-meta">
            {t(ui.project.productLabel)}: {project.product ?? company.name}
            {"   ·   "}
            {t(ui.project.yearLabel)}: {project.year}
          </p>

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

      {/* Meta bar horizontal */}
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
            <p className="cs-h">{t(L.overview)}</p>
            {cs.overview.map((p, i) => (
              <p className="cs-text" key={i}>
                {t(p)}
              </p>
            ))}
          </section>

          {/* The Challenge + Objectives | imagen */}
          <section className="cs-split cs-accent cs-accent-left">
            <div className="cs-split-text">
              <p className="cs-h">{t(L.challenge)}</p>
              {cs.challenge.map((p, i) => (
                <p className="cs-text" key={i}>
                  {t(p)}
                </p>
              ))}
              <p className="cs-h cs-sublabel">{t(L.objectives)}</p>
              <ul className="cs-list cs-check">
                {cs.objectives.map((o, i) => (
                  <li key={i}>{t(o)}</li>
                ))}
              </ul>
            </div>
            {cs.challengeImage && (
              <div className="cs-split-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cs.challengeImage} alt="" />
              </div>
            )}
          </section>

          {/* Understanding the Problem — panel oscuro */}
          <section className="cs-dark">
            <p className="cs-h cs-h--light">{t(L.problem)}</p>
            <p className="cs-dark-intro">{t(cs.problemIntro)}</p>
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

          {/* imagen | Design Approach + Solution */}
          <section className="cs-split cs-split--media-first cs-accent cs-accent-right">
            {cs.approachImage && (
              <div className="cs-split-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cs.approachImage} alt="" />
              </div>
            )}
            <div className="cs-split-text">
              <p className="cs-h">{t(L.approach)}</p>
              <p className="cs-text">{t(cs.approachIntro)}</p>
              <ul className="cs-list">
                {cs.designDecisions.map((d, i) => (
                  <li key={i}>{t(d)}</li>
                ))}
              </ul>
              {cs.approachClosing && (
                <p className="cs-text">{t(cs.approachClosing)}</p>
              )}

              <p className="cs-h cs-sublabel">{t(L.solution)}</p>
              <p className="cs-text">{t(cs.solutionIntro)}</p>
              <ul className="cs-list cs-check">
                {cs.solutionPoints.map((s, i) => (
                  <li key={i}>{t(s)}</li>
                ))}
              </ul>
              {cs.solutionClosing && (
                <p className="cs-text cs-lead">{t(cs.solutionClosing)}</p>
              )}
            </div>
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

          {cs.footerImage && (
            <div className="cs-footer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.footerImage} alt="" />
            </div>
          )}
        </article>
      ) : (
        <article className="cs">
          <section className="cs-section">
            <p className="cs-h">{t(ui.project.challenge)}</p>
            <p className="cs-text">{t(project.challenge)}</p>
          </section>
          <section className="cs-section">
            <p className="cs-h">{t(ui.project.process)}</p>
            <p className="cs-text">{t(project.process)}</p>
          </section>
          <section className="cs-section">
            <p className="cs-h">{t(ui.project.solution)}</p>
            <p className="cs-text cs-lead">{t(project.solution)}</p>
          </section>
          {project.metrics && project.metrics.length > 0 && (
            <section className="cs-section">
              <p className="cs-h">{t(ui.project.metrics)}</p>
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
