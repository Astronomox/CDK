import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, HeartHandshake, Mail, MapPin, School, ShoppingBag, UserRound, Users } from "lucide-react";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getGallery, getProgrammes, getProjects } from "@/lib/content";
import { PLACEHOLDERS } from "@/lib/content/seed";
import { MediaImage } from "@/components/ui/MediaImage";
import { StatsBand } from "@/components/sections/StatsBand";
import { Instagram, LinkedIn } from "@/components/icons";
import { RevealObserver } from "@/components/home/RevealObserver";
import { HomeDonate } from "@/components/home/HomeDonate";
import "../home.css";

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

export default async function HomePage() {
  const [programmes, projects, gallery] = await Promise.all([getProgrammes(), getProjects(), getGallery()]);
  // Never show the same photo twice on the homepage.
  const used = new Set([
    PLACEHOLDERS.outreach.src,
    PLACEHOLDERS.classroom.src,
    PLACEHOLDERS.dance.src,
    ...programmes.slice(0, 3).map((p) => p.image.src),
    ...projects.slice(0, 2).map((p) => p.coverImage.src),
  ]);
  const moments = gallery.filter((g) => !used.has(g.image.src)).slice(0, 2);

  return (
    <div className="home">
      <RevealObserver />

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
              Working across {SITE.region}, with outreaches in Lagos and Kwara.
            </p>
          </div>
          <figure className="hero-media">
            <MediaImage image={PLACEHOLDERS.outreach} priority sizes="(min-width: 1024px) 46vw, 100vw" />
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

      {/* 2. Why we exist */}
      <section className="section" aria-labelledby="why-title">
        <div className="wrap split">
          <figure className="embrace" aria-label="Photo framed by two curved arms, inspired by the embrace in our logo">
            <MediaImage image={PLACEHOLDERS.classroom} sizes="(min-width: 1024px) 460px, 90vw" />
            <svg viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden>
              <path pathLength={1} stroke="#7146D3" d="M40 102 A192 192 0 0 0 8 200 L8 372 C8 438 96 486 200 496" />
              <path pathLength={1} stroke="#FED072" d="M360 102 A192 192 0 0 1 392 200 L392 372 C392 438 304 486 200 496" />
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
              {SITE.name} is an NGO working across <em>{SITE.region}</em>, with documented outreaches in Lagos and Kwara.
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
        <StatsBand />
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
          <div className="card-grid card-grid--3">
            {programmes.slice(0, 3).map((p) => (
              <article key={p.slug} className="card reveal">
                <Link className="card-link" href={`/programmes/${p.slug}`}>
                  <div className="media">
                    <MediaImage image={p.image} fill sizes="(min-width: 1024px) 33vw, (min-width: 700px) 50vw, 100vw" />
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
            <b>On an outreach day:</b> group conversations on purpose and self-belief, games, fun videos and creative engagement, prayer,
            danceable music, and relief items like bags, shoes and books.
          </p>
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
          <div className="card-grid card-grid--2">
            {projects.slice(0, 2).map((p) => (
              <article key={p.slug} className="card card--story reveal">
                <Link className="card-link" href={`/impact/projects/${p.slug}`}>
                  <div className="media">
                    <MediaImage image={p.coverImage} fill sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                  <div className="card-body">
                    <span className="tag">{p.location}</span>
                    <h3>{p.title}</h3>
                    <p>Conversation, games, music and encouragement, plus relief items from our sponsors.</p>
                    <span className="link-arrow">
                      Read the story<span className="sr-only"> about {p.title}</span> <Arrow />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="gallery reveal">
            <div className="gallery-intro">
              <h3>Moments from our outreaches</h3>
              <p>Games, books, music and a lot of laughter, captured at our school and community outreaches.</p>
              <Link className="link-arrow" href="/impact/gallery">
                Open the gallery <Arrow />
              </Link>
            </div>
            <ul className="gallery-grid">
              {moments.map((m) => (
                <li key={m.id}>
                  <Link href="/impact/gallery" aria-label={`Open the gallery: ${m.caption ?? m.image.alt}`}>
                    <MediaImage image={m.image} fill sizes="(min-width: 768px) 33vw, 50vw" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Our promise (no approved testimonials yet; never attribute words to a child) */}
      <section className="section" aria-label="Our promise">
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
              <p className="vision-quote">We create positive experiences, encouragement and opportunities that help children keep their spark alive.</p>
            </blockquote>
            <figcaption className="quote-cite">
              <b>Our promise</b>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 8. Sponsors and partners */}
      <section className="section bg-warm" id="partners" aria-labelledby="partners-title">
        <div className="wrap partners">
          <div className="partners-copy reveal">
            <span className="eyebrow">Sponsors and partners</span>
            <h2 id="partners-title">Made possible together.</h2>
            <p>
              Sponsors and partners help us provide relief items such as bags, shoes and books, and make every outreach possible. We will
              introduce them here, with their permission.
            </p>
            <Link className="btn btn--secondary" href="/get-involved/partner">
              Partner With Us
            </Link>
          </div>
          {/* No sponsors are confirmed yet. Logos are added in the CMS only with written permission. */}
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
          <div className="card-grid card-grid--3">
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
                      <b>Drop-off</b>
                      {SITE.donationAddress.lines.join(", ")}
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
          </div>
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
