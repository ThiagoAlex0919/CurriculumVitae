import { redirect } from "next/navigation";

// "Acerca del proyecto" ahora es un modal (ver componente Settings / AboutModal).
// Esta ruta queda solo por compatibilidad y redirige a la hoja de vida.
export default function AcercaPage() {
  redirect("/hoja-de-vida");
}
