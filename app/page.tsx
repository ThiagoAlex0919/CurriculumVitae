"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  profile,
  skills,
  education,
  awards,
  quotes,
  experience,
  otherStudies,
  referencesPersonal,
  referencesFamily,
  ui,
} from "@/lib/content";
import Icon from "@/components/Icon";
import Accordion from "@/components/Accordion";

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .slice(0, 2)
  .join("");

export default function Home() {
  const { t } = useI18n();
  const [studiesOpen, setStudiesOpen] = useState(false);

  const featured = experience.find((e) => e.featured);
  const rest = experience.filter((e) => !e.featured);
  const featuredStudies = otherStudies.filter((s) => s.featured);

  return (
    <div className="dash">
      <div className="dash-grid">
        {/* ---------- Columna 30% — perfil fijo ---------- */}
        <aside className="dash-side">
          <div className="profile-card">
            <div className="avatar">
              {profile.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photo} alt={profile.name} />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-role">{t(profile.role)}</p>

            <div className="profile-contact">
              <span className="pc-row">
                <Icon name="pin" size={17} />
                {profile.location}
              </span>
              <a className="pc-row" href={`mailto:${profile.email}`}>
                <Icon name="mail" size={17} />
                {profile.email}
              </a>
              <a
                className="pc-row"
                href={profile.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" size={17} />
                {profile.whatsapp}
              </a>
            </div>

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
                  <Icon name={l.icon} size={19} />
                </a>
              ))}
            </div>

            <Link href="/trayectoria" className="btn-accent profile-cta">
              {t(ui.home.viewPortfolio)} →
            </Link>
          </div>
        </aside>

        {/* ---------- Columna 70% — acordeones ---------- */}
        <div className="dash-main">
          <Accordion title={t(ui.home.aboutTitle)} index={0}>
            <p className="lead-serif" style={{ margin: 0 }}>
              {t(profile.summary)}
            </p>
          </Accordion>

          <Accordion title={t(ui.home.educationTitle)} index={1}>
            <div className="edu-grid">
              {education.map((e, i) => (
                <div className="edu-item card-fill" key={i}>
                  <div className="edu-period">{e.period}</div>
                  <h3 className="edu-degree">{t(e.degree)}</h3>
                  <div className="edu-inst">{e.institution}</div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={t(ui.home.awardsTitle)} index={2}>
            <div className="edu-grid">
              {awards.map((a, i) => (
                <div className="award card-fill" key={i}>
                  <div className="award-year">{a.year}</div>
                  <h3 className="award-title">{t(a.title)}</h3>
                  <div className="award-org">{a.org}</div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={t(ui.home.quotesTitle)} index={3}>
            <div className="quotes">
              {quotes.map((q, i) => (
                <figure className="quote" key={i}>
                  <blockquote>“{t(q.text)}”</blockquote>
                  <figcaption>— {q.author}</figcaption>
                </figure>
              ))}
            </div>
          </Accordion>

          <Accordion title={t(ui.home.experienceTitle)} index={4}>
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
                  <p className="exp-summary">{t(featured.summary)}</p>
                )}
                <div className="exp-fn-label">{t(ui.home.functionsLabel)}</div>
                <div className="tag-list">
                  {featured.functions.map((f, i) => (
                    <span className="tag" key={i}>
                      {t(f)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="exp-grid">
              {rest.map((x, i) => (
                <div className="exp-card card-fill" key={i}>
                  <div className="exp-head">
                    <div className="exp-badge sm">{x.initials}</div>
                    <div className="exp-head-text">
                      <div className="exp-company">{x.company}</div>
                      <div className="exp-role">{t(x.role)}</div>
                    </div>
                  </div>
                  <div className="exp-period">{x.period}</div>
                  <div className="tag-list">
                    {x.functions.map((f, j) => (
                      <span className="tag" key={j}>
                        {t(f)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion title={t(ui.home.skillsTitle)} index={5}>
            <div className="skills">
              {skills.map((s, i) => (
                <div className="skill-cat card-fill" key={i}>
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
          </Accordion>

          <Accordion title={t(ui.home.otherStudiesTitle)} index={6}>
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

          <Accordion title={t(ui.home.referencesTitle)} index={7}>
            <div className="two-col">
              <div className="ref-col">
                <p className="eyebrow">{t(ui.home.referencesPersonal)}</p>
                <div className="ref-list">
                  {referencesPersonal.map((r, i) => (
                    <div className="ref-card" key={i}>
                      <h3 className="ref-name">{r.name}</h3>
                      <div className="ref-role">{t(r.role)}</div>
                      <div className="ref-company">{r.company}</div>
                      <div className="ref-contact">
                        {t(ui.home.referenceContact)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ref-col">
                <p className="eyebrow">{t(ui.home.referencesFamily)}</p>
                <div className="ref-list">
                  {referencesFamily.map((r, i) => (
                    <div className="ref-card" key={i}>
                      <h3 className="ref-name">{r.name}</h3>
                      <div className="ref-role">{t(r.profile)}</div>
                      <div className="ref-company">
                        {t(r.occupation)} · {r.company}
                      </div>
                      <div className="ref-contact">
                        {t(ui.home.referenceContact)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </div>

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
    </div>
  );
}
