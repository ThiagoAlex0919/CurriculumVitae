"use client";

import { useI18n } from "@/lib/i18n";
import { ui, profile } from "@/lib/content";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 12 }}>
        <span>
          © {new Date().getFullYear()} {profile.name}. {t(ui.footer.rights)}
        </span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </div>
    </footer>
  );
}
