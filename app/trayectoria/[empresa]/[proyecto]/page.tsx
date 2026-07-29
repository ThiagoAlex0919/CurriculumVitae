"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { findProject, ui } from "@/lib/content";
import Icon from "@/components/Icon";
import BehanceCase from "@/components/BehanceCase";
import CaseNav from "@/components/CaseNav";

export default function ProjectPage() {
  const { t, locale } = useI18n();
  const params = useParams<{ empresa: string; proyecto: string }>();
  const { company, project } = findProject(params.empresa, params.proyecto);
  const [zoom, setZoom] = useState<string | null>(null);

  // Índice del caso (memoizado por idioma para no reiniciar la animación)
  const navItems = useMemo(
    () => [
      { id: "cs-overview", label: t(ui.project.cs.overview) },
      { id: "cs-challenge", label: t(ui.project.cs.challenge) },
      { id: "cs-problem", label: t(ui.project.cs.problem) },
      { id: "cs-approach", label: t(ui.project.cs.approach) },
      { id: "cs-results", label: t(ui.project.cs.outcomes) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  if (!company || !project) return notFound();

  const isBehance = project.storyStatus === "behance";
  const cs = project.caseStudy;
  const L = ui.project.cs;
  const figmaEmbed = project.figmaUrl
    ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
        project.figmaUrl
      )}`
    : null;

  return (
    <div className="proj-page">
      {/* Header agrupado: back + info + ilustración + meta bar */}
      <div className="proj-hero-card">
        <Link href={`/trayectoria/${company.slug}`} className="proj-back">
          <span aria-hidden>←</span> {t(ui.project.back)} · {company.name}
        </Link>

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
            <img
              src={project.heroImage ?? project.image}
              alt={t(project.name)}
            />
          </div>
        </section>

        {cs && (
          <div className="proj-metabar">
            {cs.meta.map((m, i) => (
              <div className="proj-metabar-item" key={i}>
                <div className="proj-metabar-label">{t(m.label)}</div>
                <div className="proj-metabar-value">{t(m.value)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isBehance ? (
        <BehanceCase project={project} />
      ) : cs ? (
        <div className="cs-shell">
          <CaseNav
            items={navItems}
            role={{
              label: t(ui.project.cs.role),
              items: cs.responsibilities.map((r) => t(r)),
            }}
          />
          <article className="cs">
          {/* Overview */}
          <section className="cs-section" id="cs-overview">
            <p className="cs-h">{t(L.overview)}</p>
            {cs.overview.map((p, i) => (
              <p className="cs-text" key={i}>
                {t(p)}
              </p>
            ))}
          </section>

          {/* The Challenge | imagen */}
          <section className="cs-split" id="cs-challenge">
            <div className="cs-split-text">
              <p className="cs-h">{t(L.challenge)}</p>
              {cs.challenge.map((p, i) => (
                <p className="cs-text" key={i}>
                  {t(p)}
                </p>
              ))}
            </div>
            {cs.challengeImage && (
              <button
                type="button"
                className="cs-split-media cs-zoom"
                onClick={() => setZoom(cs.challengeImage!)}
                aria-label={t(L.zoom)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cs.challengeImage}
                  alt={`${t(project.name)} — ${t(L.challenge)}`}
                />
                <span className="cs-zoom-badge" aria-hidden>
                  <Icon name="plus" size={16} />
                </span>
              </button>
            )}
          </section>

          {/* Objectives (una columna, panel) */}
          <section className="cs-section cs-panel">
            <p className="cs-h">{t(L.objectives)}</p>
            <ul className="cs-list cs-check">
              {cs.objectives.map((o, i) => (
                <li key={i}>{t(o)}</li>
              ))}
            </ul>
          </section>

          {/* Understanding the Problem — panel oscuro */}
          <section className="cs-dark" id="cs-problem">
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

          {/* imagen | Design Approach */}
          <section className="cs-split cs-split--media-first" id="cs-approach">
            {cs.approachImage && (
              <button
                type="button"
                className="cs-split-media cs-zoom"
                onClick={() => setZoom(cs.approachImage!)}
                aria-label={t(L.zoom)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cs.approachImage}
                  alt={`${t(project.name)} — ${t(L.approach)}`}
                />
                <span className="cs-zoom-badge" aria-hidden>
                  <Icon name="plus" size={16} />
                </span>
              </button>
            )}
            <div className="cs-split-text">
              <p className="cs-h">{t(L.approach)}</p>
              <p className="cs-text">{t(cs.approachIntro)}</p>
              <ul className="cs-list cs-check">
                {cs.designDecisions.map((d, i) => (
                  <li key={i}>{t(d)}</li>
                ))}
              </ul>
            </div>
          </section>

          {cs.approachClosing && (
            <p className="cs-callout">{t(cs.approachClosing)}</p>
          )}

          {/* Resultados + Indicadores (destacados) */}
          <section className="cs-results" id="cs-results">
            <div className="cs-results-block">
              <p className="cs-h">{t(L.outcomes)}</p>
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
              <p className="cs-h">{t(L.indicators)}</p>
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

          {/* Preview del archivo de Figma */}
          {figmaEmbed && (
            <section className="cs-section">
              <p className="cs-h">{t(L.figmaTitle)}</p>
              <div className="cs-figma-frame">
                <iframe
                  src={figmaEmbed}
                  title="Figma"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </section>
          )}

          {cs.footerImage && (
            <div className="cs-footer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.footerImage} alt="" />
            </div>
          )}

          {/* Más de estos diseños */}
          {cs.more && cs.more.length > 0 && (
            <section className="cs-section cs-more">
              <p className="cs-h">{t(L.moreTitle)}</p>
              <div className="cs-more-grid">
                {cs.more.map((m, i) => {
                  const inner = (
                    <>
                      {m.category && (
                        <span className="cs-more-cat">{t(m.category)}</span>
                      )}
                      <h3 className="cs-more-title">{m.title}</h3>
                      <span className="cs-more-tag">
                        {m.slug ? (
                          <>
                            {t(ui.company.viewCase)} →
                          </>
                        ) : (
                          t(L.soon)
                        )}
                      </span>
                    </>
                  );
                  return m.slug ? (
                    <Link
                      key={i}
                      href={`/trayectoria/${company.slug}/${m.slug}`}
                      className="cs-more-card is-link"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={i} className="cs-more-card" aria-disabled>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          </article>
        </div>
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

      {zoom &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="cs-lightbox"
            onClick={() => setZoom(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="cs-lightbox-close"
              onClick={() => setZoom(null)}
              aria-label={t(L.closeZoom)}
            >
              <Icon name="x" size={22} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoom} alt="" onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body
        )}
    </div>
  );
}
