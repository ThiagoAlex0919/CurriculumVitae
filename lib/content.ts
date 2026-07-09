import type { Localized } from "./i18n";

// ============================================================
//  CONTENIDO DEL SITIO — edita este archivo para actualizar todo.
//  Cada texto tiene versión { es: "...", en: "..." }.
//  Los textos son PLACEHOLDERS: reemplázalos por los tuyos.
// ============================================================

export type Metric = {
  label: string; // p.ej. "CES", "ASP", "NPS", "Adopción"
  value: string; // p.ej. "4.6 / 5", "+32%"
  note: Localized;
};

export type Project = {
  slug: string;
  name: Localized;
  client: Localized; // producto o cliente para el que se hizo
  role: Localized;
  year: string;
  tags: string[];
  challenge: Localized;
  process: Localized;
  before: Localized;
  after: Localized;
  solution: Localized;
  metrics: Metric[];
};

export type Company = {
  slug: string;
  name: string;
  initials: string;
  role: Localized;
  area: Localized;
  period: string;
  industry: Localized;
  clients: string[];
  story: Localized;
  profile: Localized; // tu perfil dentro de la empresa
  challenges: Localized; // desafíos del día a día
  projects: Project[];
};

export type LabEntry = {
  slug: string;
  title: Localized;
  summary: Localized;
  detail: Localized;
  tags: string[];
};

// ---------------- PERFIL / HOJA DE VIDA ----------------

export const profile = {
  name: "Alexander Romero",
  role: {
    es: "Diseñador UX/UI Senior",
    en: "Senior UX/UI Designer",
  } as Localized,
  tagline: {
    es: "Diseño de producto centrado en las personas, potenciado con IA.",
    en: "People-centered product design, powered by AI.",
  } as Localized,
  location: "Bogotá, Colombia",
  email: "alex.romer.av@gmail.com",
  summary: {
    es: "Soy diseñador UX/UI con foco en producto digital. Combino investigación, diseño de interacción y sistemas de diseño con un uso avanzado de IA para acelerar el descubrimiento, la validación y la entrega. Este es un texto de ejemplo: reemplázalo por tu resumen profesional.",
    en: "I'm a UX/UI designer focused on digital product. I combine research, interaction design and design systems with advanced use of AI to speed up discovery, validation and delivery. This is placeholder text: replace it with your professional summary.",
  } as Localized,
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/tu-usuario" },
    { label: "Behance", url: "https://www.behance.net/tu-usuario" },
    { label: "Figma", url: "https://www.figma.com/@tu-usuario" },
  ],
};

// ---------------- SKILLS ----------------

export const skills: { category: Localized; items: string[] }[] = [
  {
    category: { es: "Diseño", en: "Design" },
    items: ["UX Research", "UI Design", "Design Systems", "Prototipado", "Accesibilidad"],
  },
  {
    category: { es: "Herramientas", en: "Tools" },
    items: ["Figma", "FigJam", "Figma Variables", "Auto Layout", "Design Tokens"],
  },
  {
    category: { es: "IA & Automatización", en: "AI & Automation" },
    items: ["Prompting", "MCPs", "Figma + IA", "Markdown / Docs", "Flujos con agentes"],
  },
  {
    category: { es: "Método", en: "Method" },
    items: ["Design Thinking", "Lean UX", "Métricas (CES, ASP, NPS)", "Testing", "Handoff"],
  },
];

// ---------------- TRAYECTORIA / EMPRESAS ----------------

