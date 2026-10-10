import type { StructureResolver } from "sanity/structure";

/** Groups the Studio sidebar so items awaiting safeguarding approval are easy to find. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Awaiting approval")
        .child(
          S.documentList()
            .title("Not yet approved")
            .filter('_type in ["project", "galleryItem", "video", "testimonial", "story"] && approved != true'),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("galleryItem").title("Gallery"),
      S.documentTypeListItem("video").title("Videos"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("story").title("Stories and news"),
      S.divider(),
      S.documentTypeListItem("programme").title("Programmes"),
      S.documentTypeListItem("partner").title("Sponsors and partners"),
    ]);
