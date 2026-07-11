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
  name: "Alexander Romero Ávila",
  role: {
    es: "Diseñador de Producto Senior",
    en: "Senior Product Designer",
  } as Localized,
  tagline: {
    es: "Diseño de producto con mentalidad AI First, de discovery a delivery.",
    en: "AI-First product design, from discovery to delivery.",
  } as Localized,
  location: "Bogotá, Colombia",
  address: "Calle 17 sur # 39-95, Bogotá", // se muestra solo en Contacto
  email: "alex.romer.av@gmail.com",
  phones: ["313 468 9786", "311 210 6075"],
  whatsapp: "313 468 9786",
  whatsappUrl: "https://wa.me/573134689786",
  photo: "/foto.png", // coloca tu foto en public/foto.png (si no existe, muestra iniciales)
  summary: {
    es: "Diseñador de Producto Senior con más de 10 años de experiencia en la creación, evolución y optimización de productos digitales en entornos de alta complejidad. He liderado iniciativas de diseño con equipos multidisciplinarios para construir experiencias claras, accesibles y orientadas a resultados de negocio. Mi enfoque integra investigación, pensamiento sistémico y crítico, diseño de interacción y sistemas de diseño para transformar procesos complejos en soluciones simples, escalables y centradas en las personas. Me especializo en alinear estrategia, diseño y tecnología, asegurando altos estándares de usabilidad, consistencia y valor en cada punto de contacto. Trabajo bajo una mentalidad AI First aplicada al ciclo end-to-end de producto, integrando inteligencia artificial desde discovery hasta delivery y operación para acelerar investigación, optimizar la toma de decisiones, automatizar procesos y habilitar experiencias más eficientes, escalables y personalizadas. Me destaco por convertir el diseño en un habilitador estratégico de innovación, eficiencia operativa y ventaja competitiva.",
    en: "Senior Product Designer with over 10 years of experience creating, evolving and optimizing digital products in highly complex environments. I have led design initiatives with multidisciplinary teams to build clear, accessible and business-oriented experiences. My approach integrates research, systemic and critical thinking, interaction design and design systems to turn complex processes into simple, scalable, people-centered solutions. I specialize in aligning strategy, design and technology, ensuring high standards of usability, consistency and value at every touchpoint. I work with an AI First mindset applied to the end-to-end product cycle, integrating artificial intelligence from discovery through delivery and operations to accelerate research, optimize decision-making, automate processes and enable more efficient, scalable and personalized experiences. I stand out for turning design into a strategic enabler of innovation, operational efficiency and competitive advantage.",
  } as Localized,
  links: [
    { label: "Behance", url: "https://www.behance.net/alexromera9d92", icon: "behance" },
    { label: "Email", url: "mailto:alex.romer.av@gmail.com", icon: "mail" },
    { label: "WhatsApp", url: "https://wa.me/573134689786", icon: "whatsapp" },
  ],
};

// ---------------- EDUCACIÓN FORMAL (2 columnas) ----------------

export const education: {
  degree: Localized;
  institution: string;
  period: string;
}[] = [
  {
    degree: {
      es: "Maestría en Diseño de Experiencia del Usuario",
      en: "Master in User Experience Design",
    },
    institution: "Universidad de La Salle",
    period: "2026 · 2º semestre",
  },
  {
    degree: {
      es: "Máster en Redes Sociales y Aprendizaje Digital",
      en: "Master in Social Networks and Digital Learning",
    },
    institution: "UNED — Universidad Nacional de Educación a Distancia (España)",
    period: "2012",
  },
  {
    degree: {
      es: "Profesional en Diseño Gráfico",
      en: "Bachelor in Graphic Design",
    },
    institution: "Fundación Universitaria del Área Andina",
    period: "2011",
  },
];

// ---------------- PREMIOS / RECONOCIMIENTOS ----------------

export const awards: {
  year: string;
  title: Localized;
  org: string;
}[] = [
  {
    year: "2009",
    title: {
      es: "Primer puesto nacional — Concurso de diseño",
      en: "First place nationally — Design contest",
    },
    org: "Marca Colombia es Pasión",
  },
];

