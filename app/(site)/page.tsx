import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Briefcase, HeartHandshake, Mail, MapPin, Phone, School, ShoppingBag, Sprout, UserRound, Users } from "lucide-react";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getGallery, getPartners, getProgrammes, getProjects, getTestimonials } from "@/lib/content";
import { OUTREACH_PHOTOS, PLACEHOLDERS } from "@/lib/content/seed";
import type { GalleryItem, Project } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { StatsBand } from "@/components/sections/StatsBand";
import { Instagram, LinkedIn } from "@/components/icons";
import { HomeDonate } from "@/components/home/HomeDonate";
import { HeartLine } from "@/components/HeartLine";
import { VoiceRotator } from "@/components/VoiceRotator";
import { PathTabs } from "@/components/PathTabs";
import "../home.css";
import "../home-mobile.css";

export const revalidate = 600;

export const metadata: Metadata = {
  ...pageMetadata({ title: "Building Futures, Brightening Smiles", description: SITE.description, path: "/" }),
  title: { absolute: `${SITE.name} | Building Futures, Brightening Smiles` },
};

const PILLARS = [
  ["Potential", "over pity"],
  ["Hope", "over helplessness"],
  ["Dignity", "over dependency"],
  ["Empowerment", "over limitation"],
];

function Arrow() {
  return <ArrowRight aria-hidden />;
}

/** Photos for the hero collage, the ribbon and the impact band. */
const HERO_SIDE = [OUTREACH_PHOTOS["2026-20"], OUTREACH_PHOTOS["2025-12"]];
const RIBBON = [
  OUTREACH_PHOTOS["2024-25"],
  OUTREACH_PHOTOS["2026-4"],
  OUTREACH_PHOTOS["2025-1"],
  OUTREACH_PHOTOS["2026-12"],
  OUTREACH_PHOTOS["2024-38"],
  OUTREACH_PHOTOS["2025-47"],
];
const IMPACT_BG = OUTREACH_PHOTOS["2026-31"];
const MENTOR_PHOTO = OUTREACH_PHOTOS["2026-44"];

/** What our mentors can talk through, as listed by the organisation. */
const MENTOR_TOPICS = [
  { label: "Moral", Icon: HeartHandshake },
  { label: "Career", Icon: Briefcase },
  { label: "Education", Icon: BookOpen },
  { label: "Development", Icon: Sprout },
];

/** Year shown large on project cards: from the date, or a year in the title. */
function projectYear(p: Project) {
  return p.date?.slice(0, 4) ?? p.title.match(/\b(19|20)\d{2}\b/)?.[0];
}

/** Picks mosaic tiles, putting portrait photos in tall slots and landscape photos in wide ones. */
function mosaic(items: GalleryItem[]) {
  const pool = [...items];
  const take = (portrait: boolean) => {
    const i = pool.findIndex((g) => g.image.height > g.image.width === portrait);
    return pool.splice(i >= 0 ? i : 0, 1)[0];
  };
  const slots = [
    { cls: "m-big", portrait: true },
    { cls: "m-tall", portrait: true },
    { cls: "m-sq", portrait: false },
    { cls: "m-sq", portrait: true },
    { cls: "m-wide", portrait: false },
    { cls: "m-wide", portrait: false },
  ];
  return slots.flatMap((s) => {
    const item = pool.length ? take(s.portrait) : undefined;
    return item ? [{ ...item, cls: s.cls }] : [];
  });
}

