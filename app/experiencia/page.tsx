"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { experience } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ReadMore from "@/components/ReadMore";
import "./experiencia.css";

/* Textos locales de la sección (aislados de lib/content) */
const TX = {
  eyebrow: { es: "Bitácora de vuelo", en: "Flight log" },
  title: { es: "Trayectoria", en: "Career Journey" },
  heroSub: {
    es: "Llegamos a la luna: hoy diseño en Bizagi. Desciende por la línea de tiempo, misión a misión, hasta la plataforma de despegue en 2011.",
    en: "We made it to the moon: today I design at Bizagi. Descend the timeline, mission by mission, back to the launch pad in 2011.",
  },
  cue: { es: "Desciende por la línea de tiempo", en: "Scroll down the timeline" },
  mission: { es: "Misión", en: "Mission" },
  launch: { es: "Despegue", en: "Liftoff" },
  currentWorld: { es: "Mundo actual", en: "Current world" },
  origin: {
    es: "Aquí empezó todo: la plataforma de despegue.",
    en: "It all started here: the launch pad.",
  },
  finalTitle: { es: "¿Volvemos a la luna?", en: "Back to the moon?" },
  finalSub: {
    es: "Explora los proyectos de este viaje o hablemos del próximo destino.",
    en: "Explore the projects from this journey, or let's talk about the next destination.",
  },
  portfolio: { es: "Ver portafolio", en: "View portfolio" },
  contact: { es: "Iniciar contacto", en: "Make contact" },
  today: { es: "Hoy", en: "Now" },
};

/* ==================================================================
   MOTOR DE CAPAS POR ESCENA
   Cada escena es un array de capas. Cada capa:
   - src:   ruta de la ilustración (PNG transparente en /public)
   - cls:   "main" (protagonista, abajo-derecha, grande)
            "far" (lejano, arriba-izquierda, tenue)
            "companion" (plano medio flotante)
            "free" (sin preset: posiciónala tú con `style`)
   - speed: velocidad de parallax. Negativo = se mueve contra el
            scroll (se siente cercano). Positivo = a favor (lejano).
            Rango útil: -0.15 a 0.3
   - style: overrides de posición/tamaño/z (top, left, right, bottom,
            width, zIndex, opacity)
   - flip:  espeja horizontalmente (para reusar ilustraciones)

   Para añadir una capa nueva (ej. satélite en la escena de Bizagi):
   { src: `${ART}/satelite.png`, cls: "free", speed: 0.12,
     style: { top: "18%", right: "30%", width: "140px", zIndex: 1 } }
   ================================================================== */
const ART = "/ilustraciones";

type Layer = {
  src: string;
  speed: number;
  cls?: "main" | "far" | "companion" | "free";
  style?: CSSProperties;
  flip?: boolean;
};

const SCENES: Layer[][] = [
  /* 0 · Bizagi — en la luna, Saturno a lo lejos */
  [
    { src: `${ART}/moon.png`, cls: "main", speed: -0.05 },
    { src: `${ART}/saturno.png`, cls: "far", speed: 0.22 },
  ],
  /* 1 · Inter Rapidísimo — Saturno grande, astronauta flotando, Tierra al fondo */
  [
    { src: `${ART}/saturno.png`, cls: "main", speed: -0.05 },
    { src: `${ART}/astronauta.png`, cls: "companion", speed: -0.12 },
    { src: `${ART}/tierra.png`, cls: "far", speed: 0.22 },
  ],
  /* 2 · Entelgy (WebMaster) — la Tierra en primer plano */
  [
    { src: `${ART}/tierra.png`, cls: "main", speed: -0.05 },
    { src: `${ART}/astronauta.png`, cls: "far", speed: 0.22 },
  ],
  /* 3 · Área Andina — astronauta protagonista */
  [
    { src: `${ART}/astronauta.png`, cls: "main", speed: -0.05, flip: true },
    { src: `${ART}/saturno.png`, cls: "far", speed: 0.22 },
  ],
  /* 4 · Entelgy (Liferay) */
  [
    { src: `${ART}/saturno.png`, cls: "main", speed: -0.05, flip: true },
    { src: `${ART}/tierra.png`, cls: "far", speed: 0.22, flip: true },
  ],
  /* 5 · Brain Media */
  [
    { src: `${ART}/tierra.png`, cls: "main", speed: -0.05, flip: true },
    { src: `${ART}/astronauta.png`, cls: "far", speed: 0.22, flip: true },
  ],
  /* 6 · ESAP — se ve venir el despegue */
  [
    { src: `${ART}/astronauta.png`, cls: "main", speed: -0.05 },
    { src: `${ART}/innicion_.png`, cls: "far", speed: 0.22 },
  ],
  /* 7 · Manuela Beltrán — ignición */
  [{ src: `${ART}/innicion_.png`, cls: "main", speed: -0.05 }],
];

const startYear = (period: string) => {
  const m = period.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
};

