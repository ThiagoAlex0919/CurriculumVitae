"use client";

import { useState } from "react";
import Icon from "./Icon";
import Collapse from "./Collapse";

export default function Accordion({
  title,
  index = 0,
  id,
  children,
}: {
  title: string;
  index?: number;
  id?: string;
  children: React.ReactNode;
}) {
  /* nace abierto solo el primero (Perfil profesional); el resto cerrados */
  const [open, setOpen] = useState(index === 0);

  return (
    <section id={id} className={`acc ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="acc-head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="dash-h2">{title}</span>
        <span className={`acc-icon ${open ? "flip" : ""}`} aria-hidden="true">
          <Icon name="chevron-down" size={18} />
        </span>
      </button>
      <Collapse open={open}>
        <div className="acc-body">{children}</div>
      </Collapse>
    </section>
  );
}
