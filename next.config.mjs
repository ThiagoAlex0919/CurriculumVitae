/** @type {import('next').NextConfig} */

// Cache-Control para assets estáticos de /public. Por defecto Vercel
// los sirve sin caché (max-age=0, must-revalidate); aquí los marcamos
// inmutables durante 1 año para que el navegador/CDN no vuelva a
// pedirlos. Si en el futuro reemplazas una imagen, cambia su nombre
// (o añade ?v=2) para invalidar la caché.
const IMMUTABLE = "public, max-age=31536000, immutable";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  images: {
    // Sirve formatos modernos automáticamente en cualquier <Image>.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        source: "/:path*.(webp|avif|png|jpg|jpeg|gif|svg|ico)",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/ilustraciones/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/imagenes/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/logos/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
    ];
  },
};

export default nextConfig;