export default async function HomePage() {
  const [programmes, projects, gallery, testimonials, partners] = await Promise.all([
    getProgrammes(),
    getProjects(),
    getGallery(),
    getTestimonials(),
    getPartners(),
  ]);
  const sponsors = partners.filter((p) => p.kind === "sponsor" && p.logo);
  const [featured, ...moreVoices] = testimonials;
  // Never show the same photo twice on the homepage.
  const used = new Set([
    PLACEHOLDERS.outreach.src,
    PLACEHOLDERS.classroom.src,
    PLACEHOLDERS.dance.src,
    IMPACT_BG.src,
    ...HERO_SIDE.map((p) => p.src),
    ...RIBBON.map((p) => p.src),
    ...programmes.slice(0, 3).map((p) => p.image.src),
    ...projects.slice(0, 4).map((p) => p.coverImage.src),
  ]);
  const moments = mosaic(gallery.filter((g) => !used.has(g.image.src)));

  return (
    <div className="home">

      {/* 1. Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              Building Futures, <span className="swash">Brightening Smiles</span>
            </h1>
            <p className="lead">{SITE.description}</p>
            <div className="hero-ctas">
              <Link className="btn btn--primary" href="/get-involved/donate">
                Support Our Mission
              </Link>
              <Link className="btn btn--secondary" href="/get-involved/volunteer">
                Volunteer With Us
              </Link>
            </div>
            <div className="hero-ctas">
              <Link className="link-arrow" href="/impact">
                See Our Impact <Arrow />
              </Link>
            </div>
            <p className="hero-meta">
              <MapPin aria-hidden />
              {SITE.whereWeWork}
            </p>
          </div>
          <figure className="hero-media hero-collage">
            <div className="hc-main">
              <MediaImage image={PLACEHOLDERS.outreach} fill priority quality={90} sizes="(min-width: 1024px) 34vw, 100vw" />
            </div>
            {HERO_SIDE.map((img, i) => (
              <div key={img.src} className={i === 0 ? "hc-a" : "hc-b"}>
                <MediaImage image={img} fill priority sizes="(min-width: 1024px) 18vw, (min-width: 640px) 38vw, 1px" />
              </div>
            ))}
            <div className="hero-card" aria-hidden>
              <span className="dot">
                <School />
              </span>
              <div>
                <strong>{SITE.impact.outreaches} outreaches</strong>
                <span>in schools and communities across Lagos and Kwara</span>
              </div>
            </div>
          </figure>
        </div>
      </section>

      {/* Photo ribbon: real moments, edge to edge */}
      <section className="ribbon" aria-label="Moments from our outreaches">
        <ul>
          {[...RIBBON, ...RIBBON].map((img, i) => (
            <li
              key={`${img.src}-${i}`}
              className={`${img.height > img.width ? "r-portrait" : "r-landscape"}${i >= RIBBON.length ? " r-clone" : ""}`}
              aria-hidden={i >= RIBBON.length || undefined}
            >
              <MediaImage image={img} fill sizes={img.height > img.width ? "(min-width: 1024px) 17vw, 38vw" : "(min-width: 1024px) 34vw, 76vw"} />
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Why we exist */}
      <section className="section" aria-labelledby="why-title">
        <div className="wrap split">
          <figure className="embrace" aria-label="Photo framed by two curved arms, inspired by the embrace in our logo">
            <MediaImage image={PLACEHOLDERS.classroom} sizes="(min-width: 1024px) 460px, 90vw" />
            <svg viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden>
              {/* Two arms rise up the sides and meet over the photo's arched top, following its shape. */}
              <path pathLength={1} stroke="#7146D3" d="M64 494 C30 486 8 462 8 428 L8 200 A192 192 0 0 1 196 8" />
              <path pathLength={1} stroke="#FED072" d="M336 494 C370 486 392 462 392 428 L392 200 A192 192 0 0 0 204 8" />
            </svg>
          </figure>
          <div className="why-copy reveal">
            <span className="eyebrow">Why we exist</span>
            <h2 id="why-title">Every child deserves to keep their spark.</h2>
            <p className="lead">
              Difficult family, economic and social circumstances can wear down a child&rsquo;s confidence, enthusiasm and hope for the
              future. We exist so that children rediscover joy and believe that their circumstances do not have to define their future.
            </p>
            <ul className="pillars" aria-label="How we see every child">
              {PILLARS.map(([a, b]) => (
                <li key={a}>
                  <b>{a}</b> <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. About */}
      <section className="section bg-warm" id="about" aria-labelledby="about-title">
        <div className="wrap about-grid">
          <div className="reveal">
            <span className="eyebrow">About us</span>
            <h2 className="about-statement" id="about-title">
              {/* The organisation's own words (SITE.whereWeWork), with the region highlighted. */}
              {SITE.whereWeWork.split(SITE.region).map((part, i) => (i === 0 ? part : [<em key={i}>{SITE.region}</em>, part]))}
            </h2>
          </div>
          <div className="reveal">
            <div className="mv">
              <div className="mv-item">
                <h3>Our mission</h3>
                <p>{SITE.mission}</p>
              </div>
              <div className="mv-item">
                <h3>Our vision</h3>
                <p>{SITE.vision}</p>
              </div>
            </div>
            <Link className="link-arrow about-link" href="/about">
              Read our story <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Impact */}
      <div id="impact">
        <StatsBand image={IMPACT_BG} />
      </div>

      {/* 5. Programmes */}
      <section className="section" id="programmes" aria-labelledby="prog-title">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Programmes</span>
              <h2 id="prog-title">What we do with children and young people</h2>
            </div>
            <Link className="link-arrow" href="/programmes">
              All programmes <Arrow />
            </Link>
          </div>
          <div className="card-grid card-grid--3 prog-grid">
            {programmes.slice(0, 3).map((p) => (
              <article key={p.slug} className="card reveal">
                <Link className="card-link" href={`/programmes/${p.slug}`}>
                  <div className="media">
                    <MediaImage image={p.image} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 40vw" />
                    {p.status === "in-development" ? <span className="badge">In development</span> : null}
                  </div>
                  <div className="card-body">
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                    <span className="link-arrow">
                      Learn more<span className="sr-only"> about {p.title}</span> <Arrow />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <p className="on-the-day reveal">
            <b>On an outreach day:</b> we engage children in group conversations about purpose and self-belief, games, fun videos, and other
            creative activities. We also incorporate prayer, danceable music, and the distribution of relief items.
          </p>
        </div>
      </section>

      {/* 5b. Mentorship: a direct line to someone who will listen. */}
      <section className="section mentor-section" id="mentorship" aria-labelledby="mentor-title">
        <div className="wrap">
          <div className="mentor reveal">
            <div className="mentor-copy">
              <span className="eyebrow">Mentorship</span>
              <h2 id="mentor-title">Need someone to talk to?</h2>
              <p>
                Our team is here to listen and guide you on morals, career, education and personal development. Reach out by email or phone
                and someone will get back to you.
              </p>
              <ul className="mentor-topics" aria-label="What we can talk about">
                {MENTOR_TOPICS.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon aria-hidden /> {label}
                  </li>
                ))}
              </ul>
              <div className="mentor-actions">
                <a className="btn btn--light" href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent("Mentorship: I would like to talk")}`}>
                  <Mail aria-hidden /> Email us
                </a>
                <a className="btn btn--ghost-light" href={`tel:${SITE.contact.phoneIntl}`}>
                  <Phone aria-hidden /> Call {SITE.contact.phone}
                </a>
              </div>
              <p className="mentor-note">Under 18? Please ask a parent, guardian or teacher to reach out with you.</p>
            </div>
            <div className="mentor-media">
              <MediaImage image={MENTOR_PHOTO} fill sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured stories */}
      <section className="section bg-warm" id="stories" aria-labelledby="stories-title">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Featured stories</span>
              <h2 id="stories-title">Where we have been</h2>
            </div>
            <Link className="link-arrow" href="/impact/projects">
              All projects <Arrow />
            </Link>
          </div>
          <ul className="years">
            {projects.slice(0, 4).map((p) => {
              const year = projectYear(p);
              return (
                <li key={p.slug} className="year-card reveal">
                  <Link href={`/impact/projects/${p.slug}`}>
                    <MediaImage image={p.coverImage} fill sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw" />
                    <span className="year-shade" aria-hidden />
                    <span className="year-body">
                      {year ? (
                        <span className="year-num" aria-hidden>
                          {year}
                        </span>
                      ) : null}
                      <span className="year-title">{p.title}</span>
                      <span className="year-more">
                        Read the story <Arrow />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {moments.length ? (
            <div className="moments reveal">
              <div className="moments-head">
                <h3>Moments from our outreaches</h3>
                <Link className="link-arrow" href="/impact/gallery">
                  Open the gallery <Arrow />
                </Link>
              </div>
              <ul className="mosaic">
                {moments.map((m) => (
                  <li key={m.id} className={m.cls}>
                    <Link href="/impact/gallery" aria-label={`Open the gallery: ${m.caption ?? m.image.alt}`}>
                      <MediaImage image={m.image} fill sizes={m.cls === "m-big" || m.cls === "m-wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} />
                      {m.caption ? <span className="m-cap">{m.caption}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* 7. Voices: a featured testimonial on its photo, then the rest dissolving one into the next. Children are credited by role only. */}
      <section className="section" aria-labelledby="voices-title">
        <h2 id="voices-title" className="sr-only">
          {featured ? "In their words" : "Our promise"}
        </h2>
        <div className="wrap quote-grid">
          <figure className="quote-photo reveal">
            <MediaImage image={PLACEHOLDERS.dance} sizes="(min-width: 900px) 40vw, 100vw" />
          </figure>
          <figure className="quote-body reveal">
            <svg className="quote-mark" viewBox="0 0 48 48" aria-hidden>
              <path
                fill="currentColor"
                d="M20 12c-7.7 2.4-12 8.6-12 16.4V38h12V26h-6.4c.4-4.3 2.9-7.6 7.6-9.4L20 12zm20 0c-7.7 2.4-12 8.6-12 16.4V38h12V26h-6.4c.4-4.3 2.9-7.6 7.6-9.4L40 12z"
              />
            </svg>
            <blockquote>
              <p className={featured ? "vision-quote vision-quote--long" : "vision-quote"}>
                {featured ? featured.quote : "We create positive experiences, encouragement and opportunities that help children keep their spark alive."}
              </p>
            </blockquote>
            <figcaption className="quote-cite">
              <HeartLine />
              <b>{featured ? featured.attribution : "Our promise"}</b>
            </figcaption>
          </figure>
        </div>
        {moreVoices.length ? (
          <div className="wrap voices">
            <VoiceRotator voices={moreVoices.map(({ id, quote, attribution }) => ({ id, quote, attribution }))} />
            <Link className="link-arrow" href="/impact/testimonials">
              Read all testimonials <Arrow />
            </Link>
          </div>
        ) : null}
      </section>

      {/* 8. Sponsors and partners */}
      <section className="section bg-warm" id="partners" aria-labelledby="partners-title">
        <div className="wrap partners">
          <div className="partners-copy reveal">
            <span className="eyebrow">Sponsors and partners</span>
            <h2 id="partners-title">Made possible together.</h2>
            <p>
              Sponsors and partners help us provide relief items such as bags, shoes and books, and make every outreach possible.
              {sponsors.length ? " Thank you to everyone who stands with us." : " We will introduce them here, with their permission."}
            </p>
            <Link className="btn btn--secondary" href="/get-involved/partner">
              Partner With Us
            </Link>
          </div>
          <div className="ways reveal">
            <h3>Ways to partner with us</h3>
            <ul className="ways-list">
              <li>
                <span className="ways-icon" aria-hidden>
                  <School />
                </span>
                <div>
                  <b>Sponsor an outreach</b>
                  <span>Help us bring a day of joy and encouragement to a school or community.</span>
                </div>
              </li>
              <li>
                <span className="ways-icon" aria-hidden>
                  <ShoppingBag />
                </span>
                <div>
                  <b>Provide relief items</b>
                  <span>Bags, shoes, books and confectioneries for the children we meet.</span>
                </div>
              </li>
              <li>
                <span className="ways-icon" aria-hidden>
                  <UserRound />
                </span>
                <div>
                  <b>Share your skills</b>
                  <span>Support our volunteer training, or the skill acquisition programme in development.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {sponsors.length ? (
          <div className="sponsors reveal">
            <div className="wrap">
              <h3 id="sponsors-title">Our sponsors</h3>
            </div>
            {/* Glides on its own (no swiping). Each half of the track holds the logos twice so the loop is seamless on wide screens; only the first set is exposed to assistive tech. */}
            <div className="sponsor-marquee">
              <ul className="sponsor-track" aria-labelledby="sponsors-title">
                {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((p, i) => {
                  const clone = i >= sponsors.length;
                  return (
                    <li key={`${p.id}-${i}`} className={clone ? "s-clone" : undefined} aria-hidden={clone || undefined}>
                      <Link href="/partners" title={p.name} tabIndex={clone ? -1 : undefined}>
                        <MediaImage image={p.logo!} fill sizes="150px" />
                        <span className="sr-only">{p.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </section>

      {/* 9. Get involved */}
      <section className="section bg-tint" id="get-involved" aria-labelledby="involved-title">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Get involved</span>
              <h2 id="involved-title">Help a child keep their spark</h2>
            </div>
            <p className="muted section-head-note">Give your time, give online, or give the things children need for school.</p>
          </div>
          <PathTabs labels={["Volunteer", "Donate", "Give items"]}>
            <article className="card path reveal">
              <div className="card-body">
                <span className="path-icon" aria-hidden>
                  <Users />
                </span>
                <h3>Volunteer</h3>
                <p>Students, graduates and professionals. Apply, take a short screening test by email, join our training, then an outreach.</p>
                <div className="path-extra">
                  <ol className="steps" aria-label="How volunteering works">
                    <li>Apply online</li>
                    <li>Short screening test by email</li>
                    <li>Join our volunteer training</li>
                    <li>Join an outreach</li>
                  </ol>
                </div>
                <div className="path-actions">
                  <Link className="btn btn--secondary" href="/get-involved/volunteer#apply">
                    Apply to volunteer
                  </Link>
                </div>
              </div>
            </article>

            <article className="card path reveal">
              <div className="card-body">
                <span className="path-icon" aria-hidden>
                  <HeartHandshake />
                </span>
                <h3>Donate</h3>
                <p>Give online or by bank transfer. Local and international donations welcome.</p>
                <HomeDonate />
              </div>
            </article>

            <article className="card path reveal">
              <div className="card-body">
                <span className="path-icon" aria-hidden>
                  <ShoppingBag />
                </span>
                <h3>Donate items or partner</h3>
                <p>We welcome bags, shoes, books and confectioneries.</p>
                <div className="path-extra">
                  <p className="address">
                    <MapPin aria-hidden />
                    <span>
                      <b>Drop-off in {SITE.donationDropOff.area}</b>
                      {SITE.donationDropOff.note}
                    </span>
                  </p>
                </div>
                <div className="path-actions">
                  <Link className="btn btn--secondary" href="/get-involved/donate-items">
                    Arrange a drop-off
                  </Link>
                  <Link className="link-arrow" href="/get-involved/partner">
                    Partner with us <Arrow />
                  </Link>
                </div>
              </div>
            </article>
          </PathTabs>
        </div>
      </section>

      {/* 10. Social + 11. Contact */}
      <section className="section" id="contact" aria-label="Follow us and contact us">
        <div className="wrap connect">
          <div className="panel panel--line reveal">
            <span className="eyebrow">Social media</span>
            <h2>Follow the joy.</h2>
            <p>Photos, videos and news from every outreach.</p>
            <div className="socials">
              <a className="social" href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer">
                <span className="ico" aria-hidden>
                  <Instagram />
                </span>
                <span>
                  <b>Instagram</b>
                  <span>{SITE.socials.instagramHandle}</span>
                </span>
                <ArrowUpRight className="go" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a className="social" href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="ico" aria-hidden>
                  <LinkedIn />
                </span>
                <span>
                  <b>LinkedIn</b>
                  <span>{SITE.name} on LinkedIn</span>
                </span>
                <ArrowUpRight className="go" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="panel panel--warm invite reveal">
            <div>
              <span className="eyebrow">For schools</span>
              <h2>Invite {SITE.name} to Your School</h2>
              <p className="muted">Tell us about your school and your pupils, and we will get in touch to plan a visit together.</p>
            </div>
            <div className="invite-actions">
              <Link className="btn btn--primary" href="/contact#school-outreach">
                Invite us
              </Link>
              <a className="mail" href={`mailto:${SITE.contact.email}`}>
                <Mail aria-hidden />
                {SITE.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