// ---------------- FRASES FAVORITAS ----------------

export const quotes: { text: Localized; author: string }[] = [
  {
    text: {
      es: "El diseño no es solo cómo se ve y se siente. El diseño es cómo funciona.",
      en: "Design is not just what it looks like and feels like. Design is how it works.",
    },
    author: "Steve Jobs",
  },
  {
    text: {
      es: "La vida es como la bicicleta: hay que pedalear hacia adelante para no perder el equilibrio.",
      en: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    },
    author: "Albert Einstein",
  },
];

// ---------------- EXPERIENCIA (línea de tiempo) ----------------

export const experience: {
  company: string;
  initials: string;
  role: Localized;
  period: string;
  featured?: boolean;
  summary?: Localized;
  functions: Localized[];
}[] = [
  {
    company: "Bizagi",
    initials: "BZ",
    role: { es: "Senior UX Designer", en: "Senior UX Designer" },
    period: "Mar 2022 — Actualidad",
    featured: true,
    summary: {
      es: "Como Senior UX Designer en Bizagi —plataforma global de automatización de procesos (BPM) y bajo código usada por grandes organizaciones— lidero el diseño de experiencias para productos empresariales de alta complejidad. Trabajo end-to-end, desde discovery e investigación hasta prototipado y entrega, con equipos multidisciplinarios y bajo una mentalidad AI First: integro IA para acelerar research, optimizar la toma de decisiones y escalar el sistema de diseño. Mi foco es traducir procesos técnicos complejos en interfaces claras, accesibles y consistentes que generan valor de negocio medible a través de métricas de usabilidad.",
      en: "As Senior UX Designer at Bizagi —a global process automation (BPM) and low-code platform used by large organizations— I lead experience design for highly complex enterprise products. I work end-to-end, from discovery and research to prototyping and delivery, with multidisciplinary teams and an AI First mindset: I integrate AI to accelerate research, optimize decision-making and scale the design system. My focus is translating complex technical processes into clear, accessible and consistent interfaces that drive measurable business value through usability metrics.",
    },
    functions: [
      { es: "UX Research", en: "UX Research" },
      { es: "Design Thinking", en: "Design Thinking" },
      { es: "Análisis heurístico", en: "Heuristic analysis" },
      { es: "Metodologías ágiles", en: "Agile methodologies" },
      { es: "Métricas de usabilidad", en: "Usability metrics" },
      { es: "Responsive design", en: "Responsive design" },
      { es: "Diseño UI y prototipado", en: "UI design & prototyping" },
      { es: "Sistemas de diseño", en: "Design systems" },
    ],
  },
  {
    company: "Inter Rapidísimo",
    initials: "IR",
    role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
    period: "Ene 2021 — Ene 2022",
    functions: [
      { es: "UX Research", en: "UX Research" },
      { es: "Análisis de la información", en: "Information analysis" },
      { es: "Scrum", en: "Scrum" },
      { es: "Diseño UI", en: "UI design" },
      { es: "Sistema de diseño empresarial", en: "Enterprise design system" },
    ],
  },
  {
    company: "Entelgy Colombia",
    initials: "EC",
    role: { es: "WebMaster Liferay — Banco Itaú", en: "Liferay WebMaster — Itaú Bank" },
    period: "Nov 2018 — Nov 2020",
    functions: [
      { es: "Administración Liferay", en: "Liferay administration" },
      { es: "Maquetación", en: "Markup / layout" },
      { es: "Implementación SEO", en: "SEO implementation" },
      { es: "Análisis Hotjar", en: "Hotjar analysis" },
      { es: "Análisis de datos GTM", en: "GTM data analysis" },
      { es: "Diseño UI y prototipado", en: "UI design & prototyping" },
      { es: "Landing pages", en: "Landing pages" },
    ],
  },
  {
    company: "Fundación Universitaria del Área Andina",
    initials: "AA",
    role: {
      es: "Coordinador de Gestión de Contenidos",
      en: "Content Management Coordinator",
    },
    period: "2017 — 2018 · por confirmar",
    functions: [
      { es: "Diseño UX e investigación", en: "UX design & research" },
      { es: "Métricas de usabilidad", en: "Usability metrics" },
      { es: "Sistema de diseño", en: "Design system" },
      { es: "Design Thinking", en: "Design Thinking" },
      { es: "Scrum Master", en: "Scrum Master" },
      { es: "Cumplimiento de objetivos", en: "Goal achievement" },
    ],
  },
  {
    company: "Entelgy Colombia",
    initials: "EC",
    role: { es: "Desarrollador Liferay", en: "Liferay Developer" },
    period: "Ene 2017 — Jun 2017",
    functions: [
      { es: "Administración del portal", en: "Portal administration" },
      { es: "Migración de contenido", en: "Content migration" },
      { es: "Landing pages y flujos", en: "Landing pages & flows" },
      { es: "Wireframes y kit visual", en: "Wireframes & visual kit" },
      { es: "Look and feel de la web", en: "Web look and feel" },
    ],
  },
  {
    company: "Brain Media",
    initials: "BM",
    role: { es: "Director de Producción Web", en: "Web Production Director" },
    period: "Mar 2016 — Dic 2016",
    functions: [
      { es: "Gestión de proyectos", en: "Project management" },
      { es: "Marketing research", en: "Marketing research" },
      { es: "Diseño de páginas web", en: "Web design" },
      { es: "SEO y SEM", en: "SEO & SEM" },
      { es: "Diseño de video", en: "Video design" },
      { es: "Liderazgo de producción", en: "Production leadership" },
    ],
  },
  {
    company: "Escuela Superior de Administración Pública",
    initials: "EA",
    role: { es: "Diseñador Gráfico E-learning", en: "E-learning Graphic Designer" },
    period: "Oct 2015 — Ago 2016",
    functions: [
      { es: "Cursos interactivos", en: "Interactive courses" },
      { es: "Investigación de usuario", en: "User research" },
      { es: "Gestión de plataforma Moodle", en: "Moodle platform management" },
      { es: "Producción y postproducción de video", en: "Video production & post" },
      { es: "Piezas publicitarias", en: "Advertising pieces" },
    ],
  },
  {
    company: "Universidad Manuela Beltrán",
    initials: "MB",
    role: {
      es: "Diseñador Gráfico — Coordinador Académico",
      en: "Graphic Designer — Academic Coordinator",
    },
    period: "Ago 2011 — Sep 2015",
    functions: [
      { es: "Administración de contenidos", en: "Content administration" },
      { es: "Diseño de cursos virtuales", en: "Virtual course design" },
      { es: "Branding", en: "Branding" },
      { es: "Diseño para redes sociales", en: "Social media design" },
      { es: "Liderazgo de equipo", en: "Team leadership" },
      { es: "Coordinador TIC", en: "ICT coordinator" },
    ],
  },
];

