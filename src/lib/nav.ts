export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/chapters", label: "Chapters" },
  { href: "/conclave-2028", label: "Conclave 2028" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];
