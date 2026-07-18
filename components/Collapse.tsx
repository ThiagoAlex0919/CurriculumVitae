"use client";

import { useEffect, useRef } from "react";

/* Colapso animado con altura medida por JS (ease-out fluido).
   Reutilizable en todo el proyecto: envuelve el contenido que se
   expande/contrae y anima la altura sin saltos. */
export default function Collapse({
  open,
  className = "",
  children,
}: {
  open: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* primer render: fija la altura sin animar */
    if (!mounted.current) {
      mounted.current = true;
      el.style.height = open ? "auto" : "0px";
      return;
    }

    /* altura de partida real (aunque venga de "auto") */
    const from = el.getBoundingClientRect().height;
    el.style.height = `${from}px`;
    el.getBoundingClientRect(); /* fuerza reflow para fijar el inicio */

    const to = open ? el.scrollHeight : 0;
    requestAnimationFrame(() => {
      el.style.height = `${to}px`;
    });

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "height") return; /* ignora el fade */
      if (open) el.style.height = "auto";
      el.removeEventListener("transitionend", onEnd);
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [open]);

  return (
    <div
      ref={ref}
      className={`collapse ${open ? "is-open" : ""} ${className}`}
      aria-hidden={!open}
    >
      {children}
    </div>
  );
}
