"use client";

import { useEffect, useState } from "react";
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
    es: "De la Universidad Manuela Beltrán en 2011 al presente en Bizagi: cada empresa fue un mundo distinto. Este es el viaje.",
    en: "From Universidad Manuela Beltrán in 2011 to the present at Bizagi: every company was a different world. This is the journey.",
  },
  cue: { es: "Desplázate para despegar", en: "Scroll to lift off" },
  mission: { es: "Misión", en: "Mission" },
  launch: { es: "Despegue", en: "Liftoff" },
  currentWorld: { es: "Mundo actual", en: "Current world" },
  finalTitle: { es: "Presente — y lo que sigue", en: "Present — and what's next" },
  finalSub: {
    es: "El cohete sigue en vuelo. Explora los proyectos de este viaje o hablemos del próximo destino.",
    en: "The rocket is still flying. Explore the projects from this journey, or let's talk about the next destination.",
  },
  portfolio: { es: "Ver portafolio", en: "View portfolio" },
  contact: { es: "Iniciar contacto", en: "Make contact" },
  today: { es: "Hoy", en: "Now" },
};

/* Paleta por mundo (se recorre en ciclo) */
const WORLDS = [
  { base: "#818cf8", dark: "#3730a3", glow: "rgba(129,140,248,0.3)", ring: true },
  { base: "#5eead4", dark: "#0f766e", glow: "rgba(94,234,212,0.3)", ring: false },
  { base: "#f472b6", dark: "#9d174d", glow: "rgba(244,114,182,0.3)", ring: true },
  { base: "#fbbf24", dark: "#92400e", glow: "rgba(251,191,36,0.3)", ring: false },
  { base: "#38bdf8", dark: "#075985", glow: "rgba(56,189,248,0.3)", ring: true },
  { base: "#a78bfa", dark: "#5b21b6", glow: "rgba(167,139,250,0.3)", ring: false },
  { base: "#34d399", dark: "#065f46", glow: "rgba(52,211,153,0.3)", ring: true },
  { base: "#fb7185", dark: "#9f1239", glow: "rgba(251,113,133,0.3)", ring: false },
];

const startYear = (period: string) => {
  const m = period.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
};

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");

