"use client";

import { useState } from "react";
import { useI18n, type Localized } from "@/lib/i18n";
import { ui } from "@/lib/content";
import Icon from "./Icon";

type Job = {
  company: string;
  initials: string;
  role: Localized;
  period: string;
  functions: Localized[];
};

export default function JobCard({ job }: { job: Job }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className={`exp-card ${open ? "is-open" : ""}`}>
      <div className="exp-head">
        <div className="exp-badge sm">{job.initials}</div>
        <div className="exp-head-text">
          <div className="exp-company">{job.company}</div>
          <div className="exp-role">{t(job.role)}</div>
        </div>
        <div className="exp-period">{job.period}</div>
      </div>
      <button
        type="button"
        className="fn-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{t(ui.home.functionsLabel)}</span>
        <span className={`fn-chevron ${open ? "flip" : ""}`} aria-hidden="true">
          <Icon name="chevron-down" size={15} />
        </span>
      </button>
      {open && (
        <div className="tag-list" style={{ marginTop: 12 }}>
          {job.functions.map((f, j) => (
            <span className="tag xs" key={j}>
              {t(f)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