export const companies: Company[] = [
  {
    slug: "bizagi",
    name: "Bizagi",
    initials: "BZ",
    role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
    area: { es: "Producto — Plataforma de automatización", en: "Product — Automation platform" },
    period: "2022 — Actualidad",
    industry: {
      es: "Software B2B · Automatización de procesos (BPM) y bajo código",
      en: "B2B Software · Process automation (BPM) and low-code",
    },
    clients: ["Banca", "Seguros", "Sector público", "Retail", "Telecomunicaciones"],
    story: {
      es: "Bizagi es una plataforma de automatización de procesos de negocio y bajo código usada por grandes organizaciones a nivel global. Este es un texto de ejemplo sobre la empresa, su producto y su mercado: reemplázalo por tu propia narrativa.",
      en: "Bizagi is a business process automation and low-code platform used by large organizations worldwide. This is placeholder text about the company, its product and market: replace it with your own narrative.",
    },
    profile: {
      es: "Dentro del equipo de producto trabajo en el diseño de flujos complejos de automatización, priorizando claridad para usuarios técnicos y de negocio. Reemplaza este texto por tu rol y responsabilidades reales.",
      en: "Within the product team I design complex automation flows, prioritizing clarity for both technical and business users. Replace this text with your real role and responsibilities.",
    },
    challenges: {
      es: "El día a día implica traducir procesos empresariales complejos en interfaces comprensibles, alinear a stakeholders técnicos y de negocio, y mantener consistencia con el design system. Texto de ejemplo.",
      en: "Day to day involves translating complex enterprise processes into understandable interfaces, aligning technical and business stakeholders, and keeping consistency with the design system. Placeholder text.",
    },
    projects: [
      {
        slug: "rediseno-modelador",
        name: { es: "Rediseño del modelador de procesos", en: "Process modeler redesign" },
        client: { es: "Plataforma Bizagi Studio", en: "Bizagi Studio platform" },
        role: { es: "Diseñador UX/UI líder", en: "Lead UX/UI Designer" },
        year: "2023",
        tags: ["UX Research", "UI", "Design System"],
        challenge: {
          es: "Los usuarios tardaban demasiado en construir procesos por una interfaz densa y poco guiada. Reemplaza por el desafío real.",
          en: "Users took too long to build processes due to a dense, poorly guided interface. Replace with the real challenge.",
        },
        process: {
          es: "Investigación con usuarios, mapeo de flujos, prototipos iterativos en Figma y pruebas de usabilidad. Texto de ejemplo del proceso.",
          en: "User research, flow mapping, iterative Figma prototypes and usability testing. Placeholder process text.",
        },
        before: {
          es: "Interfaz saturada, sin jerarquía clara y con acciones escondidas. (Aquí puedes añadir una imagen del antes.)",
          en: "Cluttered interface, no clear hierarchy and hidden actions. (You can add a 'before' image here.)",
        },
        after: {
          es: "Layout guiado, acciones contextuales y un panel simplificado. (Aquí puedes añadir una imagen del después.)",
          en: "Guided layout, contextual actions and a simplified panel. (You can add an 'after' image here.)",
        },
        solution: {
          es: "Un flujo de construcción por pasos con ayudas contextuales y componentes reutilizables del design system. Reemplaza por tu solución.",
          en: "A step-by-step building flow with contextual help and reusable design-system components. Replace with your solution.",
        },
        metrics: [
          { label: "CES", value: "2.1 → 4.5 / 5", note: { es: "Esfuerzo del cliente", en: "Customer effort" } },
          { label: "Tiempo de tarea", value: "-38%", note: { es: "Crear un proceso", en: "To create a process" } },
          { label: "Adopción", value: "+27%", note: { es: "Uso de la función", en: "Feature usage" } },
        ],
      },
      {
        slug: "asistente-ia",
        name: { es: "Asistente de diseño con IA", en: "AI design assistant" },
        client: { es: "Bizagi — Innovación", en: "Bizagi — Innovation" },
        role: { es: "Diseñador de producto", en: "Product Designer" },
        year: "2024",
        tags: ["IA", "Prototipado", "Concepto"],
        challenge: {
          es: "Explorar cómo la IA podía sugerir automatizaciones al usuario mientras diseña. Texto de ejemplo.",
          en: "Explore how AI could suggest automations to the user while designing. Placeholder text.",
        },
        process: {
          es: "Prototipos conversacionales, pruebas de concepto con modelos y validación con usuarios internos.",
          en: "Conversational prototypes, model-based proofs of concept and validation with internal users.",
        },
        before: { es: "Sin asistencia, todo manual.", en: "No assistance, all manual." },
        after: { es: "Sugerencias contextuales en tiempo real.", en: "Real-time contextual suggestions." },
        solution: {
          es: "Un asistente que propone siguientes pasos y detecta patrones comunes. Reemplaza por tu solución.",
          en: "An assistant that proposes next steps and detects common patterns. Replace with your solution.",
        },
        metrics: [
          { label: "ASP", value: "+19%", note: { es: "Satisfacción promedio", en: "Average satisfaction" } },
          { label: "NPS", value: "+14 pts", note: { es: "Beta interna", en: "Internal beta" } },
        ],
      },
    ],
  },
  {
    slug: "empresa-anterior",
    name: "Empresa Anterior",
    initials: "EA",
    role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
    area: { es: "Equipo de producto digital", en: "Digital product team" },
    period: "2019 — 2022",
    industry: { es: "Fintech · Servicios digitales", en: "Fintech · Digital services" },
    clients: ["Cliente A", "Cliente B", "Cliente C"],
    story: {
      es: "Descripción de ejemplo de otra empresa donde trabajaste. Reemplaza el nombre, la historia y el contexto por los reales.",
      en: "Placeholder description of another company where you worked. Replace the name, story and context with the real ones.",
    },
    profile: {
      es: "Tu perfil y área dentro de esta empresa. Texto de ejemplo.",
      en: "Your profile and area within this company. Placeholder text.",
    },
    challenges: {
      es: "Los desafíos que enfrentabas día a día. Texto de ejemplo.",
      en: "The challenges you faced day to day. Placeholder text.",
    },
    projects: [
      {
        slug: "app-onboarding",
        name: { es: "Onboarding de la app", en: "App onboarding" },
        client: { es: "Producto móvil", en: "Mobile product" },
        role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
        year: "2021",
        tags: ["Mobile", "UX", "Conversión"],
        challenge: {
          es: "Alta deserción en el registro. Texto de ejemplo.",
          en: "High drop-off during sign-up. Placeholder text.",
        },
        process: {
          es: "Análisis del funnel, entrevistas y rediseño por pasos.",
          en: "Funnel analysis, interviews and step-by-step redesign.",
        },
        before: { es: "Registro largo en una sola pantalla.", en: "Long single-screen sign-up." },
        after: { es: "Flujo progresivo en 3 pasos.", en: "Progressive 3-step flow." },
        solution: {
          es: "Onboarding progresivo con validación en línea. Reemplaza por tu solución.",
          en: "Progressive onboarding with inline validation. Replace with your solution.",
        },
        metrics: [
          { label: "Conversión", value: "+41%", note: { es: "Registro completado", en: "Completed sign-up" } },
          { label: "CES", value: "4.7 / 5", note: { es: "Facilidad percibida", en: "Perceived ease" } },
        ],
      },
    ],
  },
];

