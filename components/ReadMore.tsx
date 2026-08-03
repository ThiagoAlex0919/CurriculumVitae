"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { ui } from "@/lib/content";

export default function ReadMore({
  text,
  limit = 230,
  className,
  openOnDesktop = false,
}: {
  text: string;
  limit?: number;
  className?: string;
  openOnDesktop?: boolean;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // En desktop arranca abierto (gana espacio); en móvil sigue colapsado.
    if (openOnDesktop && window.matchMedia("(min-width: 900px)").matches) {
      setOpen(true);
    }
  }, [openOnDesktop]);

  if (text.length <= limit) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className}>
      {open ? text + " " : text.slice(0, limit).trimEnd() + "… "}
      <button className="more-inline" onClick={() => setOpen((o) => !o)}>
        {open ? t(ui.home.readLess) : t(ui.home.readMore)}
      </button>
    </p>
  );
}
