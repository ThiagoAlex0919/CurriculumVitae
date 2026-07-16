"use client";

import { useState } from "react";
import { useI18n, type Localized } from "@/lib/i18n";
import { ui } from "@/lib/content";

type Job = {
  company: string;
  initials: string;
  logo?: string;
  role: Localized;
  period: string;
  functions: Localized[];
  summary?: Localized;
  location?: Localized;
};

export default function ExperienceCard({
  job,
  defaultOpen = false,
}: {
  job: Job;
  defaultOpen?: boolean;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(defaultOpen);
  const [logoErr, setLogoErr] = useState(false);
  const current = /actual/i.test(job.period);

  return (
    <div
      className={`xcard ${open ? "is-open" : "is-closed"} ${
        current ? "is-current" : ""
      }`}
    >
      {current && <span className="xcard-dot" aria-hidden="true" />}

      <div className="xcard-head">
        <div className="xcard-logo">
          {job.logo && !logoErr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={job.logo}
              alt={job.company}
              onError={() => setLogoErr(true)}
            />
          ) : (
            <span>{job.initials}</span>
          )}
        </div>
        <div className="xcard-headtext">
          <div className="xcard-meta">
            {job.company} <span className="xcard-sep">—</span> {job.period}
          </div>
          <div className="xcard-role">{t(job.role)}</div>
        </div>
      </div>

      <div className={`xcard-fns ${open ? "" : "clamp2"}`}>
        <span className="xcard-fnlabel">{t(ui.home.functionsLabel)}:</span>
        {job.functions.map((f, i) => (
          <span className="tag out" key={i}>
            {t(f)}
          </span>
        ))}
      </div>

      {open && job.summary && (
        <p className="xcard-summary">{t(job.summary)}</p>
      )}

      <div className="xcard-foot">
        <button
          type="button"
          className="xcard-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? t(ui.home.readLess) : t(ui.home.readMore)}
        </button>
        {open && job.location && (
          <span className="xcard-loc">{t(job.location)}</span>
        )}
      </div>
    </div>
  );
}
