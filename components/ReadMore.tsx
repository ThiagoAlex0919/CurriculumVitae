"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { ui } from "@/lib/content";

export default function ReadMore({
  text,
  limit = 230,
  className,
}: {
  text: string;
  limit?: number;
  className?: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

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
