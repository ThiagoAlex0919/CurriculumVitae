# Hoja de vida & portafolio — Alexander Romero

Sitio personal en **Next.js + React** (bilingüe ES/EN, sin base de datos).
Estilo editorial minimalista. Listo para desplegar en **Vercel**.

## Estructura

- `app/page.tsx` — Inicio (perfil / hoja de vida)
- `app/trayectoria/` — lista de empresas → detalle de empresa → detalle de proyecto
- `app/laboratorio/` — investigaciones y experimentos con IA
- `app/contacto/` — datos de contacto
- `lib/content.ts` — **todo el contenido del sitio** (edita aquí)
- `lib/i18n.tsx` — sistema de idioma ES/EN
- `components/` — navegación y pie de página
- `app/globals.css` — estilos

## Editar el contenido

Todo el texto vive en `lib/content.ts`. Cada campo tiene dos idiomas:

```ts
role: { es: "Diseñador UX/UI Senior", en: "Senior UX/UI Designer" }
```

Reemplaza los placeholders por tu información real: perfil, skills, empresas,
proyectos (con desafío, proceso, antes/después, solución y métricas CES/ASP/NPS)
y laboratorio. Para añadir una empresa o proyecto, copia un bloque existente
dentro de `companies` y cambia el `slug` (debe ser único, sin espacios).

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Desplegar en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a https://vercel.com, "Add New… → Project" e importa el repo.
3. Vercel detecta Next.js automáticamente — no cambies nada, dale **Deploy**.
4. En segundos tendrás una URL pública. Cada push a `main` redepliega solo.

Alternativa sin GitHub: instala la CLI (`npm i -g vercel`) y ejecuta `vercel`
dentro de esta carpeta.
