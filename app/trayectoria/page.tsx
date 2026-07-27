"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { companies, ui } from "@/lib/content";
import type { Company, Project } from "@/lib/content";

type Work = { company: Company; project: Project };

const ALL = "__all__";

export default function TrayectoriaPage() {
  const { t } = useI18n();

  // Aplana todos los proyectos de todas las empresas en un solo listado.
  const works: Work[] = useMemo(
    () =>
      companies.flatMap((company) =>
        company.projects.map((project) => ({ company, project }))
      ),
    []
  );

  // Opciones de filtro (por ahora: empresa y año).
  const companyNames = useMemo(
    () => Array.from(new Set(works.map((w) => w.company.name))).sort(),
    [works]
  );
  const years = useMemo(
    () =>
      Array.from(new Set(works.map((w) => w.project.year))).sort(
        (a, b) => Number(b) - Number(a)
      ),
    [works]
  );

  const [company, setCompany] = useState<string>(ALL);
  const [year, setYear] = useState<string>(ALL);

  const filtered = works
    .filter((w) => (company === ALL ? true : w.company.name === company))
    .filter((w) => (year === ALL ? true : w.project.year === year))
    .sort((a, b) => Number(b.project.year) - Number(a.project.year));

  const hasFilters = company !== ALL || year !== ALL;
  const clear = () => {
    setCompany(ALL);
    setYear(ALL);
  };

  return (
    <div className="tray-page">
      {/* Banner "My Works" — fondo blanco, ilustración protagonista y acentos creativos */}
      <div className="works-banner">
        <div className="works-banner-dots" aria-hidden />
        <span className="works-accent works-accent--square" aria-hidden />
        <span className="works-accent works-accent--plus" aria-hidden>
          +
        </span>
        <div className="works-banner-text">
          <span className="works-banner-eyebrow">
            <span className="works-banner-spark" aria-hidden />
            {t(ui.work.bannerLabel)}
          </span>
          <h1 className="works-banner-h1">
            My{" "}
            <span className="works-banner-hl">
              Works
              <svg
                className="works-banner-underline"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8 C 50 2, 150 2, 198 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="works-banner-art"
          src="/imagenes/my-work.png"
          alt=""
          aria-hidden
        />
      </div>

      {/* Barra de filtros */}
      <section className="works-filters">
        <div className="works-filters-row">
          <span className="works-filters-label">{t(ui.work.filtersLabel)}</span>

          <label className="works-select">
            <span className="works-select-k">{t(ui.work.filterCompany)}</span>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value={ALL}>{t(ui.work.filterAll)}</option>
              {companyNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="works-select">
            <span className="works-select-k">{t(ui.work.filterYear)}</span>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value={ALL}>{t(ui.work.filterAll)}</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          <span className="works-count">
            {filtered.length} {t(ui.work.resultsCount)}
          </span>

          {hasFilters && (
            <button type="button" className="works-clear" onClick={clear}>
              {t(ui.work.clearFilters)}
            </button>
          )}
        </div>
      </section>

      {/* Grid de proyectos (tarjeta simplificada) */}
      {filtered.length === 0 ? (
        <p className="works-empty">{t(ui.work.empty)}</p>
      ) : (
        <div className="works-grid">
          {filtered.map(({ company: c, project: p }) => (
            <Link
              key={`${c.slug}-${p.slug}`}
              href={`/trayectoria/${c.slug}/${p.slug}`}
              className="work-card"
              style={
                p.image ? { backgroundImage: `url(${p.image})` } : undefined
              }
            >
              <div className="work-card-shade" />
              <div className="work-card-inner">
                <div className="work-card-head">
                  <span className="work-card-company">{c.name}</span>
                  <span className="work-card-year">{p.year}</span>
                </div>
                <div className="work-card-body">
                  <h3 className="work-card-title">{t(p.name)}</h3>
                  <span className="work-card-cta">
                    {t(ui.company.viewCase)} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
