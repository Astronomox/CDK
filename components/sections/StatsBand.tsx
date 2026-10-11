import { SITE } from "@/lib/site";

const STATS = [
  { value: SITE.impact.childrenReached, label: "children reached" },
  { value: SITE.impact.outreaches, label: "school and community outreaches" },
  { value: SITE.impact.states, label: "where our outreaches have taken place", word: true },
];

/** The one deep blue band: only the three verified numbers, with short gold rules. */
export function StatsBand({ title = "Our impact so far", intro }: { title?: string; intro?: string }) {
  return (
    <section aria-labelledby="stats-heading" className="bg-blue-ink py-16 text-white lg:py-24">
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
        <ul className="grid min-[900px]:grid-cols-3 min-[900px]:gap-10">
          {STATS.map((s) => (
            <li key={s.label} className="grid content-start gap-2.5 border-t border-white/20 py-7 min-[900px]:border-0 min-[900px]:py-0">
              <span aria-hidden className="mb-3 h-1 w-12 rounded bg-gold" />
              <span
                className={
                  s.word
                    ? "font-heading text-[clamp(2rem,1.6rem+1.6vw,3rem)] font-semibold leading-[1.1] text-white"
                    : "font-heading text-[clamp(3rem,2.2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.02em] text-white tabular-nums"
                }
              >
                {s.value}
              </span>
              <span className="text-[1.0625rem] leading-[1.45] text-[#D5E3F0]">{s.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-12 border-t border-white/20 pt-5 text-[0.9375rem] text-[#D5E3F0]">Figures from our own outreach records.</p>
      </div>
    </section>
  );
}
