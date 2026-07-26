"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { experience } from "@/lib/content";
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
  lblMission: { es: "Misión", en: "Mission" },
  lblCurrentMission: { es: "Misión actual", en: "Current mission" },
  lblContext: { es: "Contexto", en: "Context" },
  lblRole: { es: "Mi rol", en: "My role" },
  explore: { es: "Explorar proyectos", en: "Explore projects" },
  seeLess: { es: "Ver menos", en: "See less" },
  seeMore: { es: "Ver más", en: "See more" },
};

/* ------------------------------------------------------------------
   Contenido de las tarjetas (misión / contexto / mi rol)
   Índice = posición en journey (0 = Bizagi ... 7 = Manuela Beltrán)
   ------------------------------------------------------------------ */
type CardInfo = {
  mission: { es: string; en: string };
  context: { es: string; en: string };
  role: { es: string; en: string };
  href: string;
};

const CARD_BIZAGI: CardInfo = {
  mission: {
    es: "Diseño de experiencias empresariales impulsadas por IA.",
    en: "Designing AI-powered enterprise experiences.",
  },
  context: {
    es: "Bizagi desarrolla plataformas Enterprise para automatización de procesos y transformación digital utilizadas por organizaciones de todo el mundo. Actualmente la compañía lidera la incorporación de Inteligencia Artificial en su ecosistema de productos.",
    en: "Bizagi builds Enterprise platforms for process automation and digital transformation used by organizations worldwide. The company is currently leading the adoption of Artificial Intelligence across its product ecosystem.",
  },
  role: {
    es: "Como Senior UX Designer formo parte del equipo global de producto, liderando el diseño de experiencias para capacidades de Inteligencia Artificial, plataformas Enterprise y sistemas de diseño, colaborando con Product Managers, ingeniería e investigación para construir soluciones escalables.",
    en: "As a Senior UX Designer I'm part of the global product team, leading experience design for AI capabilities, Enterprise platforms and design systems, collaborating with Product Managers, engineering and research to build scalable solutions.",
  },
  href: "/trayectoria/bizagi",
};

const CARD_INTER: CardInfo = {
  mission: {
    es: "Evolucionando hacia el diseño de producto.",
    en: "Evolving into Product Design.",
  },
  context: {
    es: "Inter Rapidísimo es una de las compañías líderes en logística y transporte en Colombia, con millones de usuarios y procesos operativos distribuidos a nivel nacional.",
    en: "Inter Rapidísimo is one of Colombia's leading logistics and shipping companies, with millions of users and operational processes distributed nationwide.",
  },
  role: {
    es: "Como Diseñador UX/UI en el área de producto participé en el diseño y evolución de plataformas digitales para clientes y colaboradores, colaborando con equipos de producto y desarrollo para mejorar procesos críticos del negocio.",
    en: "As a UX/UI Designer on the product team I helped design and evolve digital platforms for customers and employees, working with product and development teams to improve business-critical processes.",
  },
  href: "/trayectoria",
};

const CARD_ENTELGY: CardInfo = {
  mission: {
    es: "Uniendo diseño, tecnología y negocio.",
    en: "Bridging design, technology and business.",
  },
  context: {
    es: "A través de Entelgy trabajé para Banco Itaú, una de las principales entidades financieras de Latinoamérica, participando en iniciativas digitales orientadas al área comercial.",
    en: "Through Entelgy I worked for Banco Itaú, one of Latin America's leading financial institutions, contributing to digital initiatives focused on the commercial area.",
  },
  role: {
    es: "Desempeñé funciones como Webmaster, Front-end y Diseñador UI, colaborando en la construcción y mantenimiento de experiencias digitales para campañas, productos y servicios financieros.",
    en: "I worked as Webmaster, Front-end and UI Designer, helping build and maintain digital experiences for campaigns, products and financial services.",
  },
  href: "/trayectoria",
};

const CARD_ANDINA: CardInfo = {
  mission: {
    es: "Escalando contenidos digitales y ecosistemas de aprendizaje.",
    en: "Scaling digital content and learning ecosystems.",
  },
  context: {
    es: "La Fundación Universitaria del Área Andina impulsaba la transformación de sus programas virtuales mediante plataformas educativas y contenidos digitales para miles de estudiantes.",
    en: "Fundación Universitaria del Área Andina was transforming its virtual programs through educational platforms and digital content for thousands of students.",
  },
  role: {
    es: "Como Coordinador de Gestión de Contenidos lideré la organización, producción y calidad de los recursos digitales del área virtual, garantizando consistencia, accesibilidad y una experiencia de aprendizaje eficiente.",
    en: "As Content Management Coordinator I led the organization, production and quality of the virtual area's digital resources, ensuring consistency, accessibility and an efficient learning experience.",
  },
  href: "/trayectoria",
};

