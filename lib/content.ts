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
  // --- Presentación de la tarjeta destacada (portafolio) ---
  featured?: boolean; // aparece en "Featured Projects"
  image?: string; // ruta en /public (ej. "/imagenes/ai-worker.webp")
  product?: string; // etiqueta superior izquierda (ej. "Bizagi Studio")
  category?: Localized; // etiqueta morada (ej. "AI Workers")
  highlight?: Localized; // parte del nombre a resaltar en amarillo (ej. "AI Assistant")
  cardSummary?: Localized; // texto corto en la tarjeta
  focus?: Localized; // "Focus: ..." (ej. "Artificial Intelligence")
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
  // --- Presentación del banner (portafolio) ---
  banner?: string; // ruta del banner en /public (ej. "/imagenes/banner-bizagi.png")
  logo?: string; // logo blanco de la empresa para el banner (ej. "/logos/bizagi-blanca.png")
  illustration?: string; // ilustración que acompaña el texto de intro
  team?: Localized; // equipo (ej. "Producto")
  roleShort?: Localized; // rol para la barra del banner (ej. "Senior UX Designer")
  projectsIntro?: Localized; // párrafo introductorio de la sección de proyectos
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
    { label: "LinkedIn", url: "https://www.linkedin.com/in/alexanderomero/", icon: "linkedin" },
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
    institution: "Universidad de La Salle · 2º semestre",
    period: "2026",
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
  logo?: string; // ruta a logo en /public/logos (ej. "/logos/bizagi.png"); vacío usa iniciales
  role: Localized;
  period: string;
  featured?: boolean;
  summary?: Localized;
  location?: Localized;
  functions: Localized[];
}[] = [
  {
    company: "Bizagi Latam",
    initials: "BZ",
    logo: "/logos/empresa-8.png",
    role: { es: "Senior UX Designer", en: "Senior UX Designer" },
    period: "Mar 2022 — Actualidad",
    featured: true,
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Como Senior UX Designer en una empresa BPM en la automatización de procesos empresariales, lidero y realizo procesos de mejora de experiencia usuario haciendo uso estratégico de la inteligencia artificial en el producto. Desarrollo wireframes y prototipos para pruebas conceptuales, así como diseños visuales detallados y estrategias de gobernanza. Además, tenemos procesos de QA enfocados en el diseño con equipos multifuncionales para garantizar la coherencia y la calidad del diseño en todos los lanzamientos.",
      en: "As Senior UX Designer at a BPM company focused on business process automation, I lead and carry out user experience improvement processes, making strategic use of artificial intelligence in the product. I develop wireframes and prototypes for concept testing, as well as detailed visual designs and governance strategies. We also run design-focused QA processes with cross-functional teams to ensure design consistency and quality across every release.",
    },
    functions: [
      { es: "UX research", en: "UX research" },
      { es: "Design thinking", en: "Design thinking" },
      { es: "Análisis heurísticas", en: "Heuristic analysis" },
      { es: "Metodologías ágiles", en: "Agile methodologies" },
      { es: "Métricas de usabilidad", en: "Usability metrics" },
      { es: "Responsive design", en: "Responsive design" },
      { es: "Design tools - UI", en: "Design tools - UI" },
      { es: "UI Design and prototype", en: "UI Design and prototype" },
      { es: "Design systems", en: "Design systems" },
      { es: "AI processes", en: "AI processes" },
    ],
  },
  {
    company: "Inter Rapidísimo",
    initials: "IR",
    logo: "/logos/empresa-7.png",
    role: { es: "Diseñador UX UI", en: "UX UI Designer" },
    period: "Enero 2021 - Febrero 2022",
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Me encargo de buscar continuamente formas de mejorar los productos de la compañía, conocer cómo se siente el usuario con la experiencia del producto y/o cómo hacer que el producto cumpla con los principios del sistema de diseño de la empresa: usable, escalable y flexible. Principalmente, diseño soluciones en un lenguaje gráfico, creo sistemas de diseño, plataformas o software para cubrir las necesidades del usuario combinando interfaces y flujos de trabajo para mejorar su experiencia; también soy responsable de que el producto sea más amigable e intuitivo para atraer y retener nuevos usuarios. Entre los entregables está la documentación de user persona y su banco, el journey map por proyecto, diagramas de usuario, wireframes, mockups y prototipado, pruebas de diseño, testeos y la creación de laboratorios de usuario para mejoras continuas.",
      en: "I continuously look for ways to improve the company's products, understanding how users feel about the product experience and how to make the product meet the company's design-system principles: usable, scalable and flexible. I mainly design solutions in a graphic language, create design systems, platforms and software to cover user needs by combining interfaces and workflows to improve their experience; I'm also responsible for making the product friendlier and more intuitive to attract and retain new users. Deliverables include user-persona documentation and its bank, per-project journey maps, user diagrams, wireframes, mockups and prototyping, design tests, and building user labs for continuous improvement.",
    },
    functions: [
      { es: "UX research", en: "UX research" },
      { es: "Design thinking", en: "Design thinking" },
      { es: "Scrum", en: "Scrum" },
      { es: "UI Design and prototype", en: "UI Design and prototype" },
      { es: "Metodologías ágiles", en: "Agile methodologies" },
      { es: "Métricas de usabilidad", en: "Usability metrics" },
    ],
  },
  {
    company: "Entelgy",
    initials: "EN",
    logo: "/logos/empresa-6.png",
    role: { es: "Desarrollador web (WebMaster ITAÚ)", en: "Web Developer (WebMaster ITAÚ)" },
    period: "Noviembre 2018 - Noviembre 2020",
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Me desempeño en el rol de WebMaster en el Banco Itaú, administrando el sitio web con Liferay. Entre mis funciones: diseño UX, administración del sitio del cliente con Liferay, actualización de contenido web, maquetación de offer-pages y QA de microsites, verificando que cumplan todos los estándares web de la compañía: que sea responsive, que cumpla con la experiencia de usuario UX-UI planteada, que tenga el SEO adecuado y que respete el manual de marca del cliente.",
      en: "I work as WebMaster at Itaú Bank, managing the website with Liferay. My responsibilities include: UX design, administration of the client's Liferay site, web content updates, offer-page markup and QA of microsites, verifying they meet all the company's web standards: responsive, compliant with the defined UX-UI experience, proper SEO, and adherence to the client's brand guidelines.",
    },
    functions: [
      { es: "Resolución colaborativa de problemas", en: "Collaborative problem solving" },
      { es: "User Experience (UX)", en: "User Experience (UX)" },
      { es: "Scrum", en: "Scrum" },
      { es: "UI Design and prototype", en: "UI Design and prototype" },
      { es: "Metodologías ágiles", en: "Agile methodologies" },
      { es: "Métricas de usabilidad", en: "Usability metrics" },
    ],
  },
  {
    company: "Fundación Universitaria del Área Andina",
    initials: "AA",
    logo: "/logos/empresa-5.png",
    role: {
      es: "Coordinador de Gestión de Contenidos",
      en: "Content Management Coordinator",
    },
    period: "2017 — 2018",
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Coordinador de gestión de contenidos del proyecto CANVAS de la Fundación Universitaria del Área Andina. Lidero el equipo de producción del proyecto, desarrollo la planeación del equipo de trabajo, elaboro estrategias efectivas con metodología Scrum, delego tareas para el cumplimiento de objetivos, cumplo los objetivos semanales de la dirección y mantengo un excelente ambiente laboral para asegurar el éxito del equipo y del proyecto. También diseño la estrategia de usabilidad y experiencia de usuario en la plataforma y en los OVA educativos.",
      en: "Content management coordinator for the CANVAS project at Fundación Universitaria del Área Andina. I lead the project's production team, plan the team's work, build effective strategies using Scrum, delegate tasks to meet objectives, deliver the direction's weekly goals and maintain an excellent work environment to ensure the team's and project's success. I also design the usability and user-experience strategy for the platform and educational learning objects (OVA).",
    },
    functions: [
      { es: "Liderazgo de equipo", en: "Team leadership" },
      { es: "Planeación", en: "Planning" },
      { es: "Scrum", en: "Scrum" },
      { es: "Delegación de tareas", en: "Task delegation" },
      { es: "Cumplimiento de objetivos", en: "Goal achievement" },
      { es: "Estrategia de UX y usabilidad", en: "UX & usability strategy" },
    ],
  },
  {
    company: "Entelgy",
    initials: "EN",
    logo: "/logos/empresa-4.png",
    role: { es: "Desarrollador Liferay", en: "Liferay Developer" },
    period: "Enero 2017 - Junio 2017",
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Me desempeñé como Desarrollador Liferay, diseñando y administrando las diferentes plataformas del Banco CorpBanca y Helm (hoy Itaú). Funciones: diseño de wireframes y mockups para la plataforma, desarrollo del look and feel del sitio, creación de diseño centrado en el usuario (UX/UI), y administración y migración de contenidos.",
      en: "I worked as a Liferay Developer, designing and managing the different platforms of CorpBanca and Helm banks (today Itaú). Responsibilities: wireframe and mockup design for the platform, development of the site's look and feel, user-centered design (UX/UI), and content administration and migration.",
    },
    functions: [
      { es: "Wireframes y mockups", en: "Wireframes & mockups" },
      { es: "Look and feel", en: "Look and feel" },
      { es: "Diseño centrado en el usuario (UX/UI)", en: "User-centered design (UX/UI)" },
      { es: "Administración y migración de contenidos", en: "Content administration & migration" },
    ],
  },
  {
    company: "Brain Media",
    initials: "BM",
    logo: "/logos/empresa-3.png",
    role: { es: "Director de Producción Web", en: "Web Production Director" },
    period: "Marzo 2016 - Diciembre 2016",
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Director de producción web con personal a cargo y realizador para empresas como Della Valentina DVO, Gef, Davivienda, Cable & Wireless, Ciprogress Greenlife, Saviesa, RedBull y Copublicitarios, entre otros. Les di soluciones en redes sociales (marketing digital), páginas web (desarrollo de SEO y SEM), producción de video e identidad corporativa.",
      en: "Web production director with staff in charge and producer for companies such as Della Valentina DVO, Gef, Davivienda, Cable & Wireless, Ciprogress Greenlife, Saviesa, RedBull and Copublicitarios, among others. I delivered solutions in social media (digital marketing), websites (SEO and SEM development), video production and corporate identity.",
    },
    functions: [
      { es: "Gestión de proyectos", en: "Project management" },
      { es: "Marketing digital", en: "Digital marketing" },
      { es: "Páginas web (SEO/SEM)", en: "Websites (SEO/SEM)" },
      { es: "Producción de video", en: "Video production" },
      { es: "Identidad corporativa", en: "Corporate identity" },
      { es: "Liderazgo de equipo", en: "Team leadership" },
    ],
  },
  {
    company: "ESAP",
    initials: "ES",
    logo: "/logos/empresa-2.png",
    role: { es: "Diseñador Gráfico E-learning", en: "E-learning Graphic Designer" },
    period: "Octubre 2015 - Agosto 2016",
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Diseñador gráfico en el área de capacitaciones de la ESAP (Escuela Superior de Administración Pública), encargado de realizar cursos virtuales en HTML5, CSS y JS pensados en la experiencia del estudiante, bajando el índice de deserción en la educación virtual con cursos a la medida, ilustraciones y videos educativos y promocionales dentro de Moodle. Los videos incluían registro fotográfico, motion graphics y grabación de autores, pasando por preproducción, producción y postproducción.",
      en: "Graphic designer in the training area of ESAP (Colombia's public administration school), responsible for building virtual courses in HTML5, CSS and JS focused on the student experience, lowering dropout rates in online education with tailor-made courses, illustrations and educational/promotional videos inside Moodle. Videos included photography, motion graphics and author recording, covering pre-production, production and post-production.",
    },
    functions: [
      { es: "Cursos virtuales (HTML5/CSS/JS)", en: "Virtual courses (HTML5/CSS/JS)" },
      { es: "Experiencia del estudiante", en: "Student experience" },
      { es: "Ilustración", en: "Illustration" },
      { es: "Motion graphics", en: "Motion graphics" },
      { es: "Producción de video", en: "Video production" },
      { es: "Moodle", en: "Moodle" },
    ],
  },
  {
    company: "Universidad Manuela Beltrán",
    initials: "MB",
    logo: "/logos/empresa-1.png",
    role: { es: "Diseñador Gráfico", en: "Graphic Designer" },
    period: "Agosto 2011 - Septiembre 2015",
    location: { es: "Bogotá, D.C., Colombia", en: "Bogotá, D.C., Colombia" },
    summary: {
      es: "Diseñador gráfico en productos virtuales, e-learning, páginas web, elementos para el comercio electrónico, mailing y marketing digital, entre otros.",
      en: "Graphic designer working on virtual products, e-learning, websites, e-commerce elements, mailing and digital marketing, among others.",
    },
    functions: [
      { es: "E-learning", en: "E-learning" },
      { es: "Páginas web", en: "Websites" },
      { es: "E-commerce", en: "E-commerce" },
      { es: "Mailing", en: "Mailing" },
      { es: "Marketing digital", en: "Digital marketing" },
      { es: "Branding", en: "Branding" },
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

// Navegación del sidebar (5 items)
export const sideNav: {
  href: string;
  icon: string;
  sub: Localized;
  title: Localized;
  short: Localized; // etiqueta corta para la barra móvil
}[] = [
  {
    href: "/experiencia",
    icon: "career",
    sub: { es: "Experiencia", en: "Experience" },
    title: { es: "Trayectoria", en: "Career Journey" },
    short: { es: "Experiencia", en: "Experience" },
  },
  {
    href: "/trayectoria",
    icon: "portfolio",
    sub: { es: "Proyectos", en: "Projects" },
    title: { es: "Portafolio", en: "Portfolio" },
    short: { es: "Portafolio", en: "Portfolio" },
  },
  {
    href: "/laboratorio",
    icon: "lab",
    sub: { es: "Experimentos", en: "Experiments" },
    title: { es: "Laboratorio", en: "Lab" },
    short: { es: "Lab", en: "Lab" },
  },
  {
    href: "/hoja-de-vida",
    icon: "resume",
    sub: { es: "Sobre mí", en: "About" },
    title: { es: "Hoja de vida", en: "Resume" },
    short: { es: "Resumen", en: "Resume" },
  },
  {
    href: "/contacto",
    icon: "connect",
    sub: { es: "Conectemos", en: "Let's Connect" },
    title: { es: "Contáctame", en: "Get in Touch" },
    short: { es: "Contacto", en: "Contact" },
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
    banner: "/imagenes/bizagi/imagen-banner.png",
    logo: "/logos/bizagi-blanca.png",
    illustration: "/imagenes/bizagi/ilustracion.png",
    team: { es: "Producto", en: "Product" },
    roleShort: { es: "Senior UX Designer", en: "Senior UX Designer" },
    projectsIntro: {
      es: "Una selección de los proyectos en los que he contribuido como parte del equipo de Producto de Bizagi. Cada uno representó un reto distinto —desde experiencias potenciadas con IA y plataformas de bajo código hasta sistemas de diseño y aplicaciones empresariales— y en todos busqué traducir procesos complejos en soluciones claras, consistentes y centradas en las personas. Trabajé de la mano de equipos multidisciplinarios, del discovery al delivery, para asegurar que cada decisión de diseño aportara valor real al negocio y a quienes usan el producto.",
      en: "A selection of the projects I've contributed to as part of Bizagi's Product team. Each one was a different challenge —from AI-powered experiences and low-code platforms to design systems and enterprise applications— and across all of them I worked to turn complex processes into clear, consistent, people-centered solutions. Partnering with cross-functional teams from discovery to delivery, I made sure every design decision added real value for the business and for the people using the product.",
    },
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
        featured: true,
        image: "/imagenes/bizagi/trabajo-1.png",
        product: "Bizagi Studio",
        category: { es: "Low-Code", en: "Low-Code" },
        highlight: { es: "modelador", en: "modeler" },
        cardSummary: {
          es: "Rediseño del modelador de procesos para que crear automatizaciones sea más rápido, claro y guiado.",
          en: "Redesigning the process modeler so building automations is faster, clearer and more guided.",
        },
        focus: { es: "Sistema de diseño", en: "Design System" },
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
        featured: true,
        image: "/imagenes/bizagi/trabajo-2.png",
        product: "Bizagi Studio",
        category: { es: "AI Workers", en: "AI Workers" },
        highlight: { es: "con IA", en: "design assistant" },
        cardSummary: {
          es: "Diseño de asistentes inteligentes potenciados por el conocimiento de la organización para ayudar a las personas a interactuar con la información empresarial de forma más efectiva.",
          en: "Designing intelligent assistants powered by organizational knowledge to help users interact with enterprise information more effectively.",
        },
        focus: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
      },
    ],
  },
  {
    slug: "inter-rapidisimo",
    name: "Inter Rapidísimo",
    initials: "IR",
    role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
    roleShort: { es: "UX/UI Designer", en: "UX/UI Designer" },
    area: { es: "Producto digital", en: "Digital product" },
    period: "2021 — 2022",
    team: { es: "Producto", en: "Product" },
    banner: "/imagenes/inter-rapidisimo/imagen-banner.png",
    industry: {
      es: "Logística y paquetería · Servicios digitales",
      en: "Logistics & parcel delivery · Digital services",
    },
    clients: ["Logística", "Paquetería", "Puntos de venta", "Atención al cliente"],
    projectsIntro: {
      es: "Como diseñador UX/UI busqué continuamente formas de mejorar los productos de la compañía, construyendo un sistema de diseño usable, escalable y flexible. Trabajé con investigación, journey maps, wireframes, prototipos y laboratorios de usuario para hacer las plataformas más amigables e intuitivas, atraer y retener usuarios y mejorar su experiencia de principio a fin. Reemplaza este texto por tu narrativa real.",
      en: "As a UX/UI designer I continuously looked for ways to improve the company's products, building a usable, scalable and flexible design system. I worked with research, journey maps, wireframes, prototypes and user labs to make the platforms friendlier and more intuitive, attract and retain users and improve their end-to-end experience. Replace this text with your real narrative.",
    },
    story: {
      es: "Inter Rapidísimo es una de las empresas de logística y paquetería más grandes de Colombia. Texto de ejemplo: reemplázalo por tu narrativa.",
      en: "Inter Rapidísimo is one of the largest logistics and parcel companies in Colombia. Placeholder text: replace it with your narrative.",
    },
    profile: {
      es: "Diseñé soluciones en lenguaje gráfico y sistemas de diseño para cubrir las necesidades del usuario. Texto de ejemplo.",
      en: "I designed graphic-language solutions and design systems to meet user needs. Placeholder text.",
    },
    challenges: {
      es: "Hacer el producto más amigable e intuitivo manteniendo consistencia con el sistema de diseño. Texto de ejemplo.",
      en: "Making the product friendlier and more intuitive while keeping consistency with the design system. Placeholder text.",
    },
    projects: [
      {
        slug: "sistema-de-diseno",
        name: { es: "Sistema de diseño", en: "Design system" },
        client: { es: "Plataformas Inter Rapidísimo", en: "Inter Rapidísimo platforms" },
        role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
        year: "2022",
        tags: ["Design System", "UI", "Componentes"],
        challenge: {
          es: "Inconsistencias entre plataformas y componentes duplicados. Reemplaza por el desafío real.",
          en: "Inconsistencies across platforms and duplicated components. Replace with the real challenge.",
        },
        process: {
          es: "Auditoría de UI, tokens, librería de componentes y documentación. Texto de ejemplo.",
          en: "UI audit, tokens, component library and documentation. Placeholder text.",
        },
        before: { es: "Componentes sueltos sin guía.", en: "Loose components with no guidelines." },
        after: { es: "Librería única y documentada.", en: "A single, documented library." },
        solution: {
          es: "Un sistema de diseño usable, escalable y flexible. Reemplaza por tu solución.",
          en: "A usable, scalable and flexible design system. Replace with your solution.",
        },
        metrics: [
          { label: "Consistencia", value: "+45%", note: { es: "Reutilización de UI", en: "UI reuse" } },
          { label: "Tiempo", value: "-30%", note: { es: "Entrega de pantallas", en: "Screen delivery" } },
        ],
        featured: true,
        image: "/imagenes/inter-rapidisimo/trabajo-1.png",
        product: "Inter Rapidísimo",
        category: { es: "Design System", en: "Design System" },
        highlight: { es: "diseño", en: "system" },
        cardSummary: {
          es: "Un sistema de diseño único para unificar componentes y acelerar la entrega en todas las plataformas.",
          en: "A single design system to unify components and speed up delivery across every platform.",
        },
        focus: { es: "Sistema de diseño", en: "Design System" },
      },
      {
        slug: "portal-envios",
        name: { es: "Rediseño del portal de envíos", en: "Shipping portal redesign" },
        client: { es: "Portal web", en: "Web portal" },
        role: { es: "Diseñador UX/UI", en: "UX/UI Designer" },
        year: "2021",
        tags: ["UX Research", "UI", "Web"],
        challenge: {
          es: "El usuario no completaba el flujo de envío con facilidad. Reemplaza por el desafío real.",
          en: "Users struggled to complete the shipping flow. Replace with the real challenge.",
        },
        process: {
          es: "Investigación, journey map, wireframes y pruebas de usabilidad. Texto de ejemplo.",
          en: "Research, journey map, wireframes and usability testing. Placeholder text.",
        },
        before: { es: "Flujo confuso y con fricción.", en: "Confusing, high-friction flow." },
        after: { es: "Flujo guiado por pasos.", en: "Guided, step-by-step flow." },
        solution: {
          es: "Un portal más claro e intuitivo para cotizar y enviar. Reemplaza por tu solución.",
          en: "A clearer, more intuitive portal to quote and ship. Replace with your solution.",
        },
        metrics: [
          { label: "Conversión", value: "+28%", note: { es: "Envío completado", en: "Completed shipment" } },
          { label: "CES", value: "4.4 / 5", note: { es: "Facilidad percibida", en: "Perceived ease" } },
        ],
        featured: true,
        image: "/imagenes/inter-rapidisimo/trabajo-2.png",
        product: "Inter Rapidísimo",
        category: { es: "Web", en: "Web" },
        highlight: { es: "portal", en: "portal" },
        cardSummary: {
          es: "Rediseño del portal de envíos para que cotizar y despachar sea más claro, rápido y guiado.",
          en: "Redesign of the shipping portal so quoting and dispatching is clearer, faster and guided.",
        },
        focus: { es: "Experiencia de usuario", en: "User Experience" },
      },
    ],
  },
  {
    slug: "entelgy-itau",
    name: "Entelgy",
    initials: "EN",
    role: { es: "WebMaster — Banco Itaú", en: "WebMaster — Itaú Bank" },
    roleShort: { es: "WebMaster (Itaú)", en: "WebMaster (Itaú)" },
    area: { es: "Portales web (Liferay)", en: "Web portals (Liferay)" },
    period: "2018 — 2020",
    team: { es: "Digital", en: "Digital" },
    banner: "/imagenes/entelgy-itau/imagen-banner.png",
    industry: {
      es: "Banca · Portales corporativos (Liferay)",
      en: "Banking · Corporate portals (Liferay)",
    },
    clients: ["Banca", "Portales web", "Microsites", "SEO"],
    projectsIntro: {
      es: "Como WebMaster del Banco Itaú administré el sitio con Liferay: diseño UX, actualización de contenido, maquetación de offer-pages y QA de microsites, verificando que cumplieran los estándares web de la compañía —responsive, la experiencia UX-UI planteada, el SEO adecuado y el manual de marca del cliente—. Reemplaza este texto por tu narrativa real.",
      en: "As WebMaster at Itaú Bank I managed the site with Liferay: UX design, content updates, offer-page markup and QA of microsites, verifying they met the company's web standards —responsive, the defined UX-UI experience, proper SEO and the client's brand guidelines—. Replace this text with your real narrative.",
    },
    story: {
      es: "Entelgy es una consultora de tecnología. En este rol administré los portales del Banco Itaú. Texto de ejemplo.",
      en: "Entelgy is a technology consultancy. In this role I managed Itaú Bank's portals. Placeholder text.",
    },
    profile: {
      es: "WebMaster encargado del diseño UX y la administración del sitio en Liferay. Texto de ejemplo.",
      en: "WebMaster in charge of UX design and Liferay site administration. Placeholder text.",
    },
    challenges: {
      es: "Mantener estándares web, SEO y marca en múltiples microsites. Texto de ejemplo.",
      en: "Keeping web standards, SEO and brand across multiple microsites. Placeholder text.",
    },
    projects: [
      {
        slug: "portal-itau",
        name: { es: "Portal del cliente Itaú", en: "Itaú customer portal" },
        client: { es: "Banco Itaú", en: "Itaú Bank" },
        role: { es: "WebMaster / UX", en: "WebMaster / UX" },
        year: "2019",
        tags: ["UX", "Liferay", "SEO"],
        challenge: {
          es: "Contenido desactualizado y navegación poco clara. Reemplaza por el desafío real.",
          en: "Outdated content and unclear navigation. Replace with the real challenge.",
        },
        process: {
          es: "Auditoría de contenido, maquetación y QA responsive. Texto de ejemplo.",
          en: "Content audit, markup and responsive QA. Placeholder text.",
        },
        before: { es: "Sitio inconsistente y lento de actualizar.", en: "Inconsistent, slow-to-update site." },
        after: { es: "Portal consistente y mantenible.", en: "Consistent, maintainable portal." },
        solution: {
          es: "Administración ordenada del sitio con estándares y marca. Reemplaza por tu solución.",
          en: "Orderly site administration with standards and brand. Replace with your solution.",
        },
        metrics: [
          { label: "SEO", value: "+22%", note: { es: "Visibilidad", en: "Visibility" } },
          { label: "Actualización", value: "-35%", note: { es: "Tiempo de publicación", en: "Publish time" } },
        ],
        featured: true,
        image: "/imagenes/entelgy-itau/trabajo-1.png",
        product: "Banco Itaú",
        category: { es: "Portales web", en: "Web portals" },
        highlight: { es: "Itaú", en: "Itaú" },
        cardSummary: {
          es: "Administración y mejora del portal del cliente con estándares web, SEO y manual de marca.",
          en: "Managing and improving the customer portal with web standards, SEO and brand guidelines.",
        },
        focus: { es: "Portales web", en: "Web portals" },
      },
      {
        slug: "microsites-campanas",
        name: { es: "Microsites de campañas", en: "Campaign microsites" },
        client: { es: "Banco Itaú", en: "Itaú Bank" },
        role: { es: "WebMaster / QA", en: "WebMaster / QA" },
        year: "2020",
        tags: ["Maquetación", "QA", "Responsive"],
        challenge: {
          es: "Publicar campañas rápido sin romper estándares. Reemplaza por el desafío real.",
          en: "Publishing campaigns fast without breaking standards. Replace with the real challenge.",
        },
        process: {
          es: "Maquetación de offer-pages y QA de responsive y marca. Texto de ejemplo.",
          en: "Offer-page markup and responsive/brand QA. Placeholder text.",
        },
        before: { es: "Campañas con errores de marca.", en: "Campaigns with brand errors." },
        after: { es: "Microsites verificados y consistentes.", en: "Verified, consistent microsites." },
        solution: {
          es: "Un proceso de QA para microsites de campaña. Reemplaza por tu solución.",
          en: "A QA process for campaign microsites. Replace with your solution.",
        },
        metrics: [
          { label: "Errores", value: "-40%", note: { es: "En publicación", en: "At publish" } },
          { label: "Entrega", value: "+25%", note: { es: "Velocidad", en: "Speed" } },
        ],
        featured: true,
        image: "/imagenes/entelgy-itau/trabajo-2.png",
        product: "Banco Itaú",
        category: { es: "Campañas", en: "Campaigns" },
        highlight: { es: "Microsites", en: "microsites" },
        cardSummary: {
          es: "Maquetación y QA de microsites de campaña, cuidando responsive, SEO y manual de marca.",
          en: "Markup and QA of campaign microsites, caring for responsive, SEO and brand guidelines.",
        },
        focus: { es: "Calidad y estándares", en: "Quality & standards" },
      },
    ],
  },
  {
    slug: "area-andina",
    name: "Fundación Universitaria del Área Andina",
    initials: "AA",
    role: { es: "Coordinador de Gestión de Contenidos", en: "Content Management Coordinator" },
    roleShort: { es: "Content Coordinator", en: "Content Coordinator" },
    area: { es: "Proyecto CANVAS", en: "CANVAS project" },
    period: "2017 — 2018",
    team: { es: "Producción / CANVAS", en: "Production / CANVAS" },
    banner: "/imagenes/area-andina/imagen-banner.png",
    industry: { es: "Educación · E-learning", en: "Education · E-learning" },
    clients: ["Educación", "E-learning", "Plataforma LMS", "OVA"],
    projectsIntro: {
      es: "Coordiné la gestión de contenidos del proyecto CANVAS: lideré el equipo de producción, planeé el trabajo con metodología Scrum, delegué tareas y cumplí los objetivos de la dirección, además de diseñar la estrategia de usabilidad y experiencia de usuario en la plataforma y en los OVA educativos. Reemplaza este texto por tu narrativa real.",
      en: "I coordinated content management for the CANVAS project: I led the production team, planned the work with Scrum, delegated tasks and met the direction's goals, and also designed the usability and user-experience strategy for the platform and educational learning objects (OVA). Replace this text with your real narrative.",
    },
    story: {
      es: "La Fundación Universitaria del Área Andina es una institución de educación superior en Colombia. Texto de ejemplo.",
      en: "Fundación Universitaria del Área Andina is a higher-education institution in Colombia. Placeholder text.",
    },
    profile: {
      es: "Coordinador de contenidos y estrategia de UX del proyecto CANVAS. Texto de ejemplo.",
      en: "Content coordinator and UX strategy lead for the CANVAS project. Placeholder text.",
    },
    challenges: {
      es: "Coordinar un equipo de producción y bajar la deserción en educación virtual. Texto de ejemplo.",
      en: "Coordinating a production team and lowering dropout in online education. Placeholder text.",
    },
    projects: [
      {
        slug: "plataforma-canvas",
        name: { es: "Plataforma CANVAS", en: "CANVAS platform" },
        client: { es: "Área Andina", en: "Área Andina" },
        role: { es: "Coordinador / UX", en: "Coordinator / UX" },
        year: "2018",
        tags: ["UX", "E-learning", "Scrum"],
        challenge: {
          es: "Mejorar la usabilidad de la plataforma educativa. Reemplaza por el desafío real.",
          en: "Improving the usability of the learning platform. Replace with the real challenge.",
        },
        process: {
          es: "Estrategia de UX, planeación Scrum y producción de contenidos. Texto de ejemplo.",
          en: "UX strategy, Scrum planning and content production. Placeholder text.",
        },
        before: { es: "Plataforma poco intuitiva.", en: "Not very intuitive platform." },
        after: { es: "Experiencia más clara y guiada.", en: "A clearer, guided experience." },
        solution: {
          es: "Una estrategia de usabilidad para la plataforma y sus OVA. Reemplaza por tu solución.",
          en: "A usability strategy for the platform and its learning objects. Replace with your solution.",
        },
        metrics: [
          { label: "Deserción", value: "-18%", note: { es: "Educación virtual", en: "Online education" } },
          { label: "Satisfacción", value: "+21%", note: { es: "Estudiantes", en: "Students" } },
        ],
        featured: true,
        image: "/imagenes/area-andina/trabajo-1.png",
        product: "Área Andina",
        category: { es: "E-learning", en: "E-learning" },
        highlight: { es: "CANVAS", en: "CANVAS" },
        cardSummary: {
          es: "Estrategia de usabilidad y experiencia para la plataforma educativa y sus objetos de aprendizaje.",
          en: "Usability and experience strategy for the learning platform and its learning objects.",
        },
        focus: { es: "UX y usabilidad", en: "UX & usability" },
      },
      {
        slug: "ova-educativos",
        name: { es: "Objetos virtuales de aprendizaje", en: "Virtual learning objects" },
        client: { es: "Área Andina", en: "Área Andina" },
        role: { es: "Coordinador de contenidos", en: "Content Coordinator" },
        year: "2017",
        tags: ["Contenidos", "OVA", "Producción"],
        challenge: {
          es: "Producir OVA consistentes y a tiempo. Reemplaza por el desafío real.",
          en: "Producing consistent OVA on time. Replace with the real challenge.",
        },
        process: {
          es: "Planeación del equipo, delegación de tareas y control de calidad. Texto de ejemplo.",
          en: "Team planning, task delegation and quality control. Placeholder text.",
        },
        before: { es: "Producción desalineada.", en: "Misaligned production." },
        after: { es: "Entregas semanales cumplidas.", en: "Weekly deliveries met." },
        solution: {
          es: "Un flujo de producción con Scrum para los OVA. Reemplaza por tu solución.",
          en: "A Scrum production flow for the learning objects. Replace with your solution.",
        },
        metrics: [
          { label: "Cumplimiento", value: "100%", note: { es: "Metas semanales", en: "Weekly goals" } },
          { label: "Producción", value: "+30%", note: { es: "Ritmo de entrega", en: "Delivery pace" } },
        ],
        featured: true,
        image: "/imagenes/area-andina/trabajo-2.png",
        product: "Área Andina",
        category: { es: "Producción", en: "Production" },
        highlight: { es: "aprendizaje", en: "learning" },
        cardSummary: {
          es: "Coordinación de la producción de objetos virtuales de aprendizaje con metodología Scrum.",
          en: "Coordinating the production of virtual learning objects with a Scrum methodology.",
        },
        focus: { es: "Gestión de contenidos", en: "Content management" },
      },
    ],
  },
  {
    slug: "entelgy-liferay",
    name: "Entelgy",
    initials: "EN",
    role: { es: "Desarrollador Liferay", en: "Liferay Developer" },
    roleShort: { es: "Liferay Developer", en: "Liferay Developer" },
    area: { es: "Plataformas bancarias", en: "Banking platforms" },
    period: "2017",
    team: { es: "Digital", en: "Digital" },
    banner: "/imagenes/entelgy-liferay/imagen-banner.png",
    industry: { es: "Banca · Plataformas Liferay", en: "Banking · Liferay platforms" },
    clients: ["Banca", "Liferay", "UX/UI", "Contenidos"],
    projectsIntro: {
      es: "Como Desarrollador Liferay diseñé y administré las plataformas de los bancos CorpBanca y Helm (hoy Itaú): wireframes y mockups, el look and feel del sitio, diseño centrado en el usuario (UX/UI) y la administración y migración de contenidos. Reemplaza este texto por tu narrativa real.",
      en: "As a Liferay Developer I designed and managed the platforms of CorpBanca and Helm banks (today Itaú): wireframes and mockups, the site's look and feel, user-centered design (UX/UI) and content administration and migration. Replace this text with your real narrative.",
    },
    story: {
      es: "Segunda etapa en Entelgy, enfocada en desarrollo y diseño sobre Liferay. Texto de ejemplo.",
      en: "A second stint at Entelgy, focused on Liferay development and design. Placeholder text.",
    },
    profile: {
      es: "Desarrollador Liferay con enfoque en UX/UI y contenidos. Texto de ejemplo.",
      en: "Liferay developer focused on UX/UI and content. Placeholder text.",
    },
    challenges: {
      es: "Diseñar y migrar plataformas bancarias sin perder consistencia. Texto de ejemplo.",
      en: "Designing and migrating banking platforms without losing consistency. Placeholder text.",
    },
    projects: [
      {
        slug: "plataforma-corpbanca-helm",
        name: { es: "Plataforma CorpBanca / Helm", en: "CorpBanca / Helm platform" },
        client: { es: "CorpBanca / Helm", en: "CorpBanca / Helm" },
        role: { es: "Desarrollador / UX", en: "Developer / UX" },
        year: "2017",
        tags: ["Liferay", "UX/UI", "Wireframes"],
        challenge: {
          es: "Diseñar el look and feel y flujos de la plataforma. Reemplaza por el desafío real.",
          en: "Designing the platform's look and feel and flows. Replace with the real challenge.",
        },
        process: {
          es: "Wireframes, mockups y diseño centrado en el usuario. Texto de ejemplo.",
          en: "Wireframes, mockups and user-centered design. Placeholder text.",
        },
        before: { es: "Plataforma sin identidad clara.", en: "Platform with no clear identity." },
        after: { es: "Look and feel definido y usable.", en: "Defined, usable look and feel." },
        solution: {
          es: "Una plataforma con UX/UI centrada en el usuario. Reemplaza por tu solución.",
          en: "A platform with user-centered UX/UI. Replace with your solution.",
        },
        metrics: [
          { label: "Usabilidad", value: "+24%", note: { es: "Tareas completadas", en: "Completed tasks" } },
          { label: "Consistencia", value: "+30%", note: { es: "Identidad visual", en: "Visual identity" } },
        ],
        featured: true,
        image: "/imagenes/entelgy-liferay/trabajo-1.png",
        product: "CorpBanca / Helm",
        category: { es: "Banca", en: "Banking" },
        highlight: { es: "Plataforma", en: "platform" },
        cardSummary: {
          es: "Diseño del look and feel y de los flujos de la plataforma bancaria sobre Liferay.",
          en: "Designing the look and feel and flows of the banking platform on Liferay.",
        },
        focus: { es: "UX/UI", en: "UX/UI" },
      },
      {
        slug: "migracion-contenidos",
        name: { es: "Migración de contenidos", en: "Content migration" },
        client: { es: "CorpBanca / Helm", en: "CorpBanca / Helm" },
        role: { es: "Desarrollador Liferay", en: "Liferay Developer" },
        year: "2017",
        tags: ["Liferay", "Contenidos", "Administración"],
        challenge: {
          es: "Migrar contenidos sin perder consistencia ni SEO. Reemplaza por el desafío real.",
          en: "Migrating content without losing consistency or SEO. Replace with the real challenge.",
        },
        process: {
          es: "Mapeo, administración y migración de contenidos. Texto de ejemplo.",
          en: "Content mapping, administration and migration. Placeholder text.",
        },
        before: { es: "Contenidos dispersos.", en: "Scattered content." },
        after: { es: "Contenidos migrados y ordenados.", en: "Migrated, organized content." },
        solution: {
          es: "Una migración ordenada y consistente. Reemplaza por tu solución.",
          en: "An orderly, consistent migration. Replace with your solution.",
        },
        metrics: [
          { label: "Contenidos", value: "100%", note: { es: "Migrados", en: "Migrated" } },
          { label: "Errores", value: "-30%", note: { es: "Post-migración", en: "Post-migration" } },
        ],
        featured: true,
        image: "/imagenes/entelgy-liferay/trabajo-2.png",
        product: "CorpBanca / Helm",
        category: { es: "Contenidos", en: "Content" },
        highlight: { es: "contenidos", en: "migration" },
        cardSummary: {
          es: "Administración y migración de contenidos entre plataformas manteniendo consistencia y SEO.",
          en: "Administering and migrating content across platforms while keeping consistency and SEO.",
        },
        focus: { es: "Contenidos", en: "Content" },
      },
    ],
  },
  {
    slug: "brain-media",
    name: "Brain Media",
    initials: "BM",
    role: { es: "Director de Producción Web", en: "Web Production Director" },
    roleShort: { es: "Web Production Director", en: "Web Production Director" },
    area: { es: "Producción digital", en: "Digital production" },
    period: "2016",
    team: { es: "Producción", en: "Production" },
    banner: "/imagenes/brain-media/imagen-banner.png",
    industry: {
      es: "Agencia digital · Marketing y producción",
      en: "Digital agency · Marketing & production",
    },
    clients: ["Marketing digital", "Sitios web", "Video", "Branding"],
    projectsIntro: {
      es: "Como Director de Producción Web lideré un equipo y produje para marcas como Gef, Davivienda, RedBull y Della Valentina, entre otras. Entregué soluciones en redes sociales (marketing digital), páginas web (SEO y SEM), producción de video e identidad corporativa. Reemplaza este texto por tu narrativa real.",
      en: "As Web Production Director I led a team and produced for brands such as Gef, Davivienda, RedBull and Della Valentina, among others. I delivered solutions in social media (digital marketing), websites (SEO and SEM), video production and corporate identity. Replace this text with your real narrative.",
    },
    story: {
      es: "Brain Media es una agencia digital. Dirigí la producción web para múltiples marcas. Texto de ejemplo.",
      en: "Brain Media is a digital agency. I directed web production for multiple brands. Placeholder text.",
    },
    profile: {
      es: "Director de producción con equipo a cargo, de la estrategia a la entrega. Texto de ejemplo.",
      en: "Production director with a team, from strategy to delivery. Placeholder text.",
    },
    challenges: {
      es: "Entregar producción de calidad para varias marcas en simultáneo. Texto de ejemplo.",
      en: "Delivering quality production for several brands at once. Placeholder text.",
    },
    projects: [
      {
        slug: "sitios-web-marcas",
        name: { es: "Sitios web para marcas", en: "Brand websites" },
        client: { es: "Gef · Davivienda · RedBull", en: "Gef · Davivienda · RedBull" },
        role: { es: "Director de producción", en: "Production Director" },
        year: "2016",
        tags: ["Web", "SEO/SEM", "Producción"],
        challenge: {
          es: "Producir sitios de marca con buen SEO y tiempos ajustados. Reemplaza por el desafío real.",
          en: "Producing on-brand websites with good SEO on tight timelines. Replace with the real challenge.",
        },
        process: {
          es: "Dirección de equipo, diseño y desarrollo SEO/SEM. Texto de ejemplo.",
          en: "Team direction, design and SEO/SEM development. Placeholder text.",
        },
        before: { es: "Presencia web dispersa.", en: "Scattered web presence." },
        after: { es: "Sitios consistentes por marca.", en: "Consistent per-brand sites." },
        solution: {
          es: "Producción web coordinada para varias marcas. Reemplaza por tu solución.",
          en: "Coordinated web production for several brands. Replace with your solution.",
        },
        metrics: [
          { label: "Marcas", value: "8+", note: { es: "Atendidas", en: "Served" } },
          { label: "SEO", value: "+26%", note: { es: "Tráfico orgánico", en: "Organic traffic" } },
        ],
        featured: true,
        image: "/imagenes/brain-media/trabajo-1.png",
        product: "Brain Media",
        category: { es: "Sitios web", en: "Websites" },
        highlight: { es: "web", en: "websites" },
        cardSummary: {
          es: "Producción y dirección de sitios web para marcas, con foco en SEO, SEM e identidad.",
          en: "Producing and directing brand websites, focused on SEO, SEM and identity.",
        },
        focus: { es: "Producción web", en: "Web production" },
      },
      {
        slug: "campanas-redes-sociales",
        name: { es: "Campañas en redes sociales", en: "Social media campaigns" },
        client: { es: "Marcas varias", en: "Various brands" },
        role: { es: "Director de producción", en: "Production Director" },
        year: "2016",
        tags: ["Marketing", "Video", "Branding"],
        challenge: {
          es: "Aumentar alcance e interacción en redes. Reemplaza por el desafío real.",
          en: "Increasing reach and engagement on social. Replace with the real challenge.",
        },
        process: {
          es: "Estrategia de marketing, video y contenido de marca. Texto de ejemplo.",
          en: "Marketing strategy, video and brand content. Placeholder text.",
        },
        before: { es: "Baja interacción.", en: "Low engagement." },
        after: { es: "Campañas con mejor alcance.", en: "Campaigns with better reach." },
        solution: {
          es: "Campañas de marketing digital con video e identidad. Reemplaza por tu solución.",
          en: "Digital marketing campaigns with video and identity. Replace with your solution.",
        },
        metrics: [
          { label: "Alcance", value: "+34%", note: { es: "Redes sociales", en: "Social media" } },
          { label: "Interacción", value: "+29%", note: { es: "Engagement", en: "Engagement" } },
        ],
        featured: true,
        image: "/imagenes/brain-media/trabajo-2.png",
        product: "Brain Media",
        category: { es: "Marketing", en: "Marketing" },
        highlight: { es: "redes sociales", en: "Social media" },
        cardSummary: {
          es: "Campañas de marketing digital en redes sociales con producción de video e identidad de marca.",
          en: "Digital marketing campaigns on social media with video production and brand identity.",
        },
        focus: { es: "Marketing digital", en: "Digital marketing" },
      },
    ],
  },
  {
    slug: "esap",
    name: "ESAP",
    initials: "ES",
    role: { es: "Diseñador Gráfico E-learning", en: "E-learning Graphic Designer" },
    roleShort: { es: "E-learning Designer", en: "E-learning Designer" },
    area: { es: "Capacitaciones", en: "Training" },
    period: "2015 — 2016",
    team: { es: "E-learning", en: "E-learning" },
    banner: "/imagenes/esap/imagen-banner.png",
    industry: { es: "Educación pública · E-learning", en: "Public education · E-learning" },
    clients: ["Educación", "E-learning", "Moodle", "Video educativo"],
    projectsIntro: {
      es: "En el área de capacitaciones de la ESAP diseñé cursos virtuales en HTML5, CSS y JS pensados en la experiencia del estudiante, bajando la deserción con cursos a la medida, ilustraciones y videos educativos y promocionales dentro de Moodle, con preproducción, producción y postproducción. Reemplaza este texto por tu narrativa real.",
      en: "In ESAP's training area I designed virtual courses in HTML5, CSS and JS focused on the student experience, lowering dropout with tailor-made courses, illustrations and educational/promotional videos inside Moodle, covering pre-production, production and post-production. Replace this text with your real narrative.",
    },
    story: {
      es: "La ESAP es la Escuela Superior de Administración Pública de Colombia. Texto de ejemplo.",
      en: "ESAP is Colombia's higher school of public administration. Placeholder text.",
    },
    profile: {
      es: "Diseñador gráfico e-learning enfocado en la experiencia del estudiante. Texto de ejemplo.",
      en: "E-learning graphic designer focused on the student experience. Placeholder text.",
    },
    challenges: {
      es: "Bajar la deserción en educación virtual con contenidos a la medida. Texto de ejemplo.",
      en: "Lowering dropout in online education with tailor-made content. Placeholder text.",
    },
    projects: [
      {
        slug: "cursos-virtuales",
        name: { es: "Cursos virtuales", en: "Virtual courses" },
        client: { es: "ESAP", en: "ESAP" },
        role: { es: "Diseñador e-learning", en: "E-learning Designer" },
        year: "2016",
        tags: ["HTML5", "Moodle", "E-learning"],
        challenge: {
          es: "Reducir la deserción en los cursos virtuales. Reemplaza por el desafío real.",
          en: "Reducing dropout in virtual courses. Replace with the real challenge.",
        },
        process: {
          es: "Diseño de cursos a la medida en HTML5/CSS/JS dentro de Moodle. Texto de ejemplo.",
          en: "Tailor-made course design in HTML5/CSS/JS inside Moodle. Placeholder text.",
        },
        before: { es: "Cursos genéricos y poco atractivos.", en: "Generic, unengaging courses." },
        after: { es: "Cursos a la medida e interactivos.", en: "Tailor-made, interactive courses." },
        solution: {
          es: "Cursos virtuales centrados en el estudiante. Reemplaza por tu solución.",
          en: "Student-centered virtual courses. Replace with your solution.",
        },
        metrics: [
          { label: "Deserción", value: "-20%", note: { es: "Educación virtual", en: "Online education" } },
          { label: "Finalización", value: "+27%", note: { es: "Cursos completados", en: "Completed courses" } },
        ],
        featured: true,
        image: "/imagenes/esap/trabajo-1.png",
        product: "ESAP",
        category: { es: "E-learning", en: "E-learning" },
        highlight: { es: "virtuales", en: "Virtual" },
        cardSummary: {
          es: "Cursos virtuales a la medida en HTML5 dentro de Moodle, centrados en la experiencia del estudiante.",
          en: "Tailor-made virtual courses in HTML5 inside Moodle, centered on the student experience.",
        },
        focus: { es: "Experiencia del estudiante", en: "Student experience" },
      },
      {
        slug: "videos-educativos",
        name: { es: "Videos educativos", en: "Educational videos" },
        client: { es: "ESAP", en: "ESAP" },
        role: { es: "Diseñador / Motion", en: "Designer / Motion" },
        year: "2015",
        tags: ["Video", "Motion", "Producción"],
        challenge: {
          es: "Explicar temas complejos con video claro. Reemplaza por el desafío real.",
          en: "Explaining complex topics with clear video. Replace with the real challenge.",
        },
        process: {
          es: "Preproducción, grabación de autores, motion y postproducción. Texto de ejemplo.",
          en: "Pre-production, author recording, motion and post-production. Placeholder text.",
        },
        before: { es: "Contenido solo textual.", en: "Text-only content." },
        after: { es: "Videos claros y didácticos.", en: "Clear, didactic videos." },
        solution: {
          es: "Videos educativos y promocionales con motion graphics. Reemplaza por tu solución.",
          en: "Educational and promotional videos with motion graphics. Replace with your solution.",
        },
        metrics: [
          { label: "Comprensión", value: "+31%", note: { es: "Temas clave", en: "Key topics" } },
          { label: "Producción", value: "40+", note: { es: "Videos", en: "Videos" } },
        ],
        featured: true,
        image: "/imagenes/esap/trabajo-2.png",
        product: "ESAP",
        category: { es: "Video", en: "Video" },
        highlight: { es: "educativos", en: "Educational" },
        cardSummary: {
          es: "Videos educativos y promocionales con motion graphics, de la preproducción a la postproducción.",
          en: "Educational and promotional videos with motion graphics, from pre- to post-production.",
        },
        focus: { es: "Video educativo", en: "Educational video" },
      },
    ],
  },
  {
    slug: "manuela-beltran",
    name: "Universidad Manuela Beltrán",
    initials: "MB",
    role: { es: "Diseñador Gráfico", en: "Graphic Designer" },
    roleShort: { es: "Graphic Designer", en: "Graphic Designer" },
    area: { es: "Productos virtuales", en: "Virtual products" },
    period: "2011 — 2015",
    team: { es: "Diseño", en: "Design" },
    banner: "/imagenes/manuela-beltran/imagen-banner.png",
    industry: { es: "Educación · Diseño y e-commerce", en: "Education · Design & e-commerce" },
    clients: ["Educación", "E-learning", "E-commerce", "Marketing"],
    projectsIntro: {
      es: "Como diseñador gráfico trabajé en productos virtuales, e-learning, páginas web, piezas para comercio electrónico, mailing y marketing digital, entre otros. Reemplaza este texto por tu narrativa real.",
      en: "As a graphic designer I worked on virtual products, e-learning, websites, e-commerce pieces, mailing and digital marketing, among others. Replace this text with your real narrative.",
    },
    story: {
      es: "La Universidad Manuela Beltrán es una institución de educación superior en Colombia. Texto de ejemplo.",
      en: "Universidad Manuela Beltrán is a higher-education institution in Colombia. Placeholder text.",
    },
    profile: {
      es: "Diseñador gráfico en productos digitales y e-learning. Texto de ejemplo.",
      en: "Graphic designer working on digital products and e-learning. Placeholder text.",
    },
    challenges: {
      es: "Producir piezas digitales variadas manteniendo la marca. Texto de ejemplo.",
      en: "Producing varied digital pieces while keeping the brand. Placeholder text.",
    },
    projects: [
      {
        slug: "piezas-ecommerce",
        name: { es: "Piezas para e-commerce", en: "E-commerce pieces" },
        client: { es: "Universidad Manuela Beltrán", en: "Universidad Manuela Beltrán" },
        role: { es: "Diseñador gráfico", en: "Graphic Designer" },
        year: "2015",
        tags: ["E-commerce", "Diseño", "Marketing"],
        challenge: {
          es: "Piezas de e-commerce que conviertan y respeten la marca. Reemplaza por el desafío real.",
          en: "E-commerce pieces that convert and respect the brand. Replace with the real challenge.",
        },
        process: {
          es: "Diseño de piezas, mailing y material promocional. Texto de ejemplo.",
          en: "Design of pieces, mailing and promotional material. Placeholder text.",
        },
        before: { es: "Piezas inconsistentes.", en: "Inconsistent pieces." },
        after: { es: "Piezas alineadas a la marca.", en: "On-brand pieces." },
        solution: {
          es: "Piezas de e-commerce consistentes y efectivas. Reemplaza por tu solución.",
          en: "Consistent, effective e-commerce pieces. Replace with your solution.",
        },
        metrics: [
          { label: "Conversión", value: "+18%", note: { es: "Campañas", en: "Campaigns" } },
          { label: "Consistencia", value: "+40%", note: { es: "Identidad", en: "Identity" } },
        ],
        featured: true,
        image: "/imagenes/manuela-beltran/trabajo-1.png",
        product: "Universidad Manuela Beltrán",
        category: { es: "E-commerce", en: "E-commerce" },
        highlight: { es: "e-commerce", en: "E-commerce" },
        cardSummary: {
          es: "Piezas para comercio electrónico, mailing y marketing digital alineadas a la marca.",
          en: "E-commerce, mailing and digital-marketing pieces aligned to the brand.",
        },
        focus: { es: "Diseño gráfico", en: "Graphic design" },
      },
      {
        slug: "material-elearning",
        name: { es: "Material e-learning", en: "E-learning material" },
        client: { es: "Universidad Manuela Beltrán", en: "Universidad Manuela Beltrán" },
        role: { es: "Diseñador gráfico", en: "Graphic Designer" },
        year: "2013",
        tags: ["E-learning", "Web", "Diseño"],
        challenge: {
          es: "Material educativo virtual claro y atractivo. Reemplaza por el desafío real.",
          en: "Clear, engaging virtual educational material. Replace with the real challenge.",
        },
        process: {
          es: "Diseño de productos virtuales y páginas web. Texto de ejemplo.",
          en: "Design of virtual products and websites. Placeholder text.",
        },
        before: { es: "Material poco atractivo.", en: "Unengaging material." },
        after: { es: "Material claro y didáctico.", en: "Clear, didactic material." },
        solution: {
          es: "Material e-learning y web centrado en el estudiante. Reemplaza por tu solución.",
          en: "Student-centered e-learning and web material. Replace with your solution.",
        },
        metrics: [
          { label: "Uso", value: "+22%", note: { es: "Material educativo", en: "Educational material" } },
          { label: "Satisfacción", value: "+19%", note: { es: "Estudiantes", en: "Students" } },
        ],
        featured: true,
        image: "/imagenes/manuela-beltran/trabajo-2.png",
        product: "Universidad Manuela Beltrán",
        category: { es: "E-learning", en: "E-learning" },
        highlight: { es: "e-learning", en: "E-learning" },
        cardSummary: {
          es: "Material e-learning y páginas web para productos virtuales, centrados en el estudiante.",
          en: "E-learning material and websites for virtual products, centered on the student.",
        },
        focus: { es: "E-learning", en: "E-learning" },
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
  settings: {
    title: { es: "Ajustes", en: "Settings" },
    language: { es: "Idioma", en: "Language" },
    theme: { es: "Apariencia", en: "Appearance" },
    light: { es: "Claro", en: "Light" },
    dark: { es: "Oscuro", en: "Dark" },
  },
  about: {
    nav: { es: "Sobre el proyecto", en: "About this project" },
    body: {
      es: "Este sitio es un proyecto propio diseñado y construido con una mentalidad AI First, una muestra de cómo transformo experiencias, proyectos e ideas en productos digitales intuitivos, accesibles y bien ejecutados.",
      en: "This site is a personal project designed and built with an AI First mindset, a showcase of how I turn experiences, projects and ideas into intuitive, accessible and well-executed digital products.",
    },
    cta: { es: "Ver hoja de vida", en: "View resume" },
    close: { es: "Cerrar", en: "Close" },
  },
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
    backPortfolio: { es: "Volver al portafolio", en: "Back to portfolio" },
    portfolioLabel: { es: "Portafolio", en: "Portfolio" },
    role: { es: "Rol", en: "Role" },
    team: { es: "Equipo", en: "Team" },
    period: { es: "Periodo", en: "Period" },
    projectsAt: { es: "Proyectos en", en: "Projects at" },
    featured: { es: "Proyectos destacados", en: "Featured Projects" },
    moreProjects: { es: "Siguientes proyectos", en: "More projects" },
    workLabel: { es: "Mi trabajo", en: "My work" },
    sectors: { es: "Sectores", en: "Sectors" },
    projectsTitle: { es: "Proyectos", en: "Projects" },
    focus: { es: "Enfoque", en: "Focus" },
    viewCase: { es: "Ver caso de estudio", en: "View Case Study" },
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
