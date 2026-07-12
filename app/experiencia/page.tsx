"use client";

import { useEffect, useRef, useState } from "react";
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

/* ------------------------------------------------------------------
   Historia visual por nodo (índice 0 = Bizagi ... 7 = Manuela Beltrán)
   main = plano cercano (grande) · far = plano lejano (pequeño, se
   mueve distinto con el scroll para dar profundidad en Z).
   El "far" anticipa la siguiente parada del viaje.
   ------------------------------------------------------------------ */
const ART = "/ilustraciones";
const SCENES = [
  { main: `${ART}/moon.png`, far: `${ART}/saturno.png` }, // Bizagi: en la luna, Saturno a lo lejos
  { main: `${ART}/saturno.png`, far: `${ART}/tierra.png`, companion: `${ART}/astronauta.png` }, // Inter Rapidísimo
  { main: `${ART}/tierra.png`, far: `${ART}/astronauta.png` }, // Entelgy (WebMaster)
  { main: `${ART}/astronauta.png`, far: `${ART}/saturno.png`, flip: true }, // Área Andina
  { main: `${ART}/saturno.png`, far: `${ART}/tierra.png`, flip: true, farFlip: true }, // Entelgy (Liferay)
  { main: `${ART}/tierra.png`, far: `${ART}/astronauta.png`, flip: true, farFlip: true }, // Brain Media
  { main: `${ART}/astronauta.png`, far: `${ART}/innicion_.png` }, // ESAP: se ve venir el despegue
  { main: `${ART}/innicion_.png` }, // Manuela Beltrán: ignición
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

  /* Motor de scroll: relleno de la línea (tween ease-out) +
     parallax de planos Z en cada escena */
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

      /* progreso objetivo: cuánto de la línea pasó el centro del viewport */
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

      /* parallax de planos: cada plano se desplaza según su
         data-speed y la distancia de la escena al centro del viewport */
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

  /* Revelado de tarjetas + nodo activo para el stepper */
  useEffect(() => {
    const reveals = document.querySelectorAll(".tj-reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && en.target.classList.add("is-visible")),
      { threshold: 0.2 }
    );
    reveals.forEach((el) => io.observe(el));

    const sections = document.querySelectorAll(".tj-item[id], .tj-hero[id]");
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

        {/* Stepper de navegación */}
        <nav className="tj-stepper" aria-label="Timeline">
          {journey.map((j, i) => {
            const id = `tj-stop-${i}`;
            return (
              <button
                key={id}
                className={active === id ? "on" : ""}
                onClick={() => goTo(id)}
                aria-label={`${j.company} (${j.period})`}
              >
                <span className="tj-step-year">
                  {i === 0 ? L(TX.today) : startYear(j.period)}
                </span>
                <span className="tj-step-dot" />
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

        {/* Línea de tiempo: del presente al despegue */}
        <div className="tj-timeline" ref={timelineRef}>
          <div className="tj-track" aria-hidden>
            <div className="tj-fill" ref={fillRef} />
          </div>

          {journey.map((j, i) => {
            const id = `tj-stop-${i}`;
            const isFirst = i === 0;
            const isLast = i === total - 1;
            const num = total - i; /* cronológico: MB = 01, Bizagi = 08 */
            const sc = SCENES[i % SCENES.length];
            return (
              <article
                className={`tj-item ${i % 2 === 0 ? "tj-item--right" : "tj-item--left"}`}
                id={id}
                key={id}
              >
                <div className="tj-node">
                  <span className="tj-node-dot" />
                  <span className="tj-node-year">
                    {isFirst ? L(TX.today) : startYear(j.period)}
                  </span>
                </div>

                {/* Escena con planos en Z */}
                <div className="tj-stage tj-reveal" aria-hidden>
                  {sc.far && (
                    <div
                      className={`tj-plane tj-plane--far ${sc.farFlip ? "tj-flip" : ""}`}
                      data-speed="0.22"
                    >
                      <img src={sc.far} alt="" loading="lazy" />
                    </div>
                  )}
                  <div
                    className={`tj-plane tj-plane--main ${sc.flip ? "tj-flip" : ""}`}
                    data-speed="-0.07"
                  >
                    <img src={sc.main} alt="" loading="lazy" />
                  </div>
                  {sc.companion && (
                    <div className="tj-plane tj-plane--companion" data-speed="-0.14">
                      <img src={sc.companion} alt="" loading="lazy" />
                    </div>
                  )}
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
