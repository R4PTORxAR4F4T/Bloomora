import Reveal from "./Reveal";

const steps = [
  { num: "01", title: "Sculpt",    body: "Each petal is hand-shaped from raw polymer clay, one at a time, no two alike." },
  { num: "02", title: "Layer",     body: "Petals are cupped and layered by hand until the bloom has real depth." },
  { num: "03", title: "Cure & set",body: "Pieces are oven-cured, then fitted with gold-plated stainless findings." },
  { num: "04", title: "Finish",    body: "Every flower is hand-tipped at the edges and sealed against fading." },
];

export default function Process() {
  return (
    <section className="bg-ink px-[6vw] py-32" id="process">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-gold-bright text-xs font-semibold tracking-[0.24em] uppercase font-body">
            <span className="w-5 h-px bg-gold-bright" />
            From clay block to keepsake
          </span>
          <h2
            className="font-display font-medium text-ivory mt-5 leading-tight"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
          >
            How a bloom is built
          </h2>
          <p className="mt-5 text-ivory/68 max-w-md">
            Four unhurried steps, done at a bench in small batches — never molded, never mass-produced.
          </p>
        </Reveal>

        {/* steps grid */}
        <div className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 process-connector">
          {steps.map((s) => (
            <Reveal key={s.num} className="pr-8">
              {/* num sits on top of the connector line with bg so it breaks it */}
              <span className="relative z-10 bg-ink pr-3 font-display italic text-gold-bright text-lg">
                {s.num}
              </span>
              <h3 className="font-display font-medium text-ivory text-lg mt-6">{s.title}</h3>
              <p className="mt-2.5 text-ivory/60 text-sm leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
