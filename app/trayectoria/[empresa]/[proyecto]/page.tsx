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

      <hr className="proj-divider" />

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

          {/* About the project — meta */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.about)}</h2>
            <div className="cs-meta">
              {cs.meta.map((m, i) => (
                <div className="cs-meta-item" key={i}>
                  <div className="cs-meta-label">{t(m.label)}</div>
                  <div className="cs-meta-value">{t(m.value)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* The Challenge + Objectives */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.challenge)}</h2>
            {cs.challenge.map((p, i) => (
              <p className="cs-text" key={i}>
                {t(p)}
              </p>
            ))}
            <p className="cs-eyebrow cs-sublabel">{t(L.objectives)}</p>
            <ul className="cs-list cs-check">
              {cs.objectives.map((o, i) => (
                <li key={i}>{t(o)}</li>
              ))}
            </ul>
          </section>

          {/* My Role */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.role)}</h2>
            <p className="cs-text">{t(cs.roleIntro)}</p>
            <div className="cs-chips">
              {cs.responsibilities.map((r, i) => (
                <span className="cs-chip" key={i}>
                  {t(r)}
                </span>
              ))}
            </div>
          </section>

          {/* Understanding the Problem */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.problem)}</h2>
            <p className="cs-text">{t(cs.problemIntro)}</p>
            <div className="cs-cards">
              {cs.painPoints.map((p, i) => (
                <div className="cs-card" key={i}>
                  <div className="cs-card-num">{String(i + 1).padStart(2, "0")}</div>
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

          {/* UX Outcomes */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.outcomes)}</h2>
            {cs.outcomesIntro && <p className="cs-text">{t(cs.outcomesIntro)}</p>}
            <ul className="cs-list cs-check">
              {cs.outcomes.map((o, i) => (
                <li key={i}>{t(o)}</li>
              ))}
            </ul>
          </section>

          {/* Experience Indicators */}
          <section className="cs-section">
            <h2 className="cs-title">{t(L.indicators)}</h2>
            {cs.indicatorsNote && (
              <p className="cs-note">{t(cs.indicatorsNote)}</p>
            )}
            <div className="cs-table">
              <div className="cs-tr cs-th">
                <span>{t(L.metricCol)}</span>
                <span>{t(L.objectiveCol)}</span>
              </div>
              {cs.indicators.map((ind, i) => (
                <div className="cs-tr" key={i}>
                  <span className="cs-metric-name">{t(ind.metric)}</span>
                  <span>{t(ind.objective)}</span>
                </div>
              ))}
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
