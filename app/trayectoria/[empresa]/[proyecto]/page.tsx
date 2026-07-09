"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { findProject, ui } from "@/lib/content";

export default function ProjectPage() {
  const { t } = useI18n();
  const params = useParams<{ empresa: string; proyecto: string }>();
  const { company, project } = findProject(params.empresa, params.proyecto);

  if (!company || !project) return notFound();

  return (
    <>
      <header className="detail-head">
        <div className="container">
          <Link href={`/trayectoria/${company.slug}`} className="backlink">
            ← {company.name}
          </Link>
          <p className="eyebrow" style={{ marginTop: 22, marginBottom: 0 }}>
            {t(ui.project.forClient)} {t(project.client)}
          </p>
          <h1>{t(project.name)}</h1>
          <p style={{ maxWidth: 560, marginTop: 4 }}>
            {t(project.role)} · {project.year}
          </p>
        </div>
      </header>

      <section>
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <div className="k">{t(ui.project.forClient)}</div>
              <div className="v">{t(project.client)}</div>
            </div>
            <div className="info-item">
              <div className="k">{t(ui.nav.work)}</div>
              <div className="v">{company.name}</div>
            </div>
            <div className="info-item">
              <div className="k">Tags</div>
              <div className="v">{project.tags.join(" · ")}</div>
            </div>
          </div>

          <div className="prose-block module">
            <h2>{t(ui.project.challenge)}</h2>
            <p>{t(project.challenge)}</p>
          </div>

          <div className="prose-block module">
            <h2>{t(ui.project.process)}</h2>
            <p>{t(project.process)}</p>
          </div>

          <div style={{ maxWidth: 900 }}>
            <h2 style={{ fontSize: 26, marginBottom: 16 }}>
              {t(ui.project.beforeAfter)}
            </h2>
            <div className="ba-grid">
              <div className="ba-cell">
                <div className="k">{t(ui.project.before)}</div>
                <p>{t(project.before)}</p>
              </div>
              <div className="ba-cell">
                <div className="k">{t(ui.project.after)}</div>
                <p>{t(project.after)}</p>
              </div>
            </div>
          </div>

          <div className="prose-block module">
            <h2>{t(ui.project.solution)}</h2>
            <p className="lead-serif" style={{ margin: "8px 0 0" }}>
              {t(project.solution)}
            </p>
          </div>

          <div style={{ maxWidth: 900, marginBottom: 40 }}>
            <h2 style={{ fontSize: 26, marginBottom: 16 }}>
              {t(ui.project.metrics)}
            </h2>
            <div className="metric-grid">
              {project.metrics.map((m, i) => (
                <div className="metric" key={i}>
                  <div className="label">{m.label}</div>
                  <div className="value">{m.value}</div>
                  <div className="note">{t(m.note)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