// ---------------- OTROS ESTUDIOS ----------------

export const otherStudies: {
  name: Localized;
  institution: string;
  year: string;
  featured?: boolean; // se muestra en la vista por defecto; el resto en el modal
}[] = [
  {
    name: {
      es: "Product Management & Product Design con IA Generativa",
      en: "Product Management & Product Design with Generative AI",
    },
    institution: "Udemy",
    year: "2026",
    featured: true,
  },
  {
    name: { es: "Claude AI en acción: de cero a experto", en: "Claude AI in action: zero to expert" },
    institution: "Udemy",
    year: "2026",
    featured: true,
  },
  {
    name: { es: "Neuromarketing", en: "Neuromarketing" },
    institution: "Udemy",
    year: "2026",
    featured: true,
  },
  {
    name: {
      es: "UX: leyes y fundamentos con ejemplos prácticos",
      en: "UX: laws and fundamentals with practical examples",
    },
    institution: "Udemy",
    year: "2024",
    featured: true,
  },
  {
    name: { es: "Lean Inception: Design Thinking y Lean StartUp", en: "Lean Inception: Design Thinking & Lean StartUp" },
    institution: "Udemy",
    year: "2024",
    featured: true,
  },
  {
    name: {
      es: "Leadership: How to Influence, Inspire and Impact as a Leader",
      en: "Leadership: How to Influence, Inspire and Impact as a Leader",
    },
    institution: "Udemy",
    year: "2024",
  },
  {
    name: {
      es: "Bootcamp UX/UI: Design Thinking y Figma",
      en: "UX/UI Bootcamp: Design Thinking & Figma",
    },
    institution: "Udemy",
    year: "2023",
  },
  {
    name: {
      es: "ChatGPT Marketing: campañas completas con IA",
      en: "ChatGPT Marketing: full campaigns with AI",
    },
    institution: "Udemy",
    year: "2023",
  },
  {
    name: { es: "Diseño UX: experiencia de usuario UX/UI + Figma", en: "UX Design: UX/UI + Figma" },
    institution: "Udemy",
    year: "2022",
  },
  {
    name: { es: "Angular", en: "Angular" },
    institution: "Udemy",
    year: "2020",
  },
  {
    name: { es: "SEO for Digital Companies", en: "SEO for Digital Companies" },
    institution: "Udemy",
    year: "2020",
  },
  {
    name: { es: "Interface Design and UX", en: "Interface Design and UX" },
    institution: "Platzi",
    year: "2019",
  },
  {
    name: { es: "Interface Design", en: "Interface Design" },
    institution: "Platzi",
    year: "2019",
  },
  {
    name: { es: "Scrum Master", en: "Scrum Master" },
    institution: "Platzi",
    year: "2019",
  },
  {
    name: { es: "Programming Logic", en: "Programming Logic" },
    institution: "Udemy",
    year: "2017",
  },
  {
    name: { es: "Marketing Digital", en: "Digital Marketing" },
    institution: "IAB & Google",
    year: "2015",
  },
  {
    name: { es: "HTML5 avanzado", en: "Advanced HTML5" },
    institution: "Cymetria Training",
    year: "2013",
  },
];