const CARD_BRAIN: CardInfo = {
  mission: {
    es: "Conectando la creatividad con los productos digitales.",
    en: "Connecting creativity with digital products.",
  },
  context: {
    es: "Brain Media era una agencia especializada en desarrollo de productos digitales, experiencias web y soluciones para diferentes marcas y sectores.",
    en: "Brain Media was an agency specialized in digital product development, web experiences and solutions for different brands and industries.",
  },
  role: {
    es: "Como Director de Producción Web coordiné el desarrollo de proyectos digitales, integrando diseño, desarrollo y objetivos comerciales para entregar productos alineados con las necesidades de cada cliente.",
    en: "As Web Production Director I coordinated the development of digital projects, integrating design, development and business goals to deliver products aligned with each client's needs.",
  },
  href: "/trayectoria",
};

const CARD_ESAP: CardInfo = {
  mission: {
    es: "Diseñando experiencias de aprendizaje significativas.",
    en: "Designing meaningful learning experiences.",
  },
  context: {
    es: "La Escuela Superior de Administración Pública (ESAP) forma servidores públicos en Colombia mediante programas presenciales y virtuales orientados al fortalecimiento institucional.",
    en: "The Escuela Superior de Administración Pública (ESAP) trains public servants in Colombia through on-site and virtual programs aimed at institutional strengthening.",
  },
  role: {
    es: "Como Diseñador Gráfico E-learning participé en la creación de contenidos interactivos para programas virtuales, transformando información técnica en experiencias de aprendizaje claras y accesibles.",
    en: "As an E-learning Graphic Designer I helped create interactive content for virtual programs, turning technical information into clear, accessible learning experiences.",
  },
  href: "/trayectoria",
};

const CARD_UMB: CardInfo = {
  mission: {
    es: "Construyendo las bases del diseño digital.",
    en: "Building the foundations of digital design.",
  },
  context: {
    es: "La Universidad Manuela Beltrán es una institución de educación superior reconocida por su enfoque en innovación y educación virtual. Durante esta etapa participé en el fortalecimiento de contenidos digitales dirigidos a estudiantes y docentes.",
    en: "Universidad Manuela Beltrán is a higher-education institution known for its focus on innovation and virtual education. During this stage I helped strengthen digital content aimed at students and teachers.",
  },
  role: {
    es: "Como Diseñador Gráfico en el área virtual desarrollé piezas digitales, recursos educativos y materiales visuales para plataformas de aprendizaje, asegurando una comunicación clara y consistente en los diferentes entornos académicos.",
    en: "As a Graphic Designer in the virtual area I created digital pieces, educational resources and visual materials for learning platforms, ensuring clear, consistent communication across academic environments.",
  },
  href: "/trayectoria",
};

