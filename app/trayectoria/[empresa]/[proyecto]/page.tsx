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
  const aboutItems =
    project.about && project.about.length
      ? project.about
      : [project.challenge, project.process, project.solution];

  return (
    <div className="proj-page">
      <Link href={`/trayectoria/${company.slug}`} className="proj-back">
        <span aria-hidden>←</span> {t(ui.project.back)} · {company.name}
      </Link>

      {/* Hero: info (izq) + imagen (der) */}
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

      <hr className="proj-divider" />

      {isBehance ? (
        <BehanceCase project={project} />
      ) : (
        <section className="proj-about">
          <h2 className="proj-about-title">{t(ui.project.about)}</h2>
          {aboutItems.map((item, i) => (
            <p className="proj-about-item" key={i}>
              {t(item)}
            </p>
          ))}
        </section>
      )}
    </div>
  );
}
