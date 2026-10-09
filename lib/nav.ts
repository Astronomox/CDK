export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

/** Primary navigation. Keep to the 7 items in the PRD (section 16). */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Programmes",
    href: "/programmes",
    description: "How we help children build joy and self-belief.",
    children: [
      { label: "School Outreaches", href: "/programmes/school-outreaches", description: "Joyful visits built around purpose and self-belief." },
      { label: "Volunteer Training", href: "/programmes/volunteer-training", description: "Preparing volunteers to show up well for children." },
      { label: "Skill Acquisition", href: "/programmes/skill-acquisition", description: "Practical, creative skills. In development." },
    ],
  },
  {
    label: "Our Impact",
    href: "/impact",
    description: "The evidence, shared honestly and with consent.",
    children: [
      { label: "Projects", href: "/impact/projects", description: "The story of each outreach." },
      { label: "Gallery", href: "/impact/gallery", description: "Moments of joy from our outreaches." },
      { label: "Videos", href: "/impact/videos", description: "See an outreach in action." },
      { label: "Testimonials", href: "/impact/testimonials", description: "In the words of the people involved." },
      { label: "Stories and News", href: "/stories", description: "Updates and announcements." },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    description: "Give your time, your gifts or your support.",
    children: [
      { label: "Volunteer", href: "/get-involved/volunteer", description: "Join outreaches, media, design or events." },
      { label: "Donate", href: "/get-involved/donate", description: "Give online or by bank transfer." },
      { label: "Donate Items", href: "/get-involved/donate-items", description: "Bags, shoes, books and confectioneries." },
      { label: "Partner With Us", href: "/get-involved/partner", description: "Sponsor an outreach or share skills." },
    ],
  },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "About",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Mission and vision", href: "/about#mission" },
      { label: "Core values", href: "/about#values" },
      { label: "Registration", href: "/about#registration" },
    ],
  },
  {
    heading: "Our work",
    links: [
      { label: "Programmes", href: "/programmes" },
      { label: "Projects", href: "/impact/projects" },
      { label: "Gallery", href: "/impact/gallery" },
      { label: "Stories and News", href: "/stories" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Donate", href: "/get-involved/donate" },
      { label: "Donate items", href: "/get-involved/donate-items" },
      { label: "Partner with us", href: "/get-involved/partner" },
      { label: "Invite us to your school", href: "/contact#school-outreach" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Sponsors and partners", href: "/partners" },
      { label: "Safeguarding", href: "/safeguarding" },
      { label: "Privacy", href: "/privacy" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