/* índice alineado con journey (experience[]): 0=Bizagi ... 7=UMB */
const CARDS: CardInfo[] = [
  CARD_BIZAGI,
  CARD_INTER,
  CARD_ENTELGY /* Entelgy · WebMaster Itaú */,
  CARD_ANDINA,
  CARD_ENTELGY /* Entelgy · Liferay (Itaú/CorpBanca) */,
  CARD_BRAIN,
  CARD_ESAP,
  CARD_UMB,
];

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
   { src: `${ART}/satelite.webp`, cls: "free", speed: 0.12,
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
  /* 0 · Bizagi — en la luna: superficie al frente, estrellas en
     plano medio y Saturno al fondo */
  [
    {
      src: `${ART}/moon.webp`,
      cls: "free",
      speed: -0.08,
      /* full-bleed: los bordes del lienzo quedan fuera de la escena */
      style: { bottom: "-14%", left: "-2%", width: "104%", zIndex: 3 },
    },
    {
      src: `${ART}/estrellas.webp`,
      cls: "free",
      speed: 0.14,
      style: { top: "0", left: "0", width: "100%", zIndex: 1, opacity: 0.75 },
    },
    {
      src: `${ART}/saturno.webp`,
      cls: "free",
      speed: 0.34,
      style: { top: "5%", left: "6%", width: "clamp(130px, 16vw, 230px)", zIndex: 0, opacity: 0.65 },
    },
  ],
  /* 1 · Inter Rapidísimo — frente: Saturno + astronauta flotando;
     plano medio: estrellas; fondo: ovni */
  [
    {
      src: `${ART}/saturno.webp`,
      cls: "free",
      speed: -0.08,
      style: { bottom: "-8%", right: "-3%", width: "min(700px, 54vw)", zIndex: 3 },
    },
    {
      src: `${ART}/astronauta2.webp`,
      cls: "free",
      speed: -0.11 /* casi la misma que Saturno para que viajen juntos */,
      style: { top: "28%", right: "16%", width: "clamp(240px, 27vw, 390px)", zIndex: 4 },
    },
    {
      src: `${ART}/estrellas.webp`,
      cls: "free",
      speed: 0.14,
      style: { top: "0", left: "0", width: "100%", zIndex: 1, opacity: 0.75 },
    },
    {
      src: `${ART}/ovni.webp`,
      cls: "free",
      speed: 0.34,
      style: { top: "4%", left: "7%", width: "clamp(120px, 15vw, 210px)", zIndex: 0, opacity: 0.6 },
    },
  ],
  /* 2 · Entelgy (WebMaster) — como la escena de Saturno:
     frente: Marte + ovni sobrevolándolo; plano medio: estrellas;
     fondo: satélite */
  [
    {
      src: `${ART}/martes.webp`,
      cls: "free",
      speed: -0.08,
      style: { bottom: "-8%", right: "-3%", width: "min(700px, 54vw)", zIndex: 3 },
    },
    {
      src: `${ART}/ovni.webp`,
      cls: "free",
      speed: -0.11 /* casi la misma que Marte para que viajen juntos */,
      style: { top: "24%", right: "16%", width: "clamp(240px, 27vw, 390px)", zIndex: 4 },
    },
    {
      src: `${ART}/estrellas.webp`,
      cls: "free",
      speed: 0.14,
      style: { top: "0", left: "0", width: "100%", zIndex: 1, opacity: 0.75 },
    },
    {
      src: `${ART}/satelite.webp`,
      cls: "free",
      speed: 0.34,
      style: { top: "4%", left: "7%", width: "clamp(120px, 15vw, 210px)", zIndex: 0, opacity: 0.6 },
    },
  ],
  /* 3 · Área Andina — frente: estación lunar; medio: estrellas;
     fondo: satélite pequeño */
  [
    {
      src: `${ART}/estacion.webp`,
      cls: "free",
      speed: -0.08,
      style: { bottom: "-6%", right: "-2%", width: "min(760px, 58vw)", zIndex: 3 },
    },
    {
      src: `${ART}/estrellas.webp`,
      cls: "free",
      speed: 0.14,
      style: { top: "0", left: "0", width: "100%", zIndex: 1, opacity: 0.75 },
    },
    {
      src: `${ART}/satelite.webp`,
      cls: "free",
      speed: 0.34,
      style: { top: "5%", left: "7%", width: "clamp(110px, 14vw, 190px)", zIndex: 0, opacity: 0.6 },
    },
  ],
  /* 4 · Entelgy (Liferay) — frente: satélite destacado;
     fondo: astronauta pequeño y estrellas */
  [
    {
      src: `${ART}/satelite.webp`,
      cls: "free",
      speed: -0.08,
      style: { bottom: "-6%", right: "-2%", width: "min(720px, 55vw)", zIndex: 3 },
    },
    {
      src: `${ART}/astronauta.webp`,
      cls: "free",
      speed: 0.34,
      style: { top: "6%", left: "8%", width: "clamp(120px, 15vw, 210px)", zIndex: 0, opacity: 0.6 },
    },
    {
      src: `${ART}/estrellas.webp`,
      cls: "free",
      speed: 0.14,
      style: { top: "0", left: "0", width: "100%", zIndex: 1, opacity: 0.75 },
    },
  ],
  /* 5 · Brain Media — frente: astronauta; tierra pequeña; fondo: estrellas */
  [
    {
      src: `${ART}/astronauta.webp`,
      cls: "free",
      speed: -0.08,
      style: { bottom: "-4%", right: "-2%", width: "min(620px, 48vw)", zIndex: 3 },
    },
    {
      src: `${ART}/tierra.webp`,
      cls: "free",
      speed: 0.34,
      style: { top: "6%", left: "8%", width: "clamp(130px, 16vw, 230px)", zIndex: 0, opacity: 0.65 },
    },
    {
      src: `${ART}/estrellas.webp`,
      cls: "free",
      speed: 0.14,
      style: { top: "0", left: "0", width: "100%", zIndex: 1, opacity: 0.75 },
    },
  ],
  /* 6 · ESAP — frente: la Tierra line-art; fondo: galaxia y estrellas */
  [
    {
      src: `${ART}/tierra-line.webp`,
      cls: "free",
      speed: -0.08,
      style: { bottom: "-10%", right: "-3%", width: "min(780px, 58vw)", zIndex: 3 },
    },
    {
      src: `${ART}/galaxia.webp`,
      cls: "free",
      speed: 0.34,
      style: { top: "5%", left: "7%", width: "clamp(140px, 17vw, 250px)", zIndex: 0, opacity: 0.55 },
    },
    {
      src: `${ART}/estrellas.webp`,
      cls: "free",
      speed: 0.14,
      style: { top: "0", left: "0", width: "100%", zIndex: 1, opacity: 0.75 },
    },
  ],
  /* 7 · Manuela Beltrán — ignición */
  [{ src: `${ART}/innicion_.webp`, cls: "main", speed: -0.08 }],
];

