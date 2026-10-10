/**
 * Seed content used when Sanity is not configured (local development, first deploy).
 *
 * Everything here comes from docs/PRD.md. Nothing is invented: where details are
 * still being compiled (dates, schools, per-project numbers) the fields are left
 * empty and the UI says so. Images are clearly labelled placeholders until approved,
 * consented photos are uploaded in the CMS.
 * The sample photos are AI generated and carry a visible "Sample photo" label.
 *
 * Seed items carry the same `approved` flag as CMS items and go through the same
 * filter, so the safeguarding rule is exercised in development too.
 */
import type { PortableTextBlock } from "@portabletext/react";
import type { GalleryItem, Img, Partner, Programme, Project, Story, Testimonial, Video } from "./types";

type Approvable<T> = T & { approved: boolean };

/**
 * Sample photos (AI generated, mockup only) used until real, consented photos are added in the CMS.
 * They render with a visible "Sample photo" label. Replace every one of them before launch.
 */
function sample(file: string, width: number, height: number, alt: string): Img {
  return { src: `/samples/${file}.jpg`, alt, width, height, placeholder: true };
}

export const PLACEHOLDERS = {
  outreach: sample("hero-outreach", 1264, 848, "A volunteer in a purple t-shirt kneels among laughing schoolchildren who clap and raise their hands during a school outreach."),
  classroom: sample("classroom-conversation", 900, 1117, "Schoolchildren sitting in a circle in a bright classroom raise their hands during a group conversation."),
  games: sample("programme-games", 900, 725, "Schoolchildren holding hands in a wide circle run and laugh during a game on a school field."),
  training: sample("programme-training", 900, 725, "Young adult volunteers sit around a table with notebooks during a training discussion."),
  skills: sample("programme-skills", 900, 725, "A teenage boy looks through a camera as a young mentor points out what to photograph."),
  lagos: sample("project-lagos", 1200, 805, "A hall full of cheering schoolchildren wave their arms as two volunteers lead a song."),
  kwara: sample("project-kwara", 1200, 805, "Smiling schoolchildren hold new school bags and exercise books as a volunteer hands out books."),
  dance: sample("gallery-dance", 700, 700, "Children dance with their arms up in a school yard, with a volunteer dancing alongside them."),
  reading: sample("gallery-reading", 700, 700, "Two girls share a new storybook on a classroom bench, smiling."),
  portrait: sample("portrait-smile", 890, 1112, "A girl in a light blue school uniform laughs in warm afternoon light."),
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
    image: PLACEHOLDERS.games,
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
    image: PLACEHOLDERS.training,
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
    image: PLACEHOLDERS.skills,
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
    slug: "outreaches-in-lagos",
    title: "Outreaches in Lagos",
    location: "Lagos State",
    context:
      "Many children face difficult family, economic and social circumstances that can wear down confidence and hope. Schools in Lagos welcomed us to spend time with their pupils.",
    whatWeDid: OUTREACH_ACTIVITIES,
    outcome:
      "These visits are part of the more than 2,000 children reached across our 7 school and community outreaches so far.",
    coverImage: PLACEHOLDERS.lagos,
    photos: [PLACEHOLDERS.outreach, PLACEHOLDERS.dance],
    videos: [],
    testimonials: [],
    sponsors: [],
    detailsPending: true,
    approved: true,
  },
  {
    slug: "outreaches-in-kwara",
    title: "Outreaches in Kwara",
    location: "Kwara State",
    context:
      "Our work reaches beyond Lagos. In Kwara we brought the same mix of conversation, play and encouragement to children in schools and communities.",
    whatWeDid: OUTREACH_ACTIVITIES,
    outcome:
      "These visits are part of the more than 2,000 children reached across our 7 school and community outreaches so far.",
    coverImage: PLACEHOLDERS.kwara,
    photos: [PLACEHOLDERS.reading, PLACEHOLDERS.classroom],
    videos: [],
    testimonials: [],
    sponsors: [],
    detailsPending: true,
    approved: true,
  },
];

/** Sample photos only (AI generated, no real children). Replace with approved, consented photos. */
export const seedGallery: Approvable<GalleryItem>[] = [
  { id: "seed-g1", image: PLACEHOLDERS.outreach, category: "school-outreaches", caption: "Clapping games at a school outreach", approved: true },
  { id: "seed-g2", image: PLACEHOLDERS.reading, category: "creative-activities", caption: "Sharing a new storybook", approved: true },
  { id: "seed-g3", image: PLACEHOLDERS.dance, category: "events", caption: "Dancing together", approved: true },
  { id: "seed-g4", image: PLACEHOLDERS.games, category: "games", caption: "A circle game on the school field", approved: true },
  { id: "seed-g5", image: PLACEHOLDERS.kwara, category: "donations", caption: "New school bags and books", approved: true },
  { id: "seed-g6", image: PLACEHOLDERS.classroom, category: "school-outreaches", caption: "Conversations on purpose and self-belief", approved: true },
  { id: "seed-g7", image: PLACEHOLDERS.training, category: "volunteers", caption: "Volunteer training", approved: true },
  { id: "seed-g9", image: PLACEHOLDERS.portrait, category: "school-outreaches", caption: "All smiles after an outreach", approved: true },
  { id: "seed-g8", image: PLACEHOLDERS.lagos, category: "events", caption: "A hall full of cheers", approved: true },
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
    coverImage: PLACEHOLDERS.classroom,
    body: paragraphs(
      "Cheer d’Kids is welcoming new volunteers. We work with young Nigerians in tertiary institutions, graduates and professionals who want to bring joy and encouragement to children.",
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
    coverImage: PLACEHOLDERS.outreach,
    body: paragraphs(
      "Through 7 school and community outreaches, Cheer d’Kids has reached more than 2,000 children. Our documented activities so far have taken place in Lagos and Kwara.",
      "Every outreach mixes conversation about purpose and self-belief with games, music, creative activities and, thanks to our sponsors, relief items such as bags, shoes and books.",
      "We are compiling the full story of each outreach, with photos and videos shared only with the right consent in place. Watch this space.",
    ),
    approved: true,
  },
  {
    slug: "skill-acquisition-programme-in-development",
    title: "Our skill acquisition programme is taking shape",
    category: "programme-announcement",
    publishedAt: "2026-10-10",
    excerpt: "Photography and graphics design are among the skills we are considering.",
    coverImage: PLACEHOLDERS.skills,
    body: paragraphs(
      "We want young people to leave our programmes with practical skills they can grow into real opportunities.",
      "Our skill acquisition programme is under development. Photography and graphics design are among the skills under consideration.",
      "We will share details here as the programme takes shape. If you are a professional who could teach or support a skill, we would love to talk.",
    ),
    approved: true,
  },
];
