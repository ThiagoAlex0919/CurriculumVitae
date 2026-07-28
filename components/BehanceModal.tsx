"use client";

import { useEffect } from "react";
import Icon from "@/components/Icon";
import { useI18n } from "@/lib/i18n";
import { ui, behanceEmbedId } from "@/lib/content";
import type { Project } from "@/lib/content";

/**
 * Modal que embebe la página de un proyecto de Behance usando su endpoint
 * oficial de embed (https://www.behance.net/embed/project/{id}).
 * Se abre al hacer clic en una card cuyo storyStatus === "behance".
 * Incluye botón de respaldo "Abrir en Behance" por si el navegador bloquea el iframe.
 */
export default function BehanceModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const id = behanceEmbedId(project.behanceUrl);

  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="behance-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t(project.name)}
    >
      <div className="behance-modal" onClick={(e) => e.stopPropagation()}>
        <header className="behance-modal-head">
          <span className="behance-modal-title">
            <Icon name="behance" size={18} />
            {t(project.name)}
          </span>
          <div className="behance-modal-actions">
            {project.behanceUrl && (
              <a
                className="behance-modal-open"
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(ui.project.openOnBehance)}
                <Icon name="arrow" size={15} />
              </a>
            )}
            <button
              type="button"
              className="behance-modal-close"
              onClick={onClose}
              aria-label={t(ui.project.closeModal)}
            >
              <Icon name="x" size={18} />
            </button>
          </div>
        </header>

        <div className="behance-modal-frame">
          {id ? (
            <iframe
              src={`https://www.behance.net/embed/project/${id}?ssl=1`}
              title={t(project.name)}
              loading="lazy"
              allow="clipboard-write"
              allowFullScreen
            />
          ) : (
            <div className="behance-modal-empty">
              {t(ui.project.embedFallback)}
            </div>
          )}
        </div>

        <p className="behance-modal-note">{t(ui.project.embedFallback)}</p>
      </div>
    </div>
  );
}
