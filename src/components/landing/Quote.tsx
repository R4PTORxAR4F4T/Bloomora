import Reveal from "./Reveal";

export default function Quote() {
  return (
    <Reveal as="section" className="bg-ink px-[6vw] py-28 text-center">
      <blockquote className="max-w-2xl mx-auto font-display italic text-ivory leading-relaxed"
        style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>
        &ldquo;I forget I&apos;m wearing anything — until someone asks where the flowers are from.&rdquo;
        <cite className="not-italic block mt-6 text-xs tracking-[0.1em] uppercase text-gold-bright font-body">
          A Bloomora customer, Portland
        </cite>
      </blockquote>
    </Reveal>
  );
}
