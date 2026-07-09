"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { profile, skills, companies, ui } from "@/lib/content";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <header className="hero">
        <div className="container">
          <p className="eyebrow">{t(profile.role)}</p>
          <h1>{profile.name}</h1>
          <p className="lede">{t(profile.tagline)}</p>
          <div className="meta-row">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            {profile.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">{t(ui.home.aboutTitle)}</p>
              <h2>{t(profile.role)}</h2>
            </div>
            <div className="module">
              <p className="lead-serif" style={{ margin: 0 }}>
                {t(profile.summary)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t(ui.home.skillsTitle)}</p>
          </div>
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
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">{t(ui.home.workTitle)}</p>
            <h2>{t(ui.work.title)}</h2>
            <p>{t(ui.home.workSubtitle)}</p>
          </div>
          <div className="card-grid">
            {companies.map((c) => (
              <Link href={`/trayectoria/${c.slug}`} className="card" key={c.slug}>
                <div className="card-top">
                  <div className="badge-init">{c.initials}</div>
                  <div>
                    <h3>{c.name}</h3>
                    <div className="role">{t(c.role)}</div>
                    <div className="period">{c.period}</div>
                  </div>
                </div>
                <p className="desc">{t(c.industry)}</p>
                <span className="arrow">{t(ui.home.viewAll)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
