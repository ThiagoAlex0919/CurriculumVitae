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
import JobCard from "@/components/JobCard";
import ReadMore from "@/components/ReadMore";

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .slice(0, 2)
  .join("");

export default function Home() {
  const { t } = useI18n();
  const [studiesOpen, setStudiesOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [expOpen, setExpOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const featured = experience.find((e) => e.featured);
  const rest = experience.filter((e) => !e.featured);
  const featuredStudies = otherStudies.filter((s) => s.featured);

  return (
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
            </div>
          </div>
        </aside>

        {/* ---------- Columna de contenido ---------- */}
        <div className="dash-main">
          <div className="content-header">
            <span className="ch-label">{t(ui.headerLabel)}</span>
          </div>

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

          {/* Formación — lista */}
          <Accordion title={t(ui.home.educationTitle)} index={1}>
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

          {/* Experiencia */}
          <Accordion title={t(ui.home.experienceTitle)} index={2}>
            {featured && (
              <div className="exp-featured">
                <div className="exp-head">
                  <div className="exp-badge">{featured.initials}</div>
                  <div className="exp-head-text">
                    <div className="exp-company">
                      {featured.company}
                      <span className="exp-tag-recent">
                        {t(ui.home.mostRecent)}
                      </span>
                    </div>
                    <div className="exp-role">{t(featured.role)}</div>
                  </div>
                  <div className="exp-period">{featured.period}</div>
                </div>
                {featured.summary && (
                  <p className="exp-summary">
                    {bizOpen
                      ? t(featured.summary) + " "
                      : t(featured.summary).slice(0, 190).trimEnd() + "… "}
                    <button
                      className="more-inline"
                      onClick={() => setBizOpen((o) => !o)}
                    >
                      {bizOpen ? t(ui.home.readLess) : t(ui.home.readMore)}
                    </button>
                  </p>
                )}
                {bizOpen && (
                  <>
                    <div className="exp-fn-label">
                      {t(ui.home.functionsLabel)}
                    </div>
                    <div className="tag-list">
                      {featured.functions.map((f, i) => (
                        <span className="tag xs" key={i}>
                          {t(f)}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="exp-grid">
              {rest.slice(0, 3).map((x, i) => (
                <JobCard job={x} key={i} />
              ))}
            </div>
            <button className="link-btn full" onClick={() => setExpOpen(true)}>
              {t(ui.home.experienceViewAll)} ({experience.length}) →
            </button>
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
            <p className="eyebrow">{t(ui.home.referencesPersonal)}</p>
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

            <p className="eyebrow" style={{ marginTop: 18 }}>
              {t(ui.home.referencesFamily)}
            </p>
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
          </Accordion>
        </div>
      </div>

      {/* Modal — toda la experiencia */}
      {expOpen && (
        <div className="modal-overlay" onClick={() => setExpOpen(false)}>
          <div
            className="modal-panel"
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
              {experience.map((x, i) => (
                <div className="exp-modal-item" key={i}>
                  <div className="exp-head">
                    <div className="exp-badge sm">{x.initials}</div>
                    <div className="exp-head-text">
                      <div className="exp-company">{x.company}</div>
                      <div className="exp-role">{t(x.role)}</div>
                    </div>
                    <div className="exp-period">{x.period}</div>
                  </div>
                  <div className="tag-list" style={{ marginTop: 10 }}>
                    {x.functions.map((f, j) => (
                      <span className="tag xs" key={j}>
                        {t(f)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal — todos los estudios */}
      {studiesOpen && (
        <div className="modal-overlay" onClick={() => setStudiesOpen(false)}>
          <div
            className="modal-panel"
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
            className="modal-panel"
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
  );
}
