"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  profile,
  skills,
  topSkills,
  education,
  awards,
  experience,
  otherStudies,
  referencesPersonal,
  referencesFamily,
  ui,
} from "@/lib/content";
import Icon from "@/components/Icon";
import Accordion from "@/components/Accordion";
import ExperienceCard from "@/components/ExperienceCard";
import ReadMore from "@/components/ReadMore";
import PageHeader from "@/components/PageHeader";

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .slice(0, 2)
  .join("");


/* ------------------------------------------------------------------
   Hoja de vida imprimible: TODA la información expandida.
   Solo visible en @media print (la vista interactiva se oculta).
   ------------------------------------------------------------------ */
function PrintResume() {
  const { t } = useI18n();
  return (
    <div className="print-resume" aria-hidden>
      <header className="pr-head">
        <h1>{profile.name}</h1>
        <p className="pr-role">{t(profile.role)}</p>
        <p className="pr-tagline">{t(profile.tagline)}</p>
        <p className="pr-contact">
          {profile.location} · {profile.email} · {profile.phones.join(" / ")}
        </p>
        <p className="pr-contact">
          {profile.links.map((l) => `${l.label}: ${l.url.replace("mailto:", "")}`).join("  ·  ")}
        </p>
      </header>

      <section>
        <h2>{t({ es: "Perfil", en: "Profile" })}</h2>
        <p>{t(profile.summary)}</p>
      </section>

      <section>
        <h2>{t({ es: "Habilidades", en: "Skills" })}</h2>
        {skills.map((s, i) => (
          <p key={i}>
            <strong>{t(s.category)}:</strong> {s.items.join(", ")}
          </p>
        ))}
      </section>

      <section>
        <h2>{t({ es: "Experiencia laboral", en: "Work experience" })}</h2>
        {experience.map((e, i) => (
          <article key={i} className="pr-exp">
            <h3>
              {e.company} — {t(e.role)}
            </h3>
            <p className="pr-meta">
              {e.period}
              {e.location ? ` · ${t(e.location)}` : ""}
            </p>
            {e.summary && <p>{t(e.summary)}</p>}
            <p className="pr-meta">
              {e.functions.map((f) => t(f)).join(" · ")}
            </p>
          </article>
        ))}
      </section>

      <section>
        <h2>{t({ es: "Educación", en: "Education" })}</h2>
        {education.map((e, i) => (
          <p key={i}>
            <strong>{t(e.degree)}</strong> — {e.institution} ({e.period})
          </p>
        ))}
      </section>

      <section>
        <h2>{t({ es: "Otros estudios", en: "Other studies" })}</h2>
        {otherStudies.map((o, i) => (
          <p key={i}>
            <strong>{t(o.name)}</strong> — {o.institution} ({o.year})
          </p>
        ))}
      </section>

      <section>
        <h2>{t({ es: "Premios y reconocimientos", en: "Awards" })}</h2>
        {awards.map((a, i) => (
          <p key={i}>
            <strong>{t(a.title)}</strong> — {a.org} ({a.year})
          </p>
        ))}
      </section>

      <section>
        <h2>{t({ es: "Referencias personales", en: "Personal references" })}</h2>
        {referencesPersonal.map((r, i) => (
          <p key={i}>
            <strong>{r.name}</strong> — {t(r.role)}, {r.company}
            {r.phone ? ` · ${r.phone}` : ""}
          </p>
        ))}
      </section>

      <section>
        <h2>{t({ es: "Referencias familiares", en: "Family references" })}</h2>
        {referencesFamily.map((r, i) => (
          <p key={i}>
            <strong>{r.name}</strong> — {t(r.occupation)}, {r.company}
            {r.phone ? ` · ${r.phone}` : ""}
          </p>
        ))}
      </section>
    </div>
  );
}

