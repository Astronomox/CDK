/**
 * Seed content used when Sanity is not configured (local development, first deploy).
 *
 * Everything here comes from docs/PRD.md. Nothing is invented: where details are
 * still being compiled (dates, schools, per-project numbers) the fields are left
 * empty and the UI says so. Photos are the organisation's own outreach photos.
 *
 * Seed items carry the same `approved` flag as CMS items and go through the same
 * filter, so the safeguarding rule is exercised in development too.
 */
import type { PortableTextBlock } from "@portabletext/react";
import type { GalleryItem, Img, Partner, Programme, Project, Story, Testimonial, Video } from "./types";

type Approvable<T> = T & { approved: boolean };

/**
 * Real outreach photos supplied by the organisation (Google Drive, 2024 to 2026 folders),
 * resized to 1600px for the web. Replace or add more through the CMS.
 */
function photo(file: string, width: number, height: number, alt: string): Img {
  return { src: `/photos/outreach-${file}.jpg`, alt, width, height };
}

export const PHOTOS = {
  hero: photo("2024-23", 1600, 1026, "Pupils in green uniforms cheer and hold up books and gifts in front of the Cheer The Kids Children Outreach banner."),
  why: photo("2024-31", 1600, 2000, "A schoolboy in a green uniform smiles broadly at an outreach."),
  promise: photo("2025-34", 1600, 2400, "A volunteer in a Cheer The Kids t-shirt hugs a smiling pupil as they both make peace signs."),
  schoolOutreach: photo("2026-15", 1600, 1067, "A volunteer speaks to pupils in brown and cream uniforms in front of the Children Outreach banner."),
  training: photo("2024-30", 1280, 700, "The Cheer The Kids volunteer team standing together at an outreach."),
  skills: photo("2024-18", 1600, 1068, "Pupils and volunteers gathered in a classroom during an indoor session."),
  team: photo("2024-48", 1600, 944, "Cheer The Kids volunteers smiling together after an outreach."),
};

/** Kept for older imports: the site now uses real photos everywhere. */
export const PLACEHOLDERS = {
  outreach: PHOTOS.hero,
  classroom: PHOTOS.why,
  dance: PHOTOS.promise,
  games: PHOTOS.schoolOutreach,
  training: PHOTOS.training,
  skills: PHOTOS.skills,
  team: PHOTOS.team,
};

/** Every outreach photo on the site, keyed by year and number. */
export const OUTREACH_PHOTOS = {
  "2024-3": photo("2024-3", 1600, 2000, "A young boy smiles at the camera during an outreach."),
  "2024-11": photo("2024-11", 1600, 1066, "Excited pupils raise their hands and papers during an activity."),
  "2024-17": photo("2024-17", 1600, 2398, "A pupil smiles with her hand on her chin."),
  "2024-24": photo("2024-24", 1600, 1066, "A large group of pupils in green uniforms gathered in the school yard."),
  "2024-25": photo("2024-25", 1600, 1066, "A girl in a green uniform laughs in the school yard."),
  "2024-26": photo("2024-26", 1600, 1280, "Two volunteers hold a certificate in front of the outreach banner."),
  "2024-29": photo("2024-29", 1280, 854, "Pupils cheer and wave their papers in the air."),
  "2024-32": photo("2024-32", 1600, 1066, "Pupils and volunteers pose together in front of the outreach banner."),
  "2024-38": photo("2024-38", 1600, 1066, "Pupils in a classroom clap and smile during a session."),
  "2025-1": photo("2025-1", 1600, 1067, "Young pupils in colourful uniforms clap together outside."),
  "2025-6": photo("2025-6", 1600, 1068, "Pupils line up in the school compound during an outreach."),
  "2025-9": photo("2025-9", 1600, 1067, "Pupils reach out excitedly as a volunteer shares items."),
  "2025-12": photo("2025-12", 1600, 2400, "A young pupil claps and smiles."),
  "2025-22": photo("2025-22", 1600, 1067, "A volunteer talks with young pupils beside the Children Outreach banner."),
  "2025-28": photo("2025-28", 1600, 1068, "Young pupils stand together in front of the Children Outreach banner."),
  "2025-37": photo("2025-37", 1600, 2400, "A volunteer in a purple Cheer The Kids Initiative t-shirt makes peace signs."),
  "2025-43": photo("2025-43", 1600, 1021, "Volunteers in Cheer The Kids t-shirts gather outside a school."),
  "2025-47": photo("2025-47", 1600, 2400, "A volunteer in a navy Cheer The Kids t-shirt smiles and makes peace signs."),
  "2026-4": photo("2026-4", 1600, 2400, "A pupil holds a sign reading Healthy Girls, Confident Women, Strong Future."),
  "2026-5": photo("2026-5", 1600, 1067, "A large crowd of pupils in brown and cream uniforms at an outreach."),
  "2026-12": photo("2026-12", 1600, 2400, "A pupil speaks into a microphone during an outreach."),
  "2026-16": photo("2026-16", 1600, 2400, "A pupil holds up a Cheer The Kids sign among classmates."),
  "2026-19": photo("2026-19", 1600, 2400, "A smiling volunteer holds a Cheer The Kids sign."),
  "2026-20": photo("2026-20", 1600, 2400, "A smiling pupil holds a Cheer The Kids sign high above their head."),
  "2026-25": photo("2026-25", 1600, 2400, "Two pupils grin at the camera."),
  "2026-31": photo("2026-31", 1600, 1067, "Pupils clap and sing together outside."),
  "2026-44": photo("2026-44", 1600, 1067, "A pupil speaks into a microphone as classmates listen."),
  "2026-47": photo("2026-47", 1600, 2400, "A pupil smiles among classmates during an outreach."),
};

