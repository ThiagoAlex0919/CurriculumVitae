"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { experience } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import "./viaje.css";

/* Textos locales (aislados) */
const TX = {
  eyebrow: { es: "Bitácora de vuelo", en: "Flight log" },
  title: { es: "El viaje", en: "The journey" },
  sub: {
    es: "Del despegue en 2011 al presente en Bizagi. Haz scroll y sigue al cohete: cada parada, una misión.",
    en: "From liftoff in 2011 to the present at Bizagi. Scroll and follow the rocket: each stop, a mission.",
  },
  cue: { es: "Inicia el ascenso", en: "Begin the ascent" },
  mission: { es: "Misión", en: "Mission" },
  today: { es: "Hoy", en: "Now" },
  finalTitle: { es: "Destino alcanzado", en: "Destination reached" },
  finalSub: {
    es: "Este es el viaje hasta hoy. ¿Hablamos del próximo destino?",
    en: "This is the journey so far. Shall we talk about the next destination?",
  },
  contact: { es: "Iniciar contacto", en: "Make contact" },
};

const ART = "/ilustraciones";
/* una ilustración decorativa por parada (se repiten en ciclo) */
const NODE_ART = [
  `${ART}/innicion_.webp`, // 2011 despegue
  `${ART}/tierra-line.webp`,
  `${ART}/satelite.webp`,
  `${ART}/estacion.webp`,
  `${ART}/martes.webp`,
  `${ART}/ovni.webp`,
  `${ART}/saturno.webp`,
  `${ART}/moon.webp`, // hoy: la luna
];

const startYear = (period: string) => {
  const m = period.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
};

type Pt = { x: number; y: number };

