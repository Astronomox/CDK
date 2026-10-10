/**
 * GROQ queries. Every child-related document type is filtered on `approved == true`,
 * and every image passes through the consent check in lib/content/index.ts.
 */

const IMG = `{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  alt,
  showsIdentifiableChildren,
  consentConfirmed
}`;

const PARTNER = `{
  "id": _id,
  name,
  kind,
  description,
  website,
  "logo": select(logoDisplayPermission == true => logo${IMG}, null)
}`;

const TESTIMONIAL = `{ "id": _id, quote, attribution, role }`;

const VIDEO = `{
  "id": _id,
  title,
  description,
  youtubeUrl,
  "fileUrl": file.asset->url,
  "poster": poster${IMG},
  "projectTitle": project->title
}`;

export const programmesQuery = `*[_type == "programme" && defined(slug.current)] | order(order asc) {
  "slug": slug.current, title, summary, intro, highlights, audience, status, order,
  "image": image${IMG},
  skills[]{ title, description, status }
}`;

const PROJECT_FIELDS = `
  "slug": slug.current, title, date, location, school, context, whatWeDid, childrenReached, outcome, detailsPending,
  "coverImage": coverImage${IMG},
  "photos": photos[]${IMG},
  "videos": videos[@->approved == true]->${VIDEO},
  "testimonials": testimonials[@->approved == true]->${TESTIMONIAL},
  "sponsors": sponsors[@->confirmed == true]->${PARTNER}
`;

export const projectsQuery = `*[_type == "project" && approved == true && defined(slug.current)] | order(date desc) { ${PROJECT_FIELDS} }`;

export const projectBySlugQuery = `*[_type == "project" && approved == true && slug.current == $slug][0] { ${PROJECT_FIELDS} }`;

export const galleryQuery = `*[_type == "galleryItem" && approved == true] | order(_createdAt desc) {
  "id": _id, caption, category, "projectTitle": project->title, "image": image${IMG}
}`;

export const testimonialsQuery = `*[_type == "testimonial" && approved == true] | order(_createdAt desc) ${TESTIMONIAL}`;

export const videosQuery = `*[_type == "video" && approved == true] | order(_createdAt desc) ${VIDEO}`;

export const partnersQuery = `*[_type == "partner" && confirmed == true] | order(name asc) ${PARTNER}`;

const STORY_FIELDS = `"slug": slug.current, title, category, publishedAt, excerpt, "coverImage": coverImage${IMG}`;

export const storiesQuery = `*[_type == "story" && approved == true && defined(slug.current)] | order(publishedAt desc) { ${STORY_FIELDS} }`;

export const storyBySlugQuery = `*[_type == "story" && approved == true && slug.current == $slug][0] { ${STORY_FIELDS}, body[]{ ..., _type == "safeImage" => { ..., asset-> } } }`;
