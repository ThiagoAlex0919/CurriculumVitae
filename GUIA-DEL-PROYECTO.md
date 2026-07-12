# Guía del proyecto — hojadevida

Documento de referencia para trabajar el sitio por secciones, en chats separados,
sin dañar lo ya construido. Léelo (o pásalo) al inicio de cada chat nuevo.

---

## 1. Qué es

Sitio web personal (hoja de vida + portafolio) de **Alexander Romero Ávila**.

- **Stack:** Next.js 14 + React + TypeScript. Sin base de datos.
- **Idiomas:** bilingüe ES/EN (selector en el header).
- **Despliegue:** Vercel, conectado al repo de GitHub `ThiagoAlex0919/CurriculumVitae`.
  Cada `git push` a `main` publica automáticamente.

### Flujo para publicar (siempre desde tu Terminal)

```bash
cd ~/Claude/Projects/hojadevida
git add -A
git commit -m "descripción del cambio"
git push
```

> El asistente escribe el código y verifica los tipos (`tsc`); **el git lo corres tú**
> en tu Terminal (ahí tienes credenciales y permisos).

---

## 2. Mapa de archivos

```
hojadevida/
├── app/
│   ├── layout.tsx            Raíz: fuentes (Poppins + Phosphor), metadata, AppShell
│   ├── globals.css           ⭐ TODOS los estilos + tokens de color/tipografía
│   ├── page.tsx              ⭐ INICIO = sección "Resumen / Hoja de vida"
│   ├── trayectoria/          Sección PORTAFOLIO (se trabajará aparte, ver §6)
│   │   ├── page.tsx
│   │   └── [empresa]/page.tsx  y  [empresa]/[proyecto]/page.tsx
│   ├── laboratorio/page.tsx  Sección LAB
│   └── contacto/page.tsx     Sección CONTACTO
├── components/
│   ├── AppShell.tsx          Layout global (sidebar + contenido + nav móvil)
│   ├── Sidebar.tsx           Menú lateral (desktop)
│   ├── MobileNav.tsx         Barra inferior (móvil)
│   ├── PageHeader.tsx        Header: nombre de página (izq.) + idioma (der.)
│   ├── Accordion.tsx         Secciones plegables del home
│   ├── ExperienceCard.tsx    Tarjeta de experiencia laboral
│   ├── ReadMore.tsx          "ver más" en línea
│   └── Icon.tsx              Iconos (Phosphor)
├── lib/
│   ├── content.ts            ⭐ TODO el contenido/textos (bilingüe)
│   └── i18n.tsx              Sistema de idioma ES/EN
├── public/
│   ├── foto.png              Tu foto
│   └── logos/                empresa-1.png … empresa-8.png (de abajo hacia arriba)
├── vercel.json               Fija el framework Next.js en Vercel
└── package.json
```

> `components/JobCard.tsx`, `TopBar.tsx` y `Footer.tsx` quedaron **obsoletos** (ya no se
> usan). No los borres sin verificar, pero no forman parte del diseño actual.

---

## 3. Dónde edito cada cosa

Casi todo el **contenido** vive en `lib/content.ts` (bilingüe: cada texto es `{ es, en }`).

| Quiero cambiar…                     | Archivo / lugar |
|-------------------------------------|-----------------|
| Mi nombre, rol, resumen, contactos, redes | `content.ts` → `profile` |
| Mi foto                             | reemplazar `public/foto.png` |
| Experiencia laboral (empresas, funciones, descripciones) | `content.ts` → `experience` |
| Logos de empresas                   | `public/logos/empresa-N.png` |
| Formación académica                 | `content.ts` → `education` |
| Premio / reconocimiento             | `content.ts` → `awards` |
| Frases                              | `content.ts` → `quotes` |
| Skills (píldoras y modal)           | `content.ts` → `skills` y `topSkills` |
| Otros estudios                      | `content.ts` → `otherStudies` |
| Referencias                         | `content.ts` → `referencesPersonal` / `referencesFamily` |
| Textos de menú, botones, títulos    | `content.ts` → `sideNav`, `ui` |
| Estructura visual del home          | `app/page.tsx` |
| Colores, tipografía, estilos        | `app/globals.css` (los colores están en `:root`, arriba) |
| Portafolio (Trayectoria)            | `app/trayectoria/…` + `content.ts` → `companies` |

