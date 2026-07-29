"use client";

import { useEffect, useState } from "react";

/**
 * Índice lateral sticky + fade-in de las secciones del caso de estudio.
 * Para QUITAR esta mejora: borra la línea <CaseNav ... /> en la página.
 * Sin este componente, las secciones se muestran normalmente (sin animación).
 */
export default function CaseNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const cs = document.querySelector(".cs");
    if (cs) cs.classList.add("cs-anim");
    const children = cs ? Array.from(cs.children) : [];

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealObs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    children.forEach((c) => revealObs.observe(c));

    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const spyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spyObs.observe(s));

    return () => {
      revealObs.disconnect();
      spyObs.disconnect();
      if (cs) cs.classList.remove("cs-anim");
    };
  }, [items]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="cs-nav" aria-label="Índice del caso">
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={active === it.id ? "on" : ""}
              onClick={(e) => go(e, it.id)}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