const startYear = (period: string) => {
  const m = period.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
};

/* Colapso animado con altura medida por JS (ease-out fluido) */
function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
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
    el.getBoundingClientRect(); /* fuerza reflow para fijar el punto de inicio */

    const to = open ? el.scrollHeight : 0;
    requestAnimationFrame(() => {
      el.style.height = `${to}px`;
    });

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== "height") return; /* ignora el fade */
      if (open) el.style.height = "auto"; /* deja fluir el contenido */
      el.removeEventListener("transitionend", onEnd);
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [open]);

  return (
    <div ref={ref} className={`tj-collapse ${open ? "is-open" : ""}`} aria-hidden={!open}>
      {children}
    </div>
  );
}

/* Logo de empresa con fallback a iniciales (cuando existan los
   archivos en /public/logos aparecerán automáticamente) */
function CompanyLogo({ logo, initials }: { logo?: string; initials: string }) {
  const [failed, setFailed] = useState(false);
  if (!logo || failed) {
    return <span className="tj-logo tj-logo--initials">{initials}</span>;
  }
  return (
    <span className="tj-logo">
      <img src={logo} alt="" onError={() => setFailed(true)} />
    </span>
  );
}

/* Tarjeta de experiencia: nace desplegada; "Ver menos" colapsa
   Contexto y Mi rol dejando solo la misión */
function ExpCard({
  j,
  card,
  isFirst,
  isLast,
  num,
}: {
  j: (typeof experience)[number];
  card: CardInfo;
  isFirst: boolean;
  isLast: boolean;
  num: number;
}) {
  const { t, locale } = useI18n();
  const L = (o: { es: string; en: string }) => o[locale as "es" | "en"] ?? o.es;
  /* nace abierta solo la actual (Bizagi); las demás contraídas */
  const [open, setOpen] = useState(isFirst);

  return (
    <div className={`tj-card tj-reveal ${isFirst ? "tj-card--featured" : ""}`}>
      <div className="tj-card-top">
        <CompanyLogo logo={j.logo} initials={j.initials} />
        <div className="tj-card-topright">
          <div className="tj-mission">
            {isFirst
              ? `${L(TX.currentWorld)} · ${j.period}`
              : isLast
              ? `${L(TX.launch)} · ${L(TX.mission)} 01 · ${j.period}`
              : `${L(TX.mission)} ${String(num).padStart(2, "0")} · ${j.period}`}
          </div>
          <div className="tj-role">{t(j.role)}</div>
        </div>
      </div>

      <h2>{j.company}</h2>

      <div className="tj-block-label">
        {isFirst ? L(TX.lblCurrentMission) : L(TX.lblMission)}
      </div>
      <p className="tj-mission-text">{L(card.mission)}</p>

      <Collapse open={open}>
        <div className="tj-block-label">{L(TX.lblContext)}</div>
        <p className="tj-industry">{L(card.context)}</p>

        <div className="tj-block-label">{L(TX.lblRole)}</div>
        <p className="tj-industry">{L(card.role)}</p>
      </Collapse>

      <div className="tj-card-foot">
        <button
          className="tj-see"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? L(TX.seeLess) : L(TX.seeMore)}
        </button>
        <Link href={card.href} className="tj-cta tj-cta--card">
          {L(TX.explore)} →
        </Link>
      </div>
      {isLast && <p className="tj-origin">{L(TX.origin)}</p>}
    </div>
  );
}