export default function ExperienciaPage() {
  const { t, locale } = useI18n();
  const L = (o: { es: string; en: string }) => o[locale as "es" | "en"] ?? o.es;

  /* Del presente (Bizagi) al origen (Manuela Beltrán) */
  const journey = experience;
  const total = journey.length;

  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("");

  /* Modo espacial en <body>, solo mientras la página vive */
  useEffect(() => {
    document.body.classList.add("tj-mode");
    return () => document.body.classList.remove("tj-mode");
  }, []);

  /* Motor de scroll: relleno de la línea larga (tween ease-out) +
     parallax de capas en cada escena */
  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(timeline.querySelectorAll<HTMLElement>(".tj-item"));
    const stages = Array.from(document.querySelectorAll<HTMLElement>(".tj-stage"));

    let raf = 0;
    let shown = 0; // valor animado (tween)

    const frame = () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;

      /* progreso objetivo: cuánto del camino pasó el centro del viewport */
      const target = Math.min(Math.max((vh * 0.55 - rect.top) / rect.height, 0), 1);

      /* tween ease-out: se acerca suavemente al objetivo */
      shown += (target - shown) * (prefersReduced ? 1 : 0.09);
      fill.style.height = `${shown * 100}%`;

      /* nodos: se encienden cuando el relleno los alcanza */
      const filledPx = shown * rect.height;
      items.forEach((it) => {
        const y = it.offsetTop + it.offsetHeight * 0.5 - timeline.offsetTop;
        it.classList.toggle("is-on", filledPx >= y);
      });

      /* parallax: cada capa se desplaza según su data-speed y la
         distancia de la escena al centro del viewport */
      if (!prefersReduced) {
        stages.forEach((st) => {
          const r = st.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return; // fuera de vista
          const d = r.top + r.height / 2 - vh / 2;
          st.querySelectorAll<HTMLElement>(".tj-plane").forEach((pl) => {
            const sp = parseFloat(pl.dataset.speed || "0");
            pl.style.transform = `translateY(${d * sp}px)`;
          });
        });
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Revelado de tarjetas + escena activa (bullets de navegación) */
  useEffect(() => {
    const reveals = document.querySelectorAll(".tj-reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && en.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));

    const sections = document.querySelectorAll(".tj-item[id]");
    const io2 = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { threshold: 0.45 }
    );
    sections.forEach((el) => io2.observe(el));

    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <PageHeader />
      <div className="tj-scene">
        {/* Universo de fondo: constelaciones sutiles sobre el canvas */}
        <div className="tj-stars tj-stars--far" />
        <div className="tj-stars tj-stars--near" />

        {/* Bullets de control de navegación (fijos, al lado de la línea) */}
        <nav className="tj-stepper" aria-label="Navegación de misiones">
          {journey.map((j, i) => {
            const id = `tj-stop-${i}`;
            return (
              <button
                key={id}
                className={active === id ? "on" : ""}
                onClick={() => goTo(id)}
                aria-label={`${j.company} (${j.period})`}
              >
                <span className="tj-nav-year">
                  {i === 0 ? L(TX.today) : startYear(j.period)}
                </span>
                <span className="tj-nav-dot" />
              </button>
            );
          })}
        </nav>

        {/* Hero */}
        <section className="tj-section tj-hero" id="tj-hero">
          <div className="tj-hero-copy">
            <p className="tj-eyebrow">{L(TX.eyebrow)}</p>
            <h1>{L(TX.title)}</h1>
            <p>{L(TX.heroSub)}</p>
            <div className="tj-scroll-cue">↓ {L(TX.cue)}</div>
          </div>
          <img
            className="tj-hero-astro"
            src={`${ART}/astronauta.png`}
            alt=""
            aria-hidden
          />
        </section>

        {/* Camino largo: la línea recorre todas las escenas */}
        <div className="tj-timeline" ref={timelineRef}>
          <div className="tj-track" aria-hidden>
            <div className="tj-fill" ref={fillRef} />
          </div>

          {journey.map((j, i) => {
            const id = `tj-stop-${i}`;
            const isFirst = i === 0;
            const isLast = i === total - 1;
            const num = total - i; /* cronológico: MB = 01, Bizagi = 08 */
            const layers = SCENES[i % SCENES.length];
            return (
              <article className="tj-item" id={id} key={id}>
                {/* Escena: n capas con parallax en Z */}
                <div className="tj-stage" aria-hidden>
                  {layers.map((ly, k) => (
                    <div
                      key={k}
                      className={`tj-plane tj-plane--${ly.cls ?? "free"} ${
                        ly.flip ? "tj-flip" : ""
                      }`}
                      data-speed={ly.speed}
                      style={ly.style}
                    >
                      <img src={ly.src} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>

                {/* Marcador sobre la línea (camino) */}
                <div className="tj-stop" aria-hidden>
                  <span className="tj-step-dot" />
                  <span className="tj-step-year">
                    {isFirst ? L(TX.today) : startYear(j.period)}
                  </span>
                </div>

                <div className={`tj-card tj-reveal ${isFirst ? "tj-card--featured" : ""}`}>
                  <div className="tj-mission">
                    {isFirst
                      ? `${L(TX.currentWorld)} · ${j.period}`
                      : isLast
                      ? `${L(TX.launch)} · ${L(TX.mission)} 01 · ${j.period}`
                      : `${L(TX.mission)} ${String(num).padStart(2, "0")} · ${j.period}`}
                  </div>
                  <h2>{j.company}</h2>
                  <div className="tj-role">{t(j.role)}</div>
                  {j.location && <div className="tj-period">{t(j.location)}</div>}
                  {j.summary && (
                    <ReadMore text={t(j.summary)} limit={260} className="tj-industry" />
                  )}
                  <div className="tj-chips">
                    {j.functions.slice(0, 6).map((f, k) => (
                      <span className="tj-chip" key={k}>
                        {t(f)}
                      </span>
                    ))}
                  </div>
                  {isLast && <p className="tj-origin">{L(TX.origin)}</p>}
                </div>
              </article>
            );
          })}
        </div>

        {/* Cierre */}
        <section className="tj-section tj-final" id="tj-final">
          <div className="tj-reveal">
            <h2>{L(TX.finalTitle)}</h2>
            <p>{L(TX.finalSub)}</p>
            <div className="tj-final-ctas">
              <Link href="/trayectoria" className="tj-cta">
                {L(TX.portfolio)} →
              </Link>
              <Link href="/contacto" className="tj-cta tj-cta--ghost">
                {L(TX.contact)} →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
