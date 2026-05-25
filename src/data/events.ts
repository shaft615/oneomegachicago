/**
 * Events data — single source of truth for the calendar, /events page,
 * and homepage featured-event banner.
 *
 * MAINTENANCE WORKFLOW (Path B — Foundation-curated):
 *   1. A chapter submits via /events/submit → Formspree notifies the
 *      Foundation events inbox.
 *   2. The Foundation reviews the submission and adds an entry to the
 *      `events` array below.
 *   3. Commit + push → Vercel auto-deploys → event appears on the calendar.
 *
 * DATE FORMAT — `start` and `end` are ISO 8601 strings WITH timezone offset:
 *   - Central Daylight Time (CDT, ~Mar–Nov):  "2026-06-20T07:00:00-05:00"
 *   - Central Standard Time (CST, ~Nov–Mar):  "2026-12-15T18:00:00-06:00"
 *
 * HOST CHAPTER — set `hostChapter` to the chapter's designation
 *   (e.g. "ΧΛΛ", "AKK") for chapter events; leave undefined for Foundation-
 *   wide events. The calendar shows the designation as a badge on each entry.
 *
 * RECURRING EVENTS — `recurrence` is a free-form label ("Quarterly",
 *   "Monthly · 1st Saturday", "Annual · June"). The calendar shows only
 *   the explicit `start` instance; create separate entries for each
 *   occurrence you want visible on the grid.
 */

export type EventStatus = "upcoming" | "past";

