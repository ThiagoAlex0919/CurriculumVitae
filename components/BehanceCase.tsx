"use client";

import Icon from "@/components/Icon";
import { useI18n } from "@/lib/i18n";
import { ui } from "@/lib/content";
import type { Project } from "@/lib/content";

/**
 * Puente a Behance: se muestra en la página de detalle cuando un proyecto
 * todavía no tiene su historia nativa (project.storyStatus === "behance").
 * Para migrar a la historia nativa, escribe los campos challenge/process/…
 * en content.ts y cambia storyStatus a "native": esta pieza desaparece sola.
 */
export default function BehanceCase({ project }: { project: Project }) {
  const { t } = useI18n();
  if (!project.behanceUrl) return null;

  return (
    <div className="behance-case module">
      {project.image && (
        <a
          className="behance-case-cover"
          href={project.behanceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundImage: `url(${project.image})` }}
          aria-label={t(ui.project.viewOnBehance)}
        />
      )}
      <div className="behance-case-body">
        <span className="behance-case-eyebrow">
          <Icon name="behance" size={16} />
          {t(ui.project.behanceEyebrow)}
        </span>
        <p className="behance-case-note">{t(ui.project.behanceNote)}</p>
        <a
          className="behance-cta"
          href={project.behanceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="behance" size={18} />
          {t(ui.project.viewOnBehance)}
          <Icon name="arrow" size={16} />
        </a>
      </div>
    </div>
  );
}
