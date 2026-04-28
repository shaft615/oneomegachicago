export type ChapterType = "undergraduate" | "graduate";

export interface Chapter {
  /** URL-safe identifier — used for routing and React keys */
  id: string;
  /** Full Greek chapter name, e.g. "Alpha Kappa Kappa" */
  name: string;
  /** Short letter abbreviation displayed on the ChapterCard, e.g. "AKK" */
  letters: string;
  /** Graduate (alumni) or Undergraduate (collegiate) chapter */
  type: ChapterType;
  /** City / area of operation within the Chicagoland region */
  area: string;
  /** Year chartered, when known */
  chartered?: number;
  /** Public-facing meeting location, when published */
  meetingLocation?: string;
  /** Chapter website URL, when available */
  website?: string;
  /** Public contact address, when available */
  email?: string;
  /** Short marketing blurb shown on cards / chapter directory */
  description?: string;
  /** True when chapter info is still being collected — card renders a "Details coming soon" state */
  placeholder?: boolean;
}

/**
 * 13 Chicagoland chapters of Omega Psi Phi Fraternity, Inc.
 * coordinated by One Omega Foundation, Inc.
 *
 * 3 chapters identified by name; remaining 10 are placeholders
 * pending verified detail from the Foundation. Update each entry's
 * `placeholder: false` once chartering, area, and contact data are confirmed.
 */
export const chapters: Chapter[] = [
  {
    id: "alpha-kappa-kappa",
    name: "Alpha Kappa Kappa",
    letters: "AKK",
    type: "graduate",
    area: "Chicago, IL",
    description:
      "Graduate chapter serving the broader Chicago metropolitan area through scholarship, mentorship, and civic engagement.",
  },
  {
    id: "epsilon-eta",
    name: "Epsilon Eta",
    letters: "EE",
    type: "graduate",
    area: "Chicagoland",
    description:
      "Long-standing graduate chapter contributing to community uplift, voter education, and youth development across Chicagoland.",
  },
  {
    id: "rho-tau",
    name: "Rho Tau",
    letters: "PT",
    type: "graduate",
    area: "Chicagoland",
    description:
      "Graduate chapter advancing the Cardinal Principles of Manhood, Scholarship, Perseverance, and Uplift in service of the community.",
  },
  {
    id: "chapter-04",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "graduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-05",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "graduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-06",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "graduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-07",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "graduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-08",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "graduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-09",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "undergraduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-10",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "undergraduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-11",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "undergraduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-12",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "undergraduate",
    area: "Chicagoland",
    placeholder: true,
  },
  {
    id: "chapter-13",
    name: "Chapter Name TBA",
    letters: "TBA",
    type: "undergraduate",
    area: "Chicagoland",
    placeholder: true,
  },
];

export const TOTAL_CHAPTERS = chapters.length;

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getChaptersByType(type: ChapterType): Chapter[] {
  return chapters.filter((c) => c.type === type);
}