function Rocket({ flying }: { flying: boolean }) {
  return (
    <div className={`tj-rocket ${flying ? "tj-rocket--flying" : ""}`} id="tj-rocket" aria-hidden>
      <svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg">
        {/* llama */}
        <g className="tj-flame" transform="translate(0 196)">
          <path d="M60 0 C74 22 78 40 60 66 C42 40 46 22 60 0Z" fill="#fbbf24" />
          <path d="M60 4 C69 20 71 34 60 52 C49 34 51 20 60 4Z" fill="#f97316" />
          <path d="M60 8 C65 18 66 28 60 40 C54 28 55 18 60 8Z" fill="#fef3c7" />
        </g>
        {/* aletas */}
        <path d="M38 140 C22 152 16 176 18 196 L38 172 Z" fill="#1e2a5e" />
        <path d="M82 140 C98 152 104 176 102 196 L82 172 Z" fill="#1e2a5e" />
        {/* cuerpo */}
        <path
          d="M60 6 C82 34 92 74 92 118 C92 156 80 184 60 196 C40 184 28 156 28 118 C28 74 38 34 60 6Z"
          fill="#e8edf7"
        />
        <path d="M60 6 C82 34 92 74 92 118 C92 156 80 184 60 196 L60 6Z" fill="#c7d2e8" />
        {/* punta */}
        <path d="M60 6 C70 18 77 34 80 50 L40 50 C43 34 50 18 60 6Z" fill="#5eead4" />
        {/* ventana */}
        <circle cx="60" cy="92" r="18" fill="#0a1024" stroke="#5eead4" strokeWidth="4" />
        <circle cx="54" cy="86" r="5" fill="#38bdf8" opacity="0.8" />
        {/* tobera */}
        <path d="M46 190 L74 190 L70 204 L50 204 Z" fill="#1e2a5e" />
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

  const [flying, setFlying] = useState(false);
  const [active, setActive] = useState("tj-hero");

  /* Del pasado (Manuela Beltrán) al presente (Bizagi) */
  const journey = [...experience].reverse();

  /* Modo espacial en <body>, solo mientras la página vive */
  useEffect(() => {
    document.body.classList.add("tj-mode");
    return () => document.body.classList.remove("tj-mode");
  }, []);

  /* Motor de scroll: cohete + parallax de estrellas */
  useEffect(() => {
    const rocket = document.getElementById("tj-rocket");
    const stars = Array.from(document.querySelectorAll<HTMLElement>(".tj-stars"));
    if (!rocket) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastY = window.scrollY;
    let tilt = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const frame = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const mobile = vw < 900;

      /* despegue durante el primer viewport de scroll */
      const p = Math.min(y / (vh * 0.9), 1);
      const e = ease(p);

      const rise = 120 + e * vh * 0.42;
      const xTo = mobile ? 0.84 : 0.13;
      const x = (0.5 + (xTo - 0.5) * e) * vw - rocket.offsetWidth / 2;

      /* inclinación según velocidad de scroll */
      const v = y - lastY;
      lastY = y;
      tilt += (Math.max(-10, Math.min(10, v * 0.25)) - tilt) * 0.08;

      rocket.style.transform = `translate(${x}px, ${-rise}px) rotate(${tilt}deg)`;
      rocket.style.setProperty("--flame", String(Math.min(y / 140, 1)));

      /* estrellas: capas a distinta velocidad (bajan = subimos) */
      const speeds = [0.12, 0.28, 0.5];
      stars.forEach((s, i) => {
        s.style.backgroundPosition = `0px ${y * speeds[i]}px`;
      });

      setFlying(p >= 1);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Revelado de tarjetas + riel activo */
  useEffect(() => {
    const reveals = document.querySelectorAll(".tj-reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && en.target.classList.add("is-visible")),
      { threshold: 0.2 }
    );
    reveals.forEach((el) => io.observe(el));

    const sections = document.querySelectorAll(".tj-section[id]");
    const io2 = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { threshold: 0.5 }
    );
    sections.forEach((el) => io2.observe(el));
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  return (
    <>
      <PageHeader />
      <div className="tj-scene">
        <div className="tj-nebula" />
        <div className="tj-stars tj-stars--far" />
        <div className="tj-stars tj-stars--mid" />
        <div className="tj-stars tj-stars--near" />
        <Rocket flying={flying} />

        {/* Riel de progreso */}
        <nav className="tj-rail" aria-label="Timeline">
          {journey.map((j, i) => {
            const id = `tj-${slugify(j.company)}-${i}`;
            return (
              <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>
                {startYear(j.period)}
              </a>
            );
          })}
          <a href="#tj-final" className={active === "tj-final" ? "on" : ""}>
            {L(TX.today)}
          </a>
        </nav>

        {/* Despegue */}
        <section className="tj-section tj-hero" id="tj-hero">
          <div>
            <p className="tj-eyebrow">{L(TX.eyebrow)}</p>
            <h1>{L(TX.title)}</h1>
            <p>{L(TX.heroSub)}</p>
            <div className="tj-scroll-cue">↓ {L(TX.cue)}</div>
          </div>
          <div className="tj-ground" aria-hidden>
            <svg
              viewBox="0 0 1200 150"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 90 L180 90 L230 62 L320 62 L360 90 L520 90 L520 150 L0 150 Z M680 90 L840 90 L880 58 L980 58 L1030 90 L1200 90 L1200 150 L680 150 Z"
                fill="#0a1024"
              />
              <rect x="0" y="88" width="1200" height="62" fill="#0a1024" />
              {/* plataforma */}
              <rect x="540" y="76" width="120" height="14" rx="3" fill="#1e2a5e" />
              <rect x="552" y="90" width="10" height="60" fill="#141c40" />
              <rect x="638" y="90" width="10" height="60" fill="#141c40" />
              {/* torre */}
              <rect x="676" y="10" width="8" height="80" fill="#141c40" />
              <circle cx="680" cy="8" r="4" fill="#f472b6">
                <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>

        {/* Un mundo por empleo, de 2011 al presente */}
        {journey.map((j, i) => {
          const id = `tj-${slugify(j.company)}-${i}`;
          const isLast = i === journey.length - 1;
          return (
            <section className="tj-section tj-world" id={id} key={id}>
              <div className="tj-inner tj-reveal">
                <Planet i={i} initials={j.initials} />
                <div className={`tj-card ${isLast ? "tj-card--featured" : ""}`}>
                  <div className="tj-mission">
                    {i === 0
                      ? `${L(TX.launch)} · ${j.period}`
                      : isLast
                      ? `${L(TX.currentWorld)} · ${j.period}`
                      : `${L(TX.mission)} ${String(i + 1).padStart(2, "0")} · ${j.period}`}
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
                </div>
              </div>
            </section>
          );
        })}

        {/* Presente */}
        <section className="tj-section tj-final" id="tj-final">
          <div className="tj-reveal">
            <p className="tj-eyebrow">{L(TX.today)}</p>
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
