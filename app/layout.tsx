import type { Metadata, Viewport } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Alexander Romero — UX/UI Designer",
  description:
    "Portafolio y hoja de vida de Alexander Romero, diseñador UX/UI con expertise en IA.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nProvider>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