export interface Event {
  id: string;
  title: string;
  host: string;
  category: string;
  /** ISO 8601 datetime with timezone offset — REQUIRED for calendar positioning */
  start: string;
  /** Optional end datetime (ISO 8601 with offset). If omitted, event is treated as starting at `start` only. */
  end?: string;
  /** Chapter designation badge (e.g. "ΧΛΛ", "AKK"); undefined for Foundation events */
  hostChapter?: string;
  /** Free-form recurrence label, e.g. "Quarterly", "Monthly · 1st Saturday" */
  recurrence?: string;
  /** Registration / RSVP / external link URL */
  link?: string;
  /** Optional secondary external URL rendered as an additional outline button next to `link` (e.g. event website alongside a ticketing link) */
  secondaryLink?: string;
  /** Button label for the secondary link, defaults to "Event Website" */
  secondaryLinkLabel?: string;
  /** Anchor link (e.g. "#register") for an in-page registration form below the card; renders a "Register below ↓" CTA in the full event card */
  registerHref?: string;
  /** Extra YYYY-MM-DD dates on which to surface this event on the calendar grid, in addition to its `start` date. Useful for multi-day drives with non-contiguous or distinct daily windows so a single event entry shows up on every relevant calendar cell without fragmenting the data into separate entries. */
  additionalCalendarDates?: string[];
  /** External URL for a nomination/application form (e.g. Father of the Year); renders an extra solid-purple CTA on the full event card */
  nominationHref?: string;
  /** Button label for the nomination CTA, defaults to "Nominate" */
  nominationLabel?: string;
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
    start: "2026-06-20T07:00:00-05:00",
    end: "2026-06-20T21:00:00-05:00",
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
    link: "https://www.eventbrite.com/e/2026-black-mens-wellness-day-chicago-tickets-1944149807409",
    registerHref: "#register",
    nominationHref: "/events/nominate-father-of-the-year",
    nominationLabel: "Nominate Father of the Year",
    status: "upcoming",
    featured: true,
  },
  {
    id: "women-of-excellence-2026",
    title: "Mother's Day Women of Excellence Gospel Brunch & Awards Ceremony",
    host: "The Uplift Foundation in association with Chi Lambda Lambda (ΧΛΛ)",
    hostChapter: "ΧΛΛ",
    category: "Community",
    start: "2026-05-09T11:00:00-05:00",
    end: "2026-05-09T15:00:00-05:00",
    recurrence: "Annual",
    dateLabel: "Saturday, May 9, 2026",
    timeLabel: "11:00 AM – 3:00 PM (doors open at 11:00 AM)",
    location:
      "Tuscany Falls Banquets & Events, 9425 W 191st St, Mokena, IL 60448",
    description: [
      "An afternoon of gospel, community, and recognition — honoring the Women of Excellence in our lives. Co-hosted by The Uplift Foundation and the Chi Lambda Lambda Chapter of Omega Psi Phi Fraternity, Inc.",
      "Tickets — Early Bird: $75 · General Admission: $85 · Tables: $750.",
    ],
    flyer: "/events/MothersDay.jpeg",
    callout:
      "🎉 Thank you to everyone who came out to honor the Women of Excellence!",
    status: "past",
  },
  {
    id: "closet-clean-out-2026",
    title: "Closet Clean-Out — Declutter and Donate",
    host: "Rho Gamma Gamma Chapter (ΡΓΓ), Omega Psi Phi Fraternity, Inc.",
    hostChapter: "ΡΓΓ",
    category: "Service",
    start: "2026-05-15T18:00:00-05:00",
    end: "2026-05-17T17:00:00-05:00",
    dateLabel: "May 15–17, 2026 (Fri – Sun)",
    timeLabel: "See collection windows below",
    location:
      "Rho Gamma Gamma Facility · 1462 W 115th St, Chicago, IL 60643",
    description: [
      "Support Rho Gamma Gamma's Social Action Programs with a community closet clean-out — declutter your home, donate to neighbors in need. Drop off at the chapter's facility on any of three community collection days:",
      "Friday, May 15 (6:00–9:00 PM) · Saturday, May 16 (10:00 AM–6:00 PM) · Sunday, May 17 (2:00–5:00 PM)",
      "Items needed: men's, women's, and children's clothing · coats · shoes · winter accessories · handbags · backpacks · bedding · pillows · curtains. All items must be clean and in fair condition.",
      "Please gather donations into black heavy-duty garbage bags. Chapter goal: 1,250 bags collected for the community.",
    ],
    flyer: "/events/ClosetClean-out_2026.jpeg",
    additionalCalendarDates: ["2026-05-16", "2026-05-17"],
    callout:
      "🎉 Thank you to everyone who donated and supported our Social Action Programs!",
    status: "past",
  },
  {
    id: "celebrate-womanhood-2026",
    title: "Celebrate Womanhood — Women's Brunch",
    host: "Sigma Omega Chapter (ΣΩ), Omega Psi Phi Fraternity, Inc.",
    hostChapter: "ΣΩ",
    category: "Community",
    start: "2026-05-16T12:00:00-05:00",
    end: "2026-05-16T16:00:00-05:00",
    dateLabel: "Saturday, May 16, 2026",
    timeLabel: "12:00 PM – 4:00 PM",
    location: "DoubleTree Hotel, 5000 W 127th St, Alsip, IL",
    description: [
      "The Men of Sigma Omega Chapter celebrate the women in our lives — Honoring Strength · Motherhood · Success. Featuring inspirational speaker Dr. Velvetta M. Young.",
      "Tickets — $60. Payment via TicketFalcon, Venmo (@SigmaOmegaOPPF), Cash App ($sigmaOmegaOPPF), or check. Donations welcome.",
    ],
    flyer: "/events/SigmaOmega_Womanhood_2026.jpg",
    link: "https://www.ticketfalcon.com/e/sigma-omega-celebrate-womanhood-annual-womens-brunch-2026/#gallery",
    status: "upcoming",
  },
  {
    id: "coleman-love-2026",
    title: "Coleman Love",
    host: "Chi Lambda Lambda (ΧΛΛ)",
    hostChapter: "ΧΛΛ",
    category: "Social",
    start: "2026-05-24T18:00:00-05:00",
    end: "2026-05-24T23:00:00-05:00",
    recurrence: "Annual",
    dateLabel: "Sunday, May 24, 2026",
    timeLabel: "6:00 PM – 11:00 PM",
    location: "Red Star Kitchen+Bar",
    description: [
      "Coleman Love is an annual celebration honoring the anniversary of Frank Coleman and Edna Brown — a union that has inspired community, commitment, and service. What began as a personal milestone has grown into a beloved tradition of giving back, bringing together friends, family, and neighbors to mark love in its most meaningful form: action.",
      "Proceeds from Coleman Love benefit students in our local service area, funding school supplies and books for children who need them most. Every ticket purchased, every donation made, and every moment shared at this event puts pencils in hands and pages in front of young minds.",
      "Celebrate love. Invest in the future.",
    ],
    flyer: "/events/Coleman-Love_2026.jpg",
    link: "https://chilambdalambda.wildapricot.org/event-6698039",
    secondaryLink: "https://colemanlovechicago.com",
    secondaryLinkLabel: "Event Website",
    callout:
      "🎉 Thank you to everyone who came out to celebrate Coleman Love!",
    status: "past",
  },
  {
    id: "golf-outing-2026",
    title: "21st Annual Scholarship Golf Outing",
    host: "The Uplift Foundation in partnership with Chi Lambda Lambda (ΧΛΛ)",
    hostChapter: "ΧΛΛ",
    category: "Scholarship",
    start: "2026-07-09T09:00:00-05:00",
    recurrence: "Annual",
    dateLabel: "Thursday, July 9, 2026",
    timeLabel: "9:00 AM shotgun start",
    location: "Glenwoodie Golf Club, 19301 State Street, Glenwood, IL 60425",
    description: [
      "The 21st Annual Scholarship Golf Outing — a day of golf and fellowship benefiting college-bound students from Chicago's South Suburbs. Hosted by The Uplift Foundation in partnership with the Chi Lambda Lambda Chapter of Omega Psi Phi Fraternity, Inc.",
      "Registration — Single Player: $160 · Foursome: $640 · Luncheon Only: $60. Sponsorships available: Hole Sponsor $200 · Half-Way $500 · Manhood & Scholarship $1,500 · Gold $2,500 · Purple $5,000 · Corporate $10,000.",
      "Contact: Harold Pierce (Chairman) 408.706.0185 · Terence Jackson (Vice Chairman) 708.601.3704. The Uplift Foundation is a recognized 501(c)(3) — contributions are tax-deductible.",
    ],
    flyer: "/events/Golf_Outing_2026.jpeg",
    link: "https://chilambdalambda.wildapricot.org/event-6547840",
    status: "upcoming",
  },
  {
    id: "food-pantry-2026",
    title: "Food Pantry — Free Grocery Giveaway",
    host: "Chi Lambda Lambda (ΧΛΛ), Omega Psi Phi Fraternity, Inc. & the Village of Hazel Crest",
    hostChapter: "ΧΛΛ",
    category: "Service",
    start: "2026-06-02T11:00:00-05:00",
    end: "2026-06-02T15:00:00-05:00",
    dateLabel: "Tuesday, June 2, 2026",
    timeLabel: "11:00 AM – 3:00 PM",
    location:
      "Hazel Crest Municipal Center, 3601 W. 183rd St, Hazel Crest, IL",
    description: [
      "A free grocery giveaway open to the community — hosted by the Chi Lambda Lambda Chapter of Omega Psi Phi Fraternity, Inc. and the Village of Hazel Crest, in coordination with the Rho Gamma Gamma Chapter.",
    ],
    flyer: "/events/FoodPantry_2026.png",
    status: "upcoming",
  },
  {
    id: "bowties-and-stilettos-2026",
    title: "Urban Excellence: Bowties and Stilettos",
    host: "Nu Pi Chapter (ΝΠ), Omega Psi Phi Fraternity, Inc.",
    hostChapter: "ΝΠ",
    category: "Social",
    start: "2026-06-06T15:00:00-05:00",
    end: "2026-06-06T21:00:00-05:00",
    dateLabel: "Saturday, June 6, 2026",
    timeLabel: "3:00 PM – 9:00 PM",
    location:
      "Cinecity Studios, 1414 S. Western Ave, Chicago, IL 60608",
    description: [
      "An upscale evening of urban excellence — a curated VIP experience featuring premium food truck options at Cinecity Studios' indoor/outdoor venue.",
      "Hosted by the Nu Pi Chapter of Omega Psi Phi Fraternity, Inc.",
    ],
    flyer: "/events/BowtiesStilettos_2026.jpg",
    link: "https://www.zeffy.com/en-US/ticketing/bowties-and-stilettos-2026-ga-and-vip",
    status: "upcoming",
  },
  {
    id: "lake-jam-2026",
    title: "Lake Jam '26",
    host: "Mu Xi Chapter (ΜΞ), Omega Psi Phi Fraternity, Inc.",
    hostChapter: "ΜΞ",
    category: "Social",
    start: "2026-06-13T18:00:00-05:00",
    end: "2026-06-14T00:00:00-05:00",
    dateLabel: "Saturday, June 13, 2026",
    timeLabel: "6:00 PM – Midnight",
    location:
      "13926 S. Croissant Dr., Burnham, IL 60633 (139th & Torrence)",
    description: [
      "Lake Jam '26 — an evening of music, refreshments, and brotherhood presented by the Mu Xi Ques at 139th & Torrence in Burnham, IL.",
      "Music by DJ Rated AG. Refreshments provided · cash bar available. Parking at 14001 S. Croissant Dr.",
      "Vendor opportunities: 312.531.1171 · Follow @muxibruhz1911",
    ],
    flyer: "/events/LakeJam_2026.jpeg",
    link: "https://www.ticketfalcon.com/e/muxi-chapter-lake-jam/",
    status: "upcoming",
  },
  {
    id: "council-basilei-q3-2026",
    title: "Council of Basilei Quarterly Convening",
    host: "One Omega Foundation",
    category: "Foundation",
    start: "2026-07-18T10:00:00-05:00",
    recurrence: "Quarterly",
    dateLabel: "Quarterly · TBA (placeholder date)",
    location: "Chicago, IL",
    description: [
      "Joint session of all thirteen chapter leaders, hosted rotating across Chicagoland.",
    ],
    status: "upcoming",
  },
  {
    id: "conclave-sponsor-briefing-2026",
    title: "Chicago Conclave 2028 — Sponsor Briefing",
    host: "Conclave 2028 Host Committee",
    category: "Conclave 2028",
    start: "2026-09-12T18:00:00-05:00",
    dateLabel: "TBA (placeholder date)",
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
    start: "2027-04-24T14:00:00-05:00",
    dateLabel: "Spring 2027 (planned)",
    location: "Chicago, IL",
    description: [
      "Coordinated citywide Talent Hunt program drawing high school finalists from across Chicagoland chapters.",
    ],
    status: "upcoming",
  },
  {
    id: "pg-affair-nye-2025",
    title: "The P&G Affair — A New Year's Eve Experience",
    host: "Lambda Tau Omega Chapter, Alpha Kappa Alpha Sorority, Inc. & Chi Lambda Lambda Chapter, Omega Psi Phi Fraternity, Inc.",
    hostChapter: "ΧΛΛ",
    category: "Social",
    start: "2025-12-31T20:00:00-06:00",
    end: "2026-01-01T02:00:00-06:00",
    dateLabel: "Wednesday, December 31, 2025",
    timeLabel: "8:00 PM – 2:00 AM",
    location:
      "Marriott Marquis Chicago, 2121 S Prairie Ave, Chicago, IL 60616",
    description: [
      "An unforgettable New Year's Eve, co-hosted by the Lambda Tau Omega Chapter of Alpha Kappa Alpha Sorority, Inc. and the Chi Lambda Lambda Chapter of Omega Psi Phi Fraternity, Inc., at the Marriott Marquis Chicago.",
      "Live entertainment from Windy Indie® · Sounds by DJ PHOKISS · Guest appearance by DJ Craig Elliott.",
    ],
    flyer: "/events/PGAffair_NYE.jpg",
    callout:
      "🎉 Thank you to everyone who came out and rang in 2026 with us!",
    link: "https://pgaffair.com",
    status: "past",
  },
  {
    id: "foundation-inaugural",
    title: "Foundation Inaugural Reception",
    host: "One Omega Foundation",
    category: "Foundation",
    start: "2025-11-15T18:00:00-06:00",
    dateLabel: "November 2025",
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

/** Sort by start date ascending. */
export function sortByStart(list: Event[]): Event[] {
  return [...list].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
}

/**
 * Group events by their YYYY-MM-DD start date for fast calendar lookup.
 * Honors the optional `additionalCalendarDates` field so a single event
 * entry can appear on multiple calendar cells (e.g. a multi-day drive).
 */
export function groupByDay(list: Event[]): Map<string, Event[]> {
  const out = new Map<string, Event[]>();
  for (const e of list) {
    const keys = [
      isoDateKey(new Date(e.start)),
      ...(e.additionalCalendarDates ?? []),
    ];
    for (const key of keys) {
      const arr = out.get(key) ?? [];
      arr.push(e);
      out.set(key, arr);
    }
  }
  return out;
}

/**
 * Returns true if the event is finished as of `now`. Uses the event's `end`
 * when present; otherwise falls back to `start + 24h` so a single-date event
 * (no end specified) remains visible throughout its start day.
 *
 * Events explicitly flagged with status: "past" always return true regardless
 * of dates — lets us manually retire an event early.
 */
export function isEventPast(event: Event, now: number = Date.now()): boolean {
  if (event.status === "past") return true;
  const endMs = event.end
    ? new Date(event.end).getTime()
    : new Date(event.start).getTime() + 86_400_000;
  return endMs < now;
}

export function isoDateKey(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