// ---------------- LABORATORIO ----------------

export const lab: LabEntry[] = [
  {
    slug: "figma-mcp",
    title: { es: "Diseño conectado: Figma + MCP + IA", en: "Connected design: Figma + MCP + AI" },
    summary: {
      es: "Cómo conecto Figma con asistentes de IA vía MCP para acelerar handoff, documentación y exploración.",
      en: "How I connect Figma with AI assistants via MCP to speed up handoff, documentation and exploration.",
    },
    detail: {
      es: "Experimento en el que uso el protocolo MCP para que un asistente de IA lea y escriba en Figma: generar variantes, documentar componentes y producir specs en Markdown. Reemplaza por tu investigación real.",
      en: "An experiment where I use the MCP protocol so an AI assistant can read from and write to Figma: generate variants, document components and produce specs in Markdown. Replace with your real research.",
    },
    tags: ["Figma", "MCP", "IA", "Design Ops"],
  },
  {
    slug: "docs-markdown",
    title: { es: "Documentación viva en Markdown", en: "Living documentation in Markdown" },
    summary: {
      es: "Construcción de documentación de diseño en Markdown, versionable y generada con ayuda de IA.",
      en: "Building design documentation in Markdown, versionable and generated with AI assistance.",
    },
    detail: {
      es: "Proceso para mantener specs, decisiones y guías de sistema como archivos Markdown vivos. Texto de ejemplo.",
      en: "A process to keep specs, decisions and system guides as living Markdown files. Placeholder text.",
    },
    tags: ["Markdown", "Docs", "IA"],
  },
  {
    slug: "research-ia",
    title: { es: "Investigación acelerada con IA", en: "AI-accelerated research" },
    summary: {
      es: "Síntesis de entrevistas y análisis de patrones usando modelos, sin perder el criterio humano.",
      en: "Synthesizing interviews and analyzing patterns using models, without losing human judgment.",
    },
    detail: {
      es: "Cómo uso IA para agrupar hallazgos y detectar temas, validando siempre con el equipo. Texto de ejemplo.",
      en: "How I use AI to cluster findings and detect themes, always validating with the team. Placeholder text.",
    },
    tags: ["Research", "IA", "Síntesis"],
  },
];

