import Image from "next/image";
import { SITE } from "@/lib/site";
import type { Img } from "@/lib/content/types";

const STATS = [
  { value: SITE.impact.childrenReached, label: "children reached" },
  { value: SITE.impact.outreaches, label: "school and community outreaches" },
  { value: SITE.impact.states, label: "where our outreaches have taken place", word: true },
];

/** The one deep blue band: only the three verified numbers, with short gold rules. */
export function StatsBand({ title = "Our impact so far", intro, image }: { title?: string; intro?: string; image?: Img }) {
  return (
    <section aria-labelledby="stats-heading" className="relative isolate overflow-hidden bg-blue-ink py-12 text-white sm:py-16 lg:py-28">
      {image ? (
        <>
          <Image src={image.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-ink/90 via-blue-ink/85 to-blue-ink/95" />
        </>
      ) : null}
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 lg:mb-16">
          <div>
            <p className="mb-3 font-sans text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#D5E3F0]">Our impact</p>
            <h2 id="stats-heading" className="max-w-[18ch] text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] font-semibold leading-[1.15] text-white">
              {title}
            </h2>
          </div>
          <p className="max-w-[36ch] text-[#D5E3F0]">{intro ?? "Every outreach is a day of conversation, games, music and encouragement for children."}</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-5 min-[900px]:grid-cols-3 min-[900px]:gap-x-10">
          {STATS.map((s) => (
            <li key={s.label} className={`grid content-start gap-2 border-t border-white/20 py-5 min-[900px]:gap-2.5 min-[900px]:border-0 min-[900px]:py-0 ${s.word ? "col-span-2 min-[900px]:col-span-1" : ""}`}>
              <span aria-hidden className="mb-2 h-1 w-10 rounded bg-gold min-[900px]:mb-3 min-[900px]:w-12" />
              <span
                className={
                  s.word
                    ? "font-heading text-[1.9rem] font-semibold leading-[1.1] text-white min-[900px]:text-[clamp(2rem,1.6rem+1.6vw,3rem)]"
                    : "font-heading text-[2.6rem] font-semibold leading-none tracking-[-0.02em] text-white tabular-nums min-[900px]:text-[clamp(3rem,2.2rem+3vw,4.5rem)]"
                }
              >
                {s.value}
              </span>
              <span className="text-[0.95rem] leading-[1.4] text-[#D5E3F0] min-[900px]:text-[1.0625rem] min-[900px]:leading-[1.45]">{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-none border-t border-white/20 pt-5 text-[0.9375rem] text-[#D5E3F0]">Figures from our own outreach records.</p>
      </div>
    </section>
  );
}
