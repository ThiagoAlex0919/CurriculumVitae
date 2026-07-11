import React from "react";

type IconProps = { name: string; size?: number; weight?: "regular" | "bold" };

// Mapa a Phosphor Icons (https://phosphoricons.com)
const map: Record<string, string> = {
  home: "ph-house",
  work: "ph-briefcase",
  lab: "ph-flask",
  contact: "ph-phone",
  resume: "ph-file-text",
  career: "ph-rocket-launch",
  portfolio: "ph-briefcase",
  connect: "ph-phone",
  menu: "ph-list",
  mail: "ph-envelope-simple",
  whatsapp: "ph-whatsapp-logo",
  pin: "ph-map-pin",
  behance: "ph-behance-logo",
  figma: "ph-figma-logo",
  instagram: "ph-instagram-logo",
  linkedin: "ph-linkedin-logo",
  star: "ph-star",
  x: "ph-x",
  chevron: "ph-caret-left",
  "chevron-down": "ph-caret-down",
  arrow: "ph-arrow-right",
  phone: "ph-phone",
  plus: "ph-plus",
  minus: "ph-minus",
};

export default function Icon({ name, size = 20, weight = "regular" }: IconProps) {
  const cls = map[name] ?? "ph-circle";
  const prefix = weight === "bold" ? "ph-bold" : "ph";
  return (
    <i
      className={`${prefix} ${cls}`}
      style={{ fontSize: size, lineHeight: 1, display: "inline-flex" }}
      aria-hidden="true"
    />
  );
}