// ---------------- TEXTOS DE INTERFAZ ----------------

export const ui = {
  nav: {
    home: { es: "Inicio", en: "Home" },
    work: { es: "Trayectoria", en: "Work" },
    lab: { es: "Laboratorio", en: "Lab" },
    contact: { es: "Contacto", en: "Contact" },
  },
  home: {
    aboutTitle: { es: "Perfil", en: "About" },
    skillsTitle: { es: "Capacidades", en: "Skills" },
    workTitle: { es: "Trayectoria", en: "Work" },
    workSubtitle: {
      es: "Empresas donde he trabajado. Entra a cada una para ver mi rol y los proyectos.",
      en: "Companies I've worked at. Open each one to see my role and projects.",
    },
    viewAll: { es: "Ver trayectoria completa", en: "View full work" },
  },
  work: {
    title: { es: "Trayectoria", en: "Work" },
    subtitle: {
      es: "Cada empresa cuenta una historia: contexto, mi rol y las soluciones que diseñé.",
      en: "Each company tells a story: context, my role and the solutions I designed.",
    },
  },
  company: {
    industry: { es: "Industria", en: "Industry" },
    clients: { es: "Clientes", en: "Clients" },
    profile: { es: "Mi perfil y área", en: "My role & area" },
    challenges: { es: "Desafíos del día a día", en: "Day-to-day challenges" },
    solutions: { es: "Soluciones implementadas", en: "Solutions delivered" },
    solutionsSub: {
      es: "Desarrollos de UX/UI que diseñé en esta empresa.",
      en: "UX/UI work I designed at this company.",
    },
  },
  project: {
    forClient: { es: "Para", en: "For" },
    challenge: { es: "El desafío", en: "The challenge" },
    process: { es: "Proceso y desarrollo", en: "Process & development" },
    beforeAfter: { es: "Antes y después", en: "Before & after" },
    before: { es: "Antes", en: "Before" },
    after: { es: "Después", en: "After" },
    solution: { es: "La solución", en: "The solution" },
    metrics: { es: "Datos de medición", en: "Measurement data" },
    back: { es: "Volver", en: "Back" },
  },
  lab: {
    title: { es: "Laboratorio", en: "Lab" },
    subtitle: {
      es: "Investigaciones y experimentos con IA aplicados al diseño: qué exploro y cómo lo hago.",
      en: "AI research and experiments applied to design: what I explore and how I do it.",
    },
  },
  contact: {
    title: { es: "Contacto", en: "Contact" },
    subtitle: {
      es: "¿Trabajamos juntos? Escríbeme o encuéntrame en estas plataformas.",
      en: "Let's work together. Write to me or find me on these platforms.",
    },
    emailCta: { es: "Enviar correo", en: "Send email" },
  },
  footer: {
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  },
};

export function findCompany(slug: string) {
  return companies.find((c) => c.slug === slug);
}

export function findProject(companySlug: string, projectSlug: string) {
  const company = findCompany(companySlug);
  const project = company?.projects.find((p) => p.slug === projectSlug);
  return { company, project };
}