---

## 4. Sistema de diseño (tokens)

Definidos en `:root`, al inicio de `app/globals.css`:

```
--bg: #f1f2f3          fondo de la página
--card: #ffffff        tarjetas / paneles
--ink: #02425f         títulos (teal oscuro)
--ink-soft: #494f51    párrafos
--ink-mute: #919ca1    texto secundario
--line: #e6e9ea        bordes 1px
--surface-2: #f4f6f7   sub-tarjetas
--accent: #0588c2      azul de marca (marcador, badges)
--accent-dark: #02425f iconos del sidebar
--accent-tint: #d6ecf8 fondo tenue de iconos
```

- **Tipografía:** Poppins (todo el sitio). Iconos: **Phosphor Icons**.
- Títulos de sección 18px, cuerpo 14px.
- **Regla de oro:** si tocas un token en `:root`, afecta a TODO el sitio. Para cambios de
  una sola sección, usa clases propias en vez de modificar los tokens globales.

---

## 5. Cómo trabajar en chats separados (sin romper nada)

Cada sección está **aislada por ruta**, así que puedes trabajarlas por separado.
Al abrir un chat nuevo, di algo como:

> "Trabajemos **solo** la sección X del proyecto hojadevida. No modifiques otras secciones."

Y ten a mano qué archivos toca cada una:

- **Resumen / Hoja de vida** → `app/page.tsx` + componentes del home
  (`Accordion`, `ExperienceCard`, `ReadMore`, `PageHeader`) + `content.ts`
  (`profile`, `experience`, `education`, `awards`, `quotes`, `otherStudies`,
  `references*`, `skills`, `topSkills`). **Estado: terminada por ahora.**
- **Trayectoria / Portafolio** → `app/trayectoria/…` + `content.ts` → `companies`. Ver §6.
- **Laboratorio** → `app/laboratorio/page.tsx` + `content.ts` → `lab`.
- **Contacto** → `app/contacto/page.tsx` + `content.ts` → `profile` (contactos).

**Buenas prácticas para no dañar lo hecho:**

1. Antes de cambiar algo compartido (`globals.css` tokens, `AppShell`, `Sidebar`,
   `content.ts` de otras secciones), confírmalo — esos archivos afectan a todo el sitio.
2. Revisa `git diff` antes de hacer commit para ver exactamente qué cambió.
3. Haz commits pequeños y descriptivos por sección (ej. `"trayectoria: nuevo hero"`).
4. Si algo se rompe, `git checkout -- <archivo>` revierte ese archivo al último commit.

---

## 6. Trayectoria con un estilo web distinto (aislado)

La sección de portafolio (`/trayectoria`) tendrá **otro estilo visual**. Como ya vive en
su propia ruta, su contenido no afecta al home. Para que su **estilo** tampoco choque con
el resto, hay dos caminos:

- **Opción A (recomendada, simple):** usar un **prefijo de clases propio** (por ejemplo
  `tray-...`) para todo lo de esa sección, y poner esos estilos en un bloque separado
  (o un archivo `app/trayectoria/trayectoria.css` importado solo ahí). Así no tocas los
  estilos del home.
- **Opción B (aislamiento total):** darle a `/trayectoria` su **propio layout** con un
  route group, para que no herede el `AppShell`/sidebar y puedas construir una experiencia
  completamente diferente.

Cuando abras el chat de Trayectoria, dilo así:
> "Vamos a rediseñar `/trayectoria` con un estilo distinto. Aíslalo con clases/estilos
> propios (o su propio layout) para no afectar el home."

---

## 7. Estado actual (a la fecha)

- ✅ **Resumen / Hoja de vida**: terminada (perfil, experiencia con tarjetas, formación,
  otros estudios, referencias, skills en modal, header con idioma, sidebar, nav móvil,
  modales al 80%).
- ⏳ **Pendientes menores del home:** color de marca definitivo (hoy azul `#0588c2`),
  y confirmar que estén subidos `public/foto.png` y `public/logos/empresa-1..8.png`.
- 🔜 **Trayectoria / Portafolio:** por rediseñar con estilo propio (siguiente frente).
- 🔜 **Laboratorio y Contacto:** con estructura base, contenido por afinar.
