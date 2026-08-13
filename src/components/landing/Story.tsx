import Reveal from "./Reveal";

export default function Story() {
  return (
    <Reveal as="section" className="bg-porcelain px-[6vw] py-32" id="story">
      <div className="max-w-3xl mx-auto text-center text-espresso">
        <span className="inline-flex items-center gap-2 text-rose-deep text-xs font-semibold tracking-[0.24em] uppercase font-body">
          <span className="w-5 h-px bg-rose-deep" />
          Why clay, why flowers
        </span>
        <h2
          className="font-display font-medium text-espresso mt-5 leading-tight"
          style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)" }}
        >
          Real flowers fade in <em className="italic text-rose-deep">days.</em>
          <br />These ones don&apos;t.
        </h2>
        <p className="mt-7 text-espresso-soft text-lg leading-relaxed max-w-xl mx-auto">
          Every bloom starts as a lump of raw clay and a reference photo of the real thing — gathered, pressed, studied. We sculpt each petal, cup it by hand, and layer it until the flower looks like it just opened. Then we cure it, so it never will again.
        </p>
      </div>
    </Reveal>
  );
}
