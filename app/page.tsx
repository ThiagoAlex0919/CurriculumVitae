"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import {
  profile,
  skills,
  education,
  experience,
  otherStudies,
  ui,
} from "@/lib/content";
import Icon from "@/components/Icon";

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .slice(0, 2)
  .join("");

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="container dash">
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

        {/* ---------- Columna 70% — scroll ---------- */}
        <div className="dash-main">
          <section className="module">
            <p className="eyebrow">{t(ui.home.aboutTitle)}</p>
            <p className="lead-serif" style={{ margin: 0 }}>
              {t(profile.summary)}
            </p>
          </section>

          <section className="dash-section">
            <h2 className="dash-h2">{t(ui.home.educationTitle)}</h2>
            <div className="edu-grid">
              {education.map((e, i) => (
                <div className="edu-item module" key={i}>
                  <div className="edu-period">{e.period}</div>
                  <h3 className="edu-degree">{t(e.degree)}</h3>
                  <div className="edu-inst">{e.institution}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-h2">{t(ui.home.experienceTitle)}</h2>
            <div className="timeline module">
              {experience.map((x, i) => (
                <div className="tl-item" key={i}>
                  <div className="tl-dot" />
                  <div className="tl-body">
                    <div className="tl-period">{x.period}</div>
                    <h3 className="tl-role">{t(x.role)}</h3>
                    <div className="tl-company">{x.company}</div>
                    <p className="tl-summary">{t(x.summary)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-h2">{t(ui.home.skillsTitle)}</h2>
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
          </section>

          <section className="dash-section">
            <h2 className="dash-h2">{t(ui.home.otherStudiesTitle)}</h2>
            <div className="module os-list">
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
          </section>
        </div>
      </div>
    </div>
  );
}