export default function ExperienciaPage() {
  const { t, locale } = useI18n();
  const { theme } = useTheme();
  const L = (o: { es: string; en: string }) => o[locale as "es" | "en"] ?? o.es;

  /* Del presente (Bizagi) al origen (Manuela Beltrán) */
  const journey = experience;
  const total = journey.length;

  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("tj-hero");

  /* El modo oscuro de esta sección se controla desde el tema GLOBAL
     (Ajustes). Cuando el tema global es "dark", se aplica el diseño
     espacial oscuro de la línea de tiempo. */
  useEffect(() => {
    document.body.classList.toggle("tj-dark", theme === "dark");
  }, [theme]);

  /* Modo espacial en <body>, solo mientras la página vive */
  useEffect(() => {
    document.body.classList.add("tj-mode");
    return () => {
      document.body.classList.remove("tj-mode");
      document.body.classList.remove("tj-dark");
    };
  }, []);

  /* Motor de scroll: relleno de la línea larga (tween ease-out) +
     parallax de capas en cada escena */
  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(timeline.querySelectorAll<HTMLElement>(".tj-item"));
    const stops = Array.from(timeline.querySelectorAll<HTMLElement>(".tj-stop"));
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
      items.forEach((it, idx) => {
        const y = it.offsetTop + it.offsetHeight * 0.5;
        const on = filledPx >= y;
        it.classList.toggle("is-on", on);
        const st = stops[idx];
        if (st) {
          st.style.top = `${y}px`;
          st.classList.toggle("is-on", on);
        }
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

    const sections = document.querySelectorAll(".tj-item[id], #tj-hero");
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
      <div className="tj-scene">
        {/* Universo de fondo: constelaciones sutiles sobre el canvas */}
        <div className="tj-stars tj-stars--far" />
        <div className="tj-stars tj-stars--near" />

        {/* Bullets de control de navegación (fijos, al lado de la línea) */}
        <nav className="tj-stepper" aria-label="Navegación de misiones">
          <button
            className={active === "tj-hero" ? "on" : ""}
            onClick={() => goTo("tj-hero")}
            aria-label={L(TX.title)}
          >
            <span className="tj-nav-tip">{L(TX.title)}</span>
            <span className="tj-nav-dot" />
          </button>
          {journey.map((j, i) => {
            const id = `tj-stop-${i}`;
            return (
              <button
                key={id}
                className={active === id ? "on" : ""}
                onClick={() => goTo(id)}
                aria-label={`${j.company} (${j.period})`}
              >
                <span className="tj-nav-tip">{j.company}</span>
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
            <button className="tj-scroll-cue" onClick={() => goTo("tj-stop-0")}>
              ↓ {L(TX.cue)}
            </button>
          </div>
          <img
            className="tj-hero-astro"
            src={`${ART}/astronauta.webp`}
            alt=""
            aria-hidden
          />
        </section>

        {/* Camino largo: la línea recorre todas las escenas */}
        <div className="tj-timeline" ref={timelineRef}>
          <div className="tj-track" aria-hidden>
            <div className="tj-fill" ref={fillRef} />
          </div>

          {/* marcadores del camino: posicionados por JS sobre la línea */}
          {journey.map((j, i) => (
            <div className="tj-stop" key={`stop-${i}`} aria-hidden>
              <span className="tj-step-dot" />
              <span className="tj-step-year">
                {i === 0 ? L(TX.today) : startYear(j.period)}
              </span>
            </div>
          ))}

          {journey.map((j, i) => {
            const id = `tj-stop-${i}`;
            const isFirst = i === 0;
            const isLast = i === total - 1;
            const num = total - i; /* cronológico: MB = 01, Bizagi = 08 */
            const layers = SCENES[i % SCENES.length];
            const card = CARDS[i % CARDS.length];
            return (
              <Fragment key={id}>
              <article className="tj-item" id={id}>
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
                      <img src={ly.src} alt="" loading={i === 0 ? "eager" : "lazy"} />
                    </div>
                  ))}
                </div>

                <ExpCard
                  j={j}
                  card={card}
                  isFirst={isFirst}
                  isLast={isLast}
                  num={num}
                />
              </article>
              {!isLast && (
                <div className="tj-gap" aria-hidden>
                  <div className="tj-stage">
                    <div
                      className={`tj-plane tj-plane--free ${i % 2 ? "tj-flip" : ""}`}
                      data-speed="0.16"
                      style={{ top: "8%", left: "0", width: "100%", opacity: 0.5 }}
                    >
                      <img src={`${ART}/estrellas.webp`} alt="" loading="lazy" />
                    </div>
                  </div>
                </div>
              )}
              </Fragment>
            );
          })}
        </div>

        {/* Cierre */}
        <section className="tj-section tj-final" id="tj-final">
          <div className="tj-reveal">
            <button
              className="tj-cta tj-cta--big"
              onClick={() => goTo("tj-hero")}
              aria-label={L(TX.title)}
              title={L(TX.title)}
            >
              ↑
            </button>
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