// ---------------- REFERENCIAS ----------------
// Nota: los teléfonos de terceros no se muestran públicamente por privacidad.

export const referencesPersonal: {
  name: string;
  role: Localized;
  company: string;
  phone?: string;
}[] = [
  {
    name: "Jaime Daza",
    role: { es: "Senior UX Designer", en: "Senior UX Designer" },
    company: "Mercado Libre (Meli)",
    phone: "300 563 2062",
  },
  {
    name: "Javier Martínez",
    role: { es: "AI Engineer", en: "AI Engineer" },
    company: "Efecto29",
    phone: "324 630 1531",
  },
];

export const referencesFamily: {
  name: string;
  profile: Localized;
  occupation: Localized;
  company: string;
  phone?: string;
}[] = [
  {
    name: "Carlos Andrés Romero Ávila",
    profile: {
      es: "Licenciado en Primaria · Maestría en Educación Infantil",
      en: "Primary Education degree · Master in Early Childhood Education",
    },
    occupation: { es: "Docente de planta de primaria", en: "Primary school teacher" },
    company: "Inem Santiago Pérez",
    phone: "304 520 4501",
  },
  {
    name: "Ricardo Romero Ávila",
    profile: {
      es: "Ingeniero de Sistemas · Esp. Ingeniería de Software",
      en: "Systems Engineer · Software Engineering Specialist",
    },
    occupation: {
      es: "Arquitecto Empresarial & Soluciones",
      en: "Enterprise & Solutions Architect",
    },
    company: "ACH Colombia",
    phone: "301 208 9939",
  },
];

// ---------------- SKILLS ----------------

