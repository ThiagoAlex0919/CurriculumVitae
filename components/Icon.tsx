import React from "react";

type IconProps = { name: string; size?: number };

const paths: Record<string, React.ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5M5 10v10h14V10" />,
  work: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  lab: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9" />,
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  chevron: <path d="m15 6-6 6 6 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  whatsapp: (
    <path d="M20 12a8 8 0 0 1-11.9 7L4 20l1-4.1A8 8 0 1 1 20 12ZM9 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2s.9 2.3 1 2.5c.1.2 1.8 3 4.5 4 .7.3 1.3.5 1.7.3.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2-.1-.1-.3-.2-.6-.4-.3-.2-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.7.9-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.8-.7-1.3-1.5-1.4-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.1-.4-.3-.4-.5-.4Z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7" />
    </>
  ),
  behance: (
    <path d="M2 8h5.5a2.2 2.2 0 0 1 0 4.4H2V8Zm0 4.4h6a2.3 2.3 0 0 1 0 4.6H2v-4.6ZM15 9.5h5M14 15.5c.4 1.2 1.5 2 3 2a3 3 0 0 0 3-3v-.3h-6c0-1.7 1.3-3 3-3s3 1.3 3 3" />
  ),
  figma: (
    <>
      <circle cx="12" cy="9.5" r="2.7" />
      <path d="M9.3 3.5h2.7v6h-2.7a3 3 0 0 1 0-6ZM12 3.5h2.7a3 3 0 0 1 0 6H12v-6ZM9.3 9.5H12v6H9.3a3 3 0 0 1 0-6ZM9.3 15.5H12v2.6a3 3 0 1 1-2.7-2.6Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M16.5 7.5v.01" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export default function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  );
}
