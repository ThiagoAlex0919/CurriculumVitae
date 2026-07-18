import { redirect } from "next/navigation";

/* El index principal es la Trayectoria (career journey).
   La hoja de vida vive ahora en /hoja-de-vida */
export default function Home() {
  redirect("/experiencia");
}
