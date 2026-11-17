/**
 * Sample client brands. These companies are fictional and drawn here as SVG.
 * Replace with real client logos (with their permission) before launch.
 */

export type Brand = {
  id: string;
  name: string;
  tag: string;
  color: string;
  mark: React.ReactNode;
};

const Wheat = (
  <g fill="currentColor">
    <rect x="15" y="6" width="2" height="22" rx="1" />
    <ellipse cx="12" cy="10" rx="3" ry="5" transform="rotate(-30 12 10)" />
    <ellipse cx="20" cy="10" rx="3" ry="5" transform="rotate(30 20 10)" />
    <ellipse cx="12" cy="17" rx="3" ry="5" transform="rotate(-30 12 17)" />
    <ellipse cx="20" cy="17" rx="3" ry="5" transform="rotate(30 20 17)" />
    <ellipse cx="16" cy="5" rx="2.5" ry="4" />
  </g>
);

const Bulb = (
  <g fill="currentColor">
    <path d="M16 4c1 4 9 8 9 15a9 9 0 0 1-18 0c0-7 8-11 9-15z" />
    <path d="M16 12v14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 15c-1 4-1 7 1 10M20 15c1 4 1 7-1 10" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </g>
);

const Sprout = (
  <g fill="currentColor">
    <path d="M16 28V15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M16 16C16 9 11 5 4 5c0 7 5 11 12 11z" />
    <path d="M16 13c0-5 4-8 11-8 0 5-4 8-11 8z" opacity="0.7" />
  </g>
);

const Crystal = (
  <g fill="currentColor">
    <path d="M3 27 12 9l6 11 3-5 8 12z" />
    <path d="M12 9l2.5 5h-5z" fill="#fff" opacity="0.6" />
  </g>
);

const Cube = (
  <g fill="currentColor">
    <path d="M16 3 28 9.5v13L16 29 4 22.5v-13z" opacity="0.35" />
    <path d="M16 3 28 9.5 16 16 4 9.5z" />
    <path d="M16 16v13L4 22.5v-13z" opacity="0.7" />
  </g>
);

const Bricks = (
  <g fill="currentColor">
    <rect x="3" y="21" width="12" height="7" rx="1.5" />
    <rect x="17" y="21" width="12" height="7" rx="1.5" />
    <rect x="9" y="12" width="14" height="7" rx="1.5" opacity="0.75" />
    <rect x="12" y="3" width="8" height="7" rx="1.5" opacity="0.5" />
  </g>
);

export const BRANDS: Brand[] = [
  { id: "oltinsoy", name: "Oltinsoy", tag: "Un kombinati", color: "#B7791F", mark: Wheat },
  { id: "sayhun", name: "Sayhun Agro", tag: "Eksport", color: "#C2410C", mark: Bulb },
  { id: "navbahor", name: "Navbahor", tag: "Yem zavodi", color: "#0F766E", mark: Sprout },
  { id: "qumtepa", name: "Qumtepa", tag: "Tuz konlari", color: "#1D4ED8", mark: Crystal },
  { id: "bahor", name: "Bahor Shakar", tag: "Rafinad", color: "#BE185D", mark: Cube },
  { id: "chinor", name: "Chinor", tag: "Qurilish", color: "#4B5563", mark: Bricks },
];

export const brand = (id: string) => BRANDS.find((b) => b.id === id)!;

/** Logo lockup: mark plus wordmark. `colored` shows the brand colour, otherwise it inherits currentColor. */
export function BrandLogo({ b, colored = false, size = "md" }: { b: Brand; colored?: boolean; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  return (
    <span className="inline-flex items-center gap-2" style={colored ? { color: b.color } : undefined} aria-label={`${b.name} logo`} role="img">
      <svg viewBox="0 0 32 32" className={`${box} shrink-0`} aria-hidden>
        {b.mark}
      </svg>
      <span className="flex flex-col" aria-hidden>
        <span className={`${size === "sm" ? "body-4" : "body-1"} font-bold tracking-tight`}>{b.name}</span>
        <span className="caption-5 uppercase tracking-widest opacity-70">{b.tag}</span>
      </span>
    </span>
  );
}
