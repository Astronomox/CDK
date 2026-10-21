import type { Img } from "@/lib/content/types";

export type TeamMember = {
  name: string;
  role: string;
  photo: Img;
  /** CSS object-position for the portrait crop. */
  focus?: string;
  /** Zoom for full-length photos so every face sits at a similar size. */
  zoom?: number;
};

function portrait(file: string, width: number, height: number, name: string): Img {
  return { src: `/team/${file}`, alt: `Portrait of ${name}`, width, height };
}

/** Leadership team, in the order supplied by the organisation. */
export const TEAM: TeamMember[] = [
  { name: "Giwa Israel Genesis", role: "Executive Director", photo: portrait("giwa-israel-genesis.jpg", 1000, 1250, "Giwa Israel Genesis"), focus: "50% 25%" },
  { name: "Mosope David Faturoti", role: "Deputy Executive Director", photo: portrait("mosope-david-faturoti.jpg", 809, 1080, "Mosope David Faturoti"), focus: "50% 24%", zoom: 1.35 },
  { name: "Bello Blessing Mariam", role: "Director of Operations", photo: portrait("bello-blessing-mariam.jpg", 1000, 1499, "Bello Blessing Mariam"), focus: "50% 20%" },
  { name: "Anifowose Akachukwu", role: "Director of Administration", photo: portrait("anifowose-akachukwu.jpg", 1000, 1500, "Anifowose Akachukwu"), focus: "50% 25%" },
  { name: "Aminu Victoria", role: "Director of Programs", photo: portrait("aminu-victoria.jpg", 842, 1137, "Aminu Victoria"), focus: "50% 20%" },
  { name: "Ojanuga Julianah Oluwagbohunmi", role: "Director of Finance and Welfare", photo: portrait("ojanuga-julianah-oluwagbohunmi.png", 1000, 1330, "Ojanuga Julianah Oluwagbohunmi"), focus: "50% 20%" },
  { name: "Ojo Temiloluwa Deborah", role: "Director of Communication and Media", photo: portrait("ojo-temiloluwa-deborah.jpg", 1000, 1250, "Ojo Temiloluwa Deborah"), focus: "50% 25%" },
];
