"use client";

import { useEffect, useRef } from "react";
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

/* Paleta por mundo (índice 0 = Bizagi = luna) */
const WORLDS = [
  { base: "#d7dbe8", dark: "#8f96ad", glow: "rgba(215,219,232,0.3)", ring: false },
  { base: "#818cf8", dark: "#3730a3", glow: "rgba(129,140,248,0.3)", ring: true },
  { base: "#5eead4", dark: "#0f766e", glow: "rgba(94,234,212,0.3)", ring: false },
  { base: "#f472b6", dark: "#9d174d", glow: "rgba(244,114,182,0.3)", ring: true },
  { base: "#fbbf24", dark: "#92400e", glow: "rgba(251,191,36,0.3)", ring: false },
  { base: "#38bdf8", dark: "#075985", glow: "rgba(56,189,248,0.3)", ring: true },
  { base: "#a78bfa", dark: "#5b21b6", glow: "rgba(167,139,250,0.3)", ring: false },
  { base: "#34d399", dark: "#065f46", glow: "rgba(52,211,153,0.3)", ring: true },
];

const startYear = (period: string) => {
  const m = period.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
};

/* Astronauta plantando bandera en la luna (hero / Bizagi) */
function MoonAstronaut() {
  return (
    <div className="tj-moon-scene" aria-hidden>
      <svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg">
        {/* Tierra a lo lejos */}
        <circle cx="352" cy="52" r="22" fill="#38bdf8" />
        <path d="M338 46 q8 -6 16 -2 q10 4 12 12 q-14 6 -28 -2 z" fill="#34d399" opacity="0.85" />
        <circle cx="352" cy="52" r="22" fill="none" stroke="#bae6fd" strokeOpacity="0.4" strokeWidth="2" />
        {/* superficie lunar */}
        <path d="M0 300 Q60 208 210 204 Q360 208 420 300 Z" fill="#d7dbe8" />
        <path d="M0 300 Q60 208 210 204 Q360 208 420 300 Z" fill="url(#tjmoonshade)" />
        <defs>
          <linearGradient id="tjmoonshade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6c7391" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="262" rx="26" ry="9" fill="#9aa2bd" opacity="0.6" />
        <ellipse cx="296" cy="252" rx="18" ry="6" fill="#9aa2bd" opacity="0.5" />
        <ellipse cx="210" cy="286" rx="34" ry="10" fill="#9aa2bd" opacity="0.45" />
        {/* bandera */}
        <rect x="256" y="164" width="4" height="76" rx="2" fill="#e8edf7" />
        <path d="M260 166 L316 172 L260 190 Z" fill="#fbbf24" />
        {/* astronauta */}
        <g transform="translate(176 158)">
          {/* mochila */}
          <rect x="-14" y="14" width="18" height="30" rx="6" fill="#c7d2e8" />
          {/* piernas */}
          <path d="M10 62 L4 88 L16 88 L20 66 Z" fill="#e8edf7" />
          <path d="M26 62 L30 88 L42 88 L34 64 Z" fill="#e8edf7" />
          <ellipse cx="10" cy="90" rx="9" ry="5" fill="#c7d2e8" />
          <ellipse cx="37" cy="90" rx="9" ry="5" fill="#c7d2e8" />
          {/* torso */}
          <rect x="2" y="26" width="34" height="42" rx="12" fill="#f4f7ff" />
          <rect x="10" y="34" width="18" height="12" rx="4" fill="#5eead4" opacity="0.9" />
          {/* brazo saludo */}
          <path d="M34 32 Q52 22 58 4" stroke="#f4f7ff" strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="59" cy="2" r="7" fill="#c7d2e8" />
          {/* brazo bandera */}
          <path d="M4 34 Q-10 44 -6 58" stroke="#f4f7ff" strokeWidth="11" strokeLinecap="round" fill="none" />
          {/* casco */}
          <circle cx="19" cy="12" r="16" fill="#f4f7ff" />
          <circle cx="22" cy="12" r="11" fill="#0a1024" />
          <circle cx="26" cy="9" r="3.5" fill="#38bdf8" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

/* Cohete en la plataforma de despegue (Manuela Beltrán) */
function LaunchPad() {
  return (
    <div className="tj-pad-scene" aria-hidden>
      <svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
        {/* suelo */}
        <path d="M0 320 L0 268 L110 268 L140 246 L280 246 L310 268 L420 268 L420 320 Z" fill="#0a1024" />
        {/* torres */}
        <g stroke="#2a3568" strokeWidth="5" fill="none">
          <path d="M120 246 L120 96 M120 96 L146 246 M120 130 L142 130 M120 176 L144 176 M120 216 L145 216" />
          <path d="M300 246 L300 96 M300 96 L274 246 M300 130 L278 130 M300 176 L276 176 M300 216 L275 216" />
        </g>
        <circle cx="120" cy="90" r="5" fill="#f472b6">
          <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="90" r="5" fill="#fbbf24">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite" />
        </circle>
        {/* plataforma */}
        <rect x="150" y="240" width="120" height="12" rx="3" fill="#1e2a5e" />
        {/* cohete */}
        <g transform="translate(150 44) scale(0.86)">
          <path d="M38 140 C22 152 16 176 18 196 L38 172 Z" fill="#1e2a5e" />
          <path d="M82 140 C98 152 104 176 102 196 L82 172 Z" fill="#1e2a5e" />
          <path
            d="M60 6 C82 34 92 74 92 118 C92 156 80 184 60 196 C40 184 28 156 28 118 C28 74 38 34 60 6Z"
            fill="#e8edf7"
          />
          <path d="M60 6 C82 34 92 74 92 118 C92 156 80 184 60 196 L60 6Z" fill="#c7d2e8" />
          <path d="M60 6 C70 18 77 34 80 50 L40 50 C43 34 50 18 60 6Z" fill="#5eead4" />
          <circle cx="60" cy="92" r="18" fill="#0a1024" stroke="#5eead4" strokeWidth="4" />
          <circle cx="54" cy="86" r="5" fill="#38bdf8" opacity="0.8" />
          <path d="M46 190 L74 190 L70 204 L50 204 Z" fill="#1e2a5e" />
        </g>
        {/* vapor */}
        <ellipse cx="160" cy="252" rx="26" ry="10" fill="#aab4d4" opacity="0.25" />
        <ellipse cx="262" cy="254" rx="30" ry="11" fill="#aab4d4" opacity="0.2" />
      </svg>
    </div>
  );
}

function Planet({ i, initials }: { i: number; initials: string }) {
  const w = WORLDS[i % WORLDS.length];
  const id = `tjp${i}`;
  return (
    <div className="tj-planet" style={{ ["--glow" as string]: w.glow }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={id} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor={w.base} />
            <stop offset="100%" stopColor={w.dark} />
          </radialGradient>
        </defs>
        {w.ring && (
          <ellipse
            cx="100" cy="104" rx="96" ry="26"
            fill="none" stroke={w.base} strokeOpacity="0.45" strokeWidth="5"
            transform="rotate(-16 100 104)"
          />
        )}
        <circle cx="100" cy="100" r="62" fill={`url(#${id})`} />
        <circle cx="78" cy="78" r="10" fill="#000" opacity="0.14" />
        <circle cx="122" cy="124" r="14" fill="#000" opacity="0.12" />
        <circle cx="116" cy="66" r="6" fill="#fff" opacity="0.14" />
        <text
          x="100" y="112" textAnchor="middle"
          fontSize="34" fontWeight="700" fill="#fff" opacity="0.9"
          fontFamily="Poppins, sans-serif" letterSpacing="2"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}

export default function ExperienciaPage() {
  const { t, locale } = useI18n();
  const L = (o: { es: string; en: string }) => o[locale as "es" | "en"] ?? o.es;

  /* Del presente (Bizagi) al origen (Manuela Beltrán) */
  const journey = experience;
  const total = journey.length;

  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  /* Modo espacial en <body>, solo mientras la página vive */
  useEffect(() => {
    document.body.classList.add("tj-mode");
    return () => document.body.classList.remove("tj-mode");
  }, []);

  /* Motor de scroll: relleno de la línea (tween ease-out) + parallax + nodos */
  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stars = Array.from(document.querySelectorAll<HTMLElement>(".tj-stars"));
    const items = Array.from(timeline.querySelectorAll<HTMLElement>(".tj-item"));

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

      /* estrellas parallax */
      if (!prefersReduced) {
        const sy = window.scrollY;
        const speeds = [0.12, 0.28, 0.5];
        stars.forEach((s, i) => {
          s.style.backgroundPosition = `0px ${sy * speeds[i]}px`;
        });
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Revelado de tarjetas */
  useEffect(() => {
    const reveals = document.querySelectorAll(".tj-reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && en.target.classList.add("is-visible")),
      { threshold: 0.2 }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <PageHeader />
      <div className="tj-scene">
        <div className="tj-nebula" />
        <div className="tj-stars tj-stars--far" />
        <div className="tj-stars tj-stars--mid" />
        <div className="tj-stars tj-stars--near" />

        {/* Hero: astronauta en la luna (presente) */}
        <section className="tj-section tj-hero" id="tj-hero">
          <div className="tj-hero-copy">
            <p className="tj-eyebrow">{L(TX.eyebrow)}</p>
            <h1>{L(TX.title)}</h1>
            <p>{L(TX.heroSub)}</p>
            <div className="tj-scroll-cue">↓ {L(TX.cue)}</div>
          </div>
          <MoonAstronaut />
        </section>

        {/* Línea de tiempo: del presente al despegue */}
        <div className="tj-timeline" ref={timelineRef}>
          <div className="tj-track" aria-hidden>
            <div className="tj-fill" ref={fillRef} />
          </div>

          {journey.map((j, i) => {
            const isFirst = i === 0;
            const isLast = i === total - 1;
            const num = total - i; /* cronológico: MB = 01, Bizagi = 08 */
            return (
              <article
                className={`tj-item ${i % 2 === 0 ? "tj-item--right" : "tj-item--left"}`}
                key={`${j.company}-${i}`}
              >
                <div className="tj-node">
                  <span className="tj-node-dot" />
                  <span className="tj-node-year">
                    {isFirst ? L(TX.today) : startYear(j.period)}
                  </span>
                </div>

                <div className="tj-visual tj-reveal">
                  {isLast ? <LaunchPad /> : <Planet i={i} initials={j.initials} />}
                </div>

                <div
                  className={`tj-card tj-reveal ${isFirst ? "tj-card--featured" : ""}`}
                >
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
