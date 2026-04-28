export type EventStatus = "upcoming" | "past";

export interface Event {
  id: string;
  title: string;
  host: string;
  category: string;
  /** Display label for the date, e.g. "Friday, June 20, 2025" */
  dateLabel: string;
  /** Display label for the time window, optional */
  timeLabel?: string;
  location: string;
  /** Body paragraphs for the event detail card */
  description: string[];
  /** Flyer image path (under /public) */
  flyer?: string;
  /** Single-line emphasized callout shown as a banner on the card */
  callout?: string;
  /** Free-text registration note */
  registration?: string;
  status: EventStatus;
  /** Feature flag — at most one featured upcoming event surfaces on the home page and at the top of /events */
  featured?: boolean;
}

export const events: Event[] = [
  {
    id: "fathers-day-cookowt-2026",
    title: "3rd Annual Father's Day CookOwt & Black Men's Wellness Day",
    host: "One Omega Foundation / Chicagoland Omega Chapters",
    category: "Community · Wellness",
    dateLabel: "Saturday, June 20, 2026",
    timeLabel: "7:00 AM – 9:00 PM",
    location: "Jackson Park, Chicago, IL",
    description: [
      "Join the brothers of One Omega Foundation and Chicagoland's Omega Psi Phi chapters for the 3rd Annual Father's Day CookOwt — a full-day celebration of fatherhood, brotherhood, and Black men's wellness at Jackson Park, Chicago.",
      "The day features free health screenings, wellness resources, food, and community fellowship. Early arrival is strongly encouraged — parking fills quickly and health screenings begin at opening. Don't miss your chance to participate in free screenings before the crowds arrive.",
    ],
    flyer: "/events/Fathers Day Cookowt Flyer.jpeg",
    callout:
      "⭐ Arrive Early — Parking fills fast and health screenings begin at 7:00 AM sharp.",
    registration: "None required — free community event",
    status: "upcoming",
    featured: true,
  },
  {
    id: "council-basilei-quarterly",
    title: "Council of Basilei Quarterly Convening",
    host: "One Omega Foundation",
    category: "Foundation",
    dateLabel: "Quarterly · TBA",
    location: "Chicago, IL",
    description: [
      "Joint session of all thirteen chapter leaders, hosted rotating across Chicagoland.",
    ],
    status: "upcoming",
  },
  {
    id: "conclave-sponsor-briefing",
    title: "Chicago Conclave 2028 — Sponsor Briefing",
    host: "Conclave 2028 Host Committee",
    category: "Conclave 2028",
    dateLabel: "TBA",
    location: "Chicago, IL",
    description: [
      "Host committee briefing for prospective sponsors — Founders' Circle and Cardinal Patron tiers.",
    ],
    status: "upcoming",
  },
  {
    id: "talent-hunt-2027",
    title: "Talent Hunt Citywide Showcase",
    host: "Chicagoland Omega Chapters",
    category: "Scholarship",
    dateLabel: "Spring 2027 (planned)",
    location: "Chicago, IL",
    description: [
      "Coordinated citywide Talent Hunt program drawing high school finalists from across Chicagoland chapters.",
    ],
    status: "upcoming",
  },
  {
    id: "foundation-inaugural",
    title: "Foundation Inaugural Reception",
    host: "One Omega Foundation",
    category: "Foundation",
    dateLabel: "Past · TBA",
    location: "Chicago, IL",
    description: [
      "Inaugural gathering announcing One Omega Foundation, Inc. as the coordinating entity for thirteen chapters.",
    ],
    status: "past",
  },
];

export function getFeaturedEvent(): Event | undefined {
  return events.find((e) => e.featured && e.status === "upcoming");
}

export function getNonFeaturedEventsByStatus(status: EventStatus): Event[] {
  return events.filter((e) => e.status === status && !e.featured);
}