export default function Home() {
  const { t } = useI18n();
  const [studiesOpen, setStudiesOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const featuredStudies = otherStudies.filter((s) => s.featured);

  return (
    <>
    <PrintResume />
    <div className="dash">
      <div className="dash-grid">
        {/* ---------- Columna fija — perfil ---------- */}
        <aside className="dash-side">
          <div className="profile-card">
            <div className="avatar-photo">
              {profile.photo && !imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photo}
                  alt={profile.name}
                  onError={() => setImgError(true)}
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-role">{t(profile.role)}</p>

            <div className="profile-contact">
              <span className="pc-row">
                <Icon name="pin" size={16} />
                {profile.location}
              </span>
              <a className="pc-row" href={`mailto:${profile.email}`}>
                <Icon name="mail" size={16} />
                {profile.email}
              </a>
              <a
                className="pc-row"
                href={profile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" size={16} />
                {profile.whatsapp}
              </a>
            </div>

            {awards.map((a, i) => (
              <div className="profile-award" key={i}>
                <span className="pa-icon">
                  <Icon name="star" size={16} />
                </span>
                <div>
                  <div className="pa-title">{t(a.title)}</div>
                  <div className="pa-org">
                    {a.org} · {a.year}
                  </div>
                </div>
              </div>
            ))}

            <div className="profile-socials">
              {profile.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  aria-label={l.label}
                  title={l.label}
                >
                  <Icon name={l.icon} size={18} />
                </a>
              ))}
              <button
                className="social-btn social-btn--print"
                onClick={() => window.print()}
                aria-label={t({ es: "Imprimir hoja de vida", en: "Print resume" })}
                title={t({ es: "Imprimir hoja de vida", en: "Print resume" })}
              >
                <Icon name="print" size={18} />
              </button>
            </div>
          </div>
        </aside>

        {/* ---------- Columna de contenido ---------- */}
        <div className="dash-main">
          <PageHeader />

          {/* Perfil — resumen (ver más) + top skills */}
          <Accordion title={t(ui.home.aboutTitle)} index={0}>
            <ReadMore
              text={t(profile.summary)}
              limit={240}
              className="lead-serif"
            />
            <button
              type="button"
              className="topskills-box"
              onClick={() => setSkillsOpen(true)}
            >
              <span className="ts-icon">
                <Icon name="star" size={18} />
              </span>
              <div className="ts-body">
                <div className="ts-title">{t(ui.home.skillsTopLabel)}</div>
                <div className="ts-list">{topSkills.join(" · ")}</div>
              </div>
              <span className="ts-arrow">
                <Icon name="arrow" size={18} />
              </span>
            </button>
          </Accordion>

          {/* Experiencia */}
          <Accordion
            title={t(ui.home.experienceTitle)}
            index={1}
            id="experiencia"
          >
            <div className="exp-grid">
              {experience.slice(0, 4).map((x, i) => (
                <ExperienceCard job={x} defaultOpen={i < 2} key={i} />
              ))}
            </div>
            <button className="link-btn full" onClick={() => setExpOpen(true)}>
              {t(ui.home.experienceViewAll)} ({experience.length}) →
            </button>
          </Accordion>

          {/* Formación — lista */}
          <Accordion title={t(ui.home.educationTitle)} index={2}>
            <div className="os-list">
              {education.map((e, i) => (
                <div className="os-item" key={i}>
                  <div>
                    <div className="os-name">{t(e.degree)}</div>
                    <div className="os-inst">{e.institution}</div>
                  </div>
                  <div className="os-year">{e.period}</div>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Otros estudios */}
          <Accordion title={t(ui.home.otherStudiesTitle)} index={3}>
            <div className="os-list">
              {featuredStudies.map((o, i) => (
                <div className="os-item" key={i}>
                  <div>
                    <div className="os-name">{t(o.name)}</div>
                    <div className="os-inst">{o.institution}</div>
                  </div>
                  <div className="os-year">{o.year}</div>
                </div>
              ))}
            </div>
            <button
              className="link-btn full"
              onClick={() => setStudiesOpen(true)}
            >
              {t(ui.home.studiesViewAll)} ({otherStudies.length}) →
            </button>
          </Accordion>

          {/* Referencias — agrupadas, diseño sencillo */}
          <Accordion title={t(ui.home.referencesTitle)} index={4}>
            <div className="ref-group">
              <div className="ref-group-title">
                {t(ui.home.referencesPersonal)}
              </div>
              <div className="ref-list">
                {referencesPersonal.map((r, i) => (
                  <div className="ref-row" key={i}>
                    <div>
                      <div className="ref-name">{r.name}</div>
                      <div className="ref-sub">
                        {t(r.role)} · {r.company}
                      </div>
                    </div>
                    {r.phone && (
                      <a
                        className="ref-phone"
                        href={`tel:${r.phone.replace(/\s/g, "")}`}
                      >
                        <Icon name="phone" size={14} />
                        {r.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="ref-divider" />

            <div className="ref-group">
              <div className="ref-group-title">
                {t(ui.home.referencesFamily)}
              </div>
              <div className="ref-list">
                {referencesFamily.map((r, i) => (
                  <div className="ref-row" key={i}>
                    <div>
                      <div className="ref-name">{r.name}</div>
                      <div className="ref-sub">
                        {t(r.occupation)} · {r.company}
                      </div>
                    </div>
                    {r.phone && (
                      <a
                        className="ref-phone"
                        href={`tel:${r.phone.replace(/\s/g, "")}`}
                      >
                        <Icon name="phone" size={14} />
                        {r.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Accordion>
        </div>
      </div>

      {/* Modal — toda la experiencia (80% pantalla) */}
      {expOpen && (
        <div className="modal-overlay" onClick={() => setExpOpen(false)}>
          <div
            className="modal-panel modal-lg"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <span className="dash-h2" style={{ margin: 0 }}>
                {t(ui.home.experienceModalTitle)}
              </span>
              <button
                className="modal-close"
                onClick={() => setExpOpen(false)}
                aria-label={t(ui.home.close)}
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="exp-grid">
                {experience.map((x, i) => (
                  <ExperienceCard job={x} defaultOpen key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal — todos los estudios */}
      {studiesOpen && (
        <div className="modal-overlay" onClick={() => setStudiesOpen(false)}>
          <div
            className="modal-panel modal-lg"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <span className="dash-h2" style={{ margin: 0 }}>
                {t(ui.home.studiesModalTitle)}
              </span>
              <button
                className="modal-close"
                onClick={() => setStudiesOpen(false)}
                aria-label={t(ui.home.close)}
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="modal-body os-list">
              {otherStudies.map((o, i) => (
                <div className="os-item" key={i}>
                  <div>
                    <div className="os-name">{t(o.name)}</div>
                    <div className="os-inst">{o.institution}</div>
                  </div>
                  <div className="os-year">{o.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal — todas las skills */}
      {skillsOpen && (
        <div className="modal-overlay" onClick={() => setSkillsOpen(false)}>
          <div
            className="modal-panel modal-lg"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <span className="dash-h2" style={{ margin: 0 }}>
                {t(ui.home.skillsModalTitle)}
              </span>
              <button
                className="modal-close"
                onClick={() => setSkillsOpen(false)}
                aria-label={t(ui.home.close)}
              >
                <Icon name="x" size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="skills">
                {skills.map((s, i) => (
                  <div className="skill-cat" key={i}>
                    <h3>{t(s.category)}</h3>
                    <div className="tag-list">
                      {s.items.map((it) => (
                        <span className="tag" key={it}>
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