/* Catmull-Rom -> Bézier: curva suave que pasa por todos los puntos */
function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function ViajePage() {
  const { t, locale } = useI18n();
  const L = (o: { es: string; en: string }) => o[locale as "es" | "en"] ?? o.es;

  /* orden ascendente: del origen (Manuela Beltrán 2011) al presente (Bizagi) */
  const journey = [...experience].reverse();
  const total = journey.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);

  /* geometría del camino (recalculada según ancho) */
  const [geo, setGeo] = useState<{ w: number; h: number; d: string; pts: Pt[] }>({
    w: 0,
    h: 0,
    d: "",
    pts: [],
  });

  /* construir el camino serpenteante en px */
  useEffect(() => {
    const build = () => {
      const el = trackRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const mobile = w < 760;
      const stepH = Math.min(mobile ? 560 : 620, window.innerHeight * 0.9);
      const h = total * stepH;
      const marginY = stepH * 0.6;
      const leftX = mobile ? w * 0.34 : w * 0.26;
      const rightX = mobile ? w * 0.66 : w * 0.74;

      const pts: Pt[] = journey.map((_, i) => {
        const yTop = marginY + (i * (h - 2 * marginY)) / (total - 1);
        /* asciende cronológicamente: 2011 arriba, hoy abajo */
        const x = i % 2 === 0 ? leftX : rightX;
        return { x, y: yTop };
      });

      setGeo({ w, h, d: smoothPath(pts), pts });
    };
    build();
    window.addEventListener("resize", build);
    return () => window.removeEventListener("resize", build);
  }, [total]); // eslint-disable-line react-hooks/exhaustive-deps

  /* modo escena en <body> mientras vive la página */
  useEffect(() => {
    document.body.classList.add("vj-mode");
    return () => document.body.classList.remove("vj-mode");
  }, []);

  /* motor de scroll: cohete sobre la curva + estela + nodos */
  useEffect(() => {
    const track = trackRef.current;
    const path = pathRef.current;
    const rocket = rocketRef.current;
    if (!track || !path || !rocket || !geo.d) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;

    const nodes = Array.from(track.querySelectorAll<HTMLElement>(".vj-node"));
    let raf = 0;
    let shown = 0;

    const frame = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      /* progreso del viaje: 0 al entrar, 1 al salir por abajo */
      const target = Math.min(
        Math.max((vh * 0.5 - rect.top) / rect.height, 0),
        1
      );
      shown += (target - shown) * 0.1;

      /* estela: se dibuja de inicio a fin */
      path.style.strokeDashoffset = `${len * (1 - shown)}`;

      /* cohete sobre la curva, orientado a la tangente */
      const l = Math.max(0.5, Math.min(shown * len, len - 0.5));
      const p = path.getPointAtLength(l);
      const p2 = path.getPointAtLength(Math.min(l + 2, len));
      const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      /* la nariz del cohete apunta hacia arriba en el arte: +90 alinea con el avance */
      rocket.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${ang + 90}deg)`;

      /* encender nodos que el cohete ya pasó */
      nodes.forEach((n, i) => {
        const ti = total > 1 ? i / (total - 1) : 0;
        n.classList.toggle("is-on", shown >= ti - 0.02);
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [geo, total]);

  const goToTrack = () => {
    trackRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHeader />
      <div className="vj-scene">
        <div className="vj-stars vj-stars--far" />
        <div className="vj-stars vj-stars--near" />

        {/* Intro */}
        <section className="vj-hero">
          <p className="vj-eyebrow">{L(TX.eyebrow)}</p>
          <h1>{L(TX.title)}</h1>
          <p className="vj-sub">{L(TX.sub)}</p>
          <button className="vj-cue" onClick={goToTrack}>
            ↓ {L(TX.cue)}
          </button>
        </section>

        {/* Camino */}
        <div className="vj-track" ref={trackRef} style={{ height: geo.h || undefined }}>
          <svg
            className="vj-path-svg"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            fill="none"
            aria-hidden
          >
            {/* riel base tenue */}
            <path d={geo.d} className="vj-path-base" />
            {/* estela que se dibuja */}
            <path ref={pathRef} d={geo.d} className="vj-path-fill" />
          </svg>

          {/* cohete viajero (SVG inline, nariz hacia arriba) */}
          <div className="vj-rocket" ref={rocketRef} aria-hidden>
            <svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg">
              <g className="vj-flame" transform="translate(0 196)">
                <path d="M60 0 C74 22 78 40 60 66 C42 40 46 22 60 0Z" fill="#fbbf24" />
                <path d="M60 6 C67 20 68 30 60 46 C52 30 53 20 60 6Z" fill="#f97316" />
              </g>
              <path d="M38 140 C22 152 16 176 18 196 L38 172 Z" fill="#1e2a5e" />
              <path d="M82 140 C98 152 104 176 102 196 L82 172 Z" fill="#1e2a5e" />
              <path d="M60 6 C82 34 92 74 92 118 C92 156 80 184 60 196 C40 184 28 156 28 118 C28 74 38 34 60 6Z" fill="#e8edf7" />
              <path d="M60 6 C82 34 92 74 92 118 C92 156 80 184 60 196 L60 6Z" fill="#c7d2e8" />
              <path d="M60 6 C70 18 77 34 80 50 L40 50 C43 34 50 18 60 6Z" fill="#2f80ed" />
              <circle cx="60" cy="92" r="18" fill="#0a1024" stroke="#2f80ed" strokeWidth="4" />
              <circle cx="54" cy="86" r="5" fill="#38bdf8" opacity="0.85" />
              <path d="M46 190 L74 190 L70 204 L50 204 Z" fill="#1e2a5e" />
            </svg>
          </div>

          {/* paradas */}
          {journey.map((j, i) => {
            const pt = geo.pts[i];
            if (!pt) return null;
            const isLast = i === total - 1; /* Bizagi = hoy */
            const side = i % 2 === 0 ? "left" : "right"; /* nodo a la izq → tarjeta a la der */
            return (
              <div
                key={`${j.company}-${i}`}
                className={`vj-node vj-node--${side === "left" ? "right" : "left"}`}
                style={{ left: pt.x, top: pt.y }}
              >
                <span className="vj-dot" />
                <div className="vj-card">
                  <img className="vj-card-art" src={NODE_ART[i % NODE_ART.length]} alt="" aria-hidden />
                  <div className="vj-card-year">
                    {isLast ? L(TX.today) : startYear(j.period)}
                  </div>
                  <div className="vj-card-mission">
                    {i === 0
                      ? `${L(TX.mission)} 01 · ${j.period}`
                      : isLast
                      ? `${L(TX.today)} · ${j.period}`
                      : `${L(TX.mission)} ${String(i + 1).padStart(2, "0")} · ${j.period}`}
                  </div>
                  <h2>{j.company}</h2>
                  <div className="vj-card-role">{t(j.role)}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cierre */}
        <section className="vj-final">
          <h2>{L(TX.finalTitle)}</h2>
          <p>{L(TX.finalSub)}</p>
          <Link href="/contacto" className="vj-cta">
            {L(TX.contact)} →
          </Link>
        </section>
      </div>
    </>
  );
}