export const skills: { category: Localized; items: string[] }[] = [
  {
    category: { es: "UX / UI", en: "UX / UI" },
    items: [
      "User Experience (UX)",
      "User Interface Design",
      "Customer Experience",
      "UX design artifacts",
      "Análisis heurístico",
      "Prototyping",
    ],
  },
  {
    category: { es: "Métodos", en: "Methods" },
    items: ["Design Thinking", "Lean UX", "Agile (Scrum)", "Lean Inception", "Branding"],
  },
  {
    category: { es: "IA", en: "AI" },
    items: [
      "Artificial Intelligence",
      "AI First",
      "Generative AI",
      "Claude Code",
    ],
  },
  {
    category: { es: "Tecnología", en: "Technology" },
    items: ["HTML5", "CSS", "SCSS / SASS", "Bootstrap"],
  },
  {
    category: { es: "Herramientas", en: "Tools" },
    items: ["Figma", "Adobe Suite", "Hotjar", "Zeplin"],
  },
  {
    category: { es: "Idiomas", en: "Languages" },
    items: ["Español — nativo", "Inglés — B1"],
  },
];

// Skills más relevantes (vista previa tipo "Top skills" de LinkedIn)
export const topSkills = [
  "User Experience (UX)",
  "User Interface Design",
  "Design Thinking",
  "AI First",
  "Prototyping",
  "Figma",
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
  navSub: {
    home: { es: "Sobre mí", en: "About" },
    work: { es: "Proyectos", en: "Projects" },
    lab: { es: "Experimentos", en: "Experiments" },
    contact: { es: "Conectemos", en: "Let's connect" },
  },
  menu: { es: "Menú", en: "Menu" },
  headerLabel: { es: "Resumen", en: "Resume" },
  home: {
    aboutTitle: { es: "Perfil profesional", en: "Professional profile" },
    skillsTitle: { es: "Skills y conocimiento", en: "Skills & knowledge" },
    educationTitle: { es: "Formación académica", en: "Education" },
    awardsTitle: { es: "Premios y reconocimientos", en: "Awards & recognition" },
    quotesTitle: { es: "Frases favoritas", en: "Favorite quotes" },
    experienceTitle: { es: "Experiencia laboral", en: "Work experience" },
    functionsLabel: { es: "Funciones", en: "Responsibilities" },
    mostRecent: { es: "Más reciente", en: "Most recent" },
    otherStudiesTitle: { es: "Otros estudios", en: "Other studies" },
    studiesViewAll: { es: "Ver todos los estudios", en: "View all studies" },
    studiesModalTitle: { es: "Todos los estudios y certificaciones", en: "All studies & certifications" },
    readMore: { es: "ver más", en: "see more" },
    readLess: { es: "ver menos", en: "see less" },
    skillsViewAll: { es: "Ver todas las skills y conocimiento", en: "View all skills & knowledge" },
    experienceViewAll: { es: "Ver toda la experiencia laboral", en: "View full work experience" },
    experienceModalTitle: { es: "Experiencia laboral", en: "Work experience" },
    skillsModalTitle: { es: "Skills y conocimiento", en: "Skills & knowledge" },
    skillsTopLabel: { es: "Skills principales", en: "Top skills" },
    awardBadge: { es: "Reconocimiento", en: "Award" },
    referencesTitle: { es: "Referencias", en: "References" },
    referencesPersonal: { es: "Personales", en: "Professional" },
    referencesFamily: { es: "Familiares", en: "Family" },
    referenceContact: { es: "Contacto disponible a solicitud", en: "Contact available on request" },
    contactCardTitle: { es: "Contacto", en: "Contact" },
    close: { es: "Cerrar", en: "Close" },
    workTitle: { es: "Trayectoria", en: "Work" },
    workSubtitle: {
      es: "Empresas donde he trabajado. Entra a cada una para ver mi rol y los proyectos.",
      en: "Companies I've worked at. Open each one to see my role and projects.",
    },
    viewAll: { es: "Ver trayectoria completa", en: "View full work" },
    viewPortfolio: { es: "Ver portafolio completo", en: "View full portfolio" },
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