function paragraphs(...texts: string[]): PortableTextBlock[] {
  return texts.map((text, i) => ({
    _type: "block",
    _key: `p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

export const seedProgrammes: Programme[] = [
  {
    slug: "school-outreaches",
    title: "School Outreaches",
    summary: "Joyful school visits built around purpose, self-belief and keeping every child's spark alive.",
    intro:
      "Our school outreaches are designed to engage children around purpose, self-belief and keeping their spark alive. We bring conversation, play, music and encouragement into the school day.",
    highlights: [
      "Group conversations on purpose and self-belief",
      "Games and interactive activities",
      "Fun videos and creative engagement",
      "Prayer with the children",
      "Danceable music and joyful activities",
      "Distribution of relief items from sponsors, such as bags, shoes and books",
    ],
    audience: "Primary and secondary school pupils in Lagos, Kwara and across Southwest Nigeria.",
    status: "active",
    image: PHOTOS.schoolOutreach,
    order: 1,
  },
  {
    slug: "volunteer-training",
    title: "Volunteer Training",
    summary: "Training young Nigerians to show up for children with care, energy and good safeguarding practice.",
    intro:
      "Volunteer training is for young Nigerians in tertiary institutions and graduates of tertiary institutions. Professionals are welcome to volunteer too. Every applicant completes a screening test sent by email and takes part in training before deployment.",
    highlights: [
      "Open to tertiary students, graduates and professionals",
      "Screening test sent by email after your application is reviewed",
      "Training before deployment to any outreach",
      "Roles in outreaches, media, design, content and event support",
    ],
    audience: "Tertiary students, graduates and professionals.",
    status: "active",
    image: PHOTOS.training,
    order: 2,
  },
  {
    slug: "skill-acquisition",
    title: "Skill Acquisition",
    summary: "A programme in development to help young people build practical, creative skills.",
    intro:
      "Our skill acquisition programme is currently under development. We want young people to leave with practical skills they can grow into opportunities. Photography and graphics design are among the skills under consideration.",
    highlights: [
      "Practical, hands-on learning",
      "Skills chosen for real opportunities",
      "More details to be announced",
    ],
    status: "in-development",
    image: PHOTOS.skills,
    skills: [
      { title: "Photography", description: "Under consideration.", status: "planned" },
      { title: "Graphics design", description: "Under consideration.", status: "planned" },
    ],
    order: 3,
  },
];

const OUTREACH_ACTIVITIES = [
  "Led group conversations on purpose and self-belief",
  "Played games and ran interactive activities",
  "Shared fun videos and creative engagement",
  "Prayed with the children",
  "Danced to music and celebrated together",
  "Distributed relief items from sponsors",
];

export const seedProjects: Approvable<Project>[] = [
  {
    slug: "outreaches-2026",
    title: "Our 2026 outreaches",
    location: "Southwest Nigeria",
    context:
      "This year we returned to schools with conversation, play and encouragement, including a focus on healthy girls, confident women and strong futures.",
    whatWeDid: OUTREACH_ACTIVITIES,
    outcome: "Part of the more than 2,000 children reached across our 7 school and community outreaches so far.",
    coverImage: OUTREACH_PHOTOS["2026-5"],
    photos: [OUTREACH_PHOTOS["2026-4"], OUTREACH_PHOTOS["2026-16"], OUTREACH_PHOTOS["2026-44"], OUTREACH_PHOTOS["2026-31"]],
    videos: [],
    testimonials: [],
    sponsors: [],
    detailsPending: true,
    approved: true,
  },
  {
    slug: "outreaches-2025",
    title: "Our 2025 outreaches",
    location: "Southwest Nigeria",
    context:
      "Our volunteers spent the day with young pupils: clapping games, conversations about self-belief and plenty of smiles.",
    whatWeDid: OUTREACH_ACTIVITIES,
    outcome: "Part of the more than 2,000 children reached across our 7 school and community outreaches so far.",
    coverImage: OUTREACH_PHOTOS["2025-28"],
    photos: [OUTREACH_PHOTOS["2025-22"], OUTREACH_PHOTOS["2025-6"], OUTREACH_PHOTOS["2025-12"], OUTREACH_PHOTOS["2025-43"]],
    videos: [],
    testimonials: [],
    sponsors: [],
    detailsPending: true,
    approved: true,
  },
  {
    slug: "outreaches-2024",
    title: "Our 2024 outreaches",
    location: "Southwest Nigeria",
    context:
      "Our early outreaches brought volunteers, games and relief items into school yards and classrooms, and set the tone for everything since.",
    whatWeDid: OUTREACH_ACTIVITIES,
    outcome: "Part of the more than 2,000 children reached across our 7 school and community outreaches so far.",
    coverImage: OUTREACH_PHOTOS["2024-24"],
    photos: [OUTREACH_PHOTOS["2024-32"], OUTREACH_PHOTOS["2024-11"], OUTREACH_PHOTOS["2024-29"], OUTREACH_PHOTOS["2024-38"]],
    videos: [],
    testimonials: [],
    sponsors: [],
    detailsPending: true,
    approved: true,
  },
];

/** The organisation's own outreach photos from 2024 to 2026. */
export const seedGallery: Approvable<GalleryItem>[] = [
  { id: "photo-1", image: PHOTOS.hero, category: "school-outreaches", caption: "Celebrating at an outreach", approved: true },
  { id: "photo-2", image: OUTREACH_PHOTOS["2026-25"], category: "school-outreaches", caption: "All smiles", approved: true },
  { id: "photo-3", image: PHOTOS.promise, category: "volunteers", caption: "A volunteer and a pupil", approved: true },
  { id: "photo-4", image: OUTREACH_PHOTOS["2024-38"], category: "creative-activities", caption: "Clapping along in class", approved: true },
  { id: "photo-5", image: OUTREACH_PHOTOS["2026-4"], category: "events", caption: "Healthy Girls, Confident Women, Strong Future", approved: true },
  { id: "photo-6", image: OUTREACH_PHOTOS["2025-1"], category: "games", caption: "Clapping games", approved: true },
  { id: "photo-7", image: PHOTOS.why, category: "school-outreaches", caption: "A big smile", approved: true },
  { id: "photo-8", image: OUTREACH_PHOTOS["2026-12"], category: "creative-activities", caption: "Taking the microphone", approved: true },
  { id: "photo-9", image: OUTREACH_PHOTOS["2024-29"], category: "school-outreaches", caption: "Cheers in the school yard", approved: true },
  { id: "photo-10", image: OUTREACH_PHOTOS["2025-47"], category: "volunteers", caption: "Our volunteers", approved: true },
  { id: "photo-11", image: OUTREACH_PHOTOS["2026-20"], category: "events", caption: "Holding the sign high", approved: true },
  { id: "photo-12", image: OUTREACH_PHOTOS["2024-26"], category: "events", caption: "Certificates of appreciation", approved: true },
  { id: "photo-13", image: OUTREACH_PHOTOS["2025-9"], category: "donations", caption: "Sharing items with pupils", approved: true },
  { id: "photo-14", image: PHOTOS.schoolOutreach, category: "school-outreaches", caption: "Talking about purpose and self-belief", approved: true },
  { id: "photo-15", image: OUTREACH_PHOTOS["2024-3"], category: "school-outreaches", caption: "Ready for the day", approved: true },
  { id: "photo-16", image: OUTREACH_PHOTOS["2025-37"], category: "volunteers", caption: "Volunteer joy", approved: true },
  { id: "photo-17", image: OUTREACH_PHOTOS["2026-44"], category: "creative-activities", caption: "Speaking up", approved: true },
  { id: "photo-18", image: OUTREACH_PHOTOS["2024-25"], category: "school-outreaches", caption: "Laughter in the yard", approved: true },
  { id: "photo-19", image: OUTREACH_PHOTOS["2025-12"], category: "games", caption: "Joining in", approved: true },
  { id: "photo-20", image: OUTREACH_PHOTOS["2026-19"], category: "volunteers", caption: "Proud to volunteer", approved: true },
  { id: "photo-21", image: PHOTOS.training, category: "volunteers", caption: "The volunteer team", approved: true },
  { id: "photo-22", image: OUTREACH_PHOTOS["2026-47"], category: "school-outreaches", caption: "Listening closely", approved: true },
  { id: "photo-23", image: OUTREACH_PHOTOS["2024-17"], category: "school-outreaches", caption: "Thinking big", approved: true },
  { id: "photo-24", image: OUTREACH_PHOTOS["2026-16"], category: "events", caption: "Our logo in the crowd", approved: true },
  { id: "photo-25", image: PHOTOS.team, category: "volunteers", caption: "Volunteers together", approved: true },
];

/** Real testimonials exist but must be added in the CMS with consent. None are seeded. */
export const seedTestimonials: Approvable<Testimonial>[] = [];

/** Real videos exist but must be added in the CMS with consent. None are seeded. */
export const seedVideos: Approvable<Video>[] = [];

/** Sponsors and partners are still being confirmed. None are seeded. */
export const seedPartners: Partner[] = [];

export const seedStories: Approvable<Story>[] = [
  {
    slug: "volunteer-applications-are-open",
    title: "Volunteer applications are open",
    category: "programme-announcement",
    publishedAt: "2026-10-10",
    excerpt:
      "Are you a student, graduate or professional who wants to help children believe in their dreams? We would love to hear from you.",
    coverImage: OUTREACH_PHOTOS["2025-47"],
    body: paragraphs(
      "Cheer The Kids is welcoming new volunteers. We work with young Nigerians in tertiary institutions, graduates and professionals who want to bring joy and encouragement to children.",
      "There are roles for everyone: school outreaches, our social media team, videography, photography, graphics design, content creation and event support.",
      "Here is how it works. You apply online. We review your application and send a short screening test by email. You then join our training before being deployed to an outreach.",
      "If that sounds like you, apply on our Volunteer page.",
    ),
    approved: true,
  },
  {
    slug: "two-thousand-children-seven-outreaches",
    title: "2,000+ children, 7 outreaches, and we are just getting started",
    category: "impact-story",
    publishedAt: "2026-10-10",
    excerpt: "A look at where our work has taken us so far, from Lagos to Kwara.",
    coverImage: OUTREACH_PHOTOS["2026-5"],
    body: paragraphs(
      "Through 7 school and community outreaches, Cheer The Kids has reached more than 2,000 children. Our documented activities so far have taken place in Lagos and Kwara.",
      "Every outreach mixes conversation about purpose and self-belief with games, music, creative activities and, thanks to our sponsors, relief items such as bags, shoes and books.",
      "We are compiling the full story of each outreach. You can already see moments from 2024, 2025 and 2026 in our gallery.",
    ),
    approved: true,
  },
  {
    slug: "skill-acquisition-programme-in-development",
    title: "Our skill acquisition programme is taking shape",
    category: "programme-announcement",
    publishedAt: "2026-10-10",
    excerpt: "Photography and graphics design are among the skills we are considering.",
    coverImage: PHOTOS.skills,
    body: paragraphs(
      "We want young people to leave our programmes with practical skills they can grow into real opportunities.",
      "Our skill acquisition programme is under development. Photography and graphics design are among the skills under consideration.",
      "We will share details here as the programme takes shape. If you are a professional who could teach or support a skill, we would love to talk.",
    ),
    approved: true,
  },
];
