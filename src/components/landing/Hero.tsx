"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef    = useRef(null);
  const heroWrapRef = useRef(null);
  const heroPhotoRef = useRef(null);
  const flowerRef  = useRef(null);

  // hero photo 3D mouse tilt
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = heroWrapRef.current;
    const photo = heroPhotoRef.current;
    if (rm || !wrap || !photo) return;
    const move = (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      photo.style.transform = `perspective(1400px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
    };
    const leave = () => { photo.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)"; };
    wrap.addEventListener("mousemove", move);
    wrap.addEventListener("mouseleave", leave);
    return () => { wrap.removeEventListener("mousemove", move); wrap.removeEventListener("mouseleave", leave); };
  }, []);

  // flower scroll-driven animation
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = heroRef.current;
    const flower = flowerRef.current;
    if (rm || !hero || !flower) return;
    let ticking = false;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const p = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      flower.style.transform = `translate(${p * 40}px, ${p * -70}px) rotate(${p * 55}deg) scale(${1 + p * 0.12})`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ambient gold particles
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = heroRef.current;
    if (rm || !hero) return;
    const count = window.innerWidth < 700 ? 6 : 12;
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      const size = 3 + Math.random() * 6;
      Object.assign(s.style, {
        position: "absolute", borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, #e6c979, transparent 70%)",
        opacity: "0.55",
        width: `${size}px`, height: `${size}px`,
        left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
        animation: `floaty ${8 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite`,
      });
      hero.appendChild(s);
      nodes.push(s);
    }
    return () => nodes.forEach((n) => n.remove());
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-screen flex items-center px-[6vw] pt-36 pb-20 overflow-hidden"
      style={{
        background: "linear-gradient(120deg, rgba(28,19,15,0.35), rgba(28,19,15,0.05))",
      }}
    >
      {/* radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(60% 50% at 18% 30%, rgba(28,19,15,0.2), transparent 60%)" }} />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-[3vw] items-center w-full">

        {/* copy */}
        <div className="reveal in max-w-xl">
          {/* eyebrow */}
          <span className="inline-flex items-center gap-2 text-gold-bright text-xs font-semibold tracking-[0.24em] uppercase font-body mb-6">
            <span className="w-5 h-px bg-gold-bright" />
            Handmade in polymer clay
          </span>

          <h1 className="font-display font-medium text-ivory leading-[1.04]"
              style={{ fontSize: "clamp(2.6rem, 5.4vw, 4.6rem)" }}>
            Flowers that<br />
            keep <em className="italic text-rose not-italic font-normal">their bloom.</em>
          </h1>

          <p className="mt-6 max-w-[440px] text-ivory/70 text-lg leading-relaxed">
            Bloomora shapes every petal by hand — cast in clay, dusted in gold, made to outlast the season it was named for.
          </p>

          <div className="flex items-center gap-6 mt-10">
            <a
              href="#collection"
              className="inline-block bg-gradient-to-br from-gold-bright to-gold-deep text-ink font-medium text-sm tracking-wide px-8 py-4 rounded-full shadow-gold hover:-translate-y-0.5 hover:shadow-gold-lg transition-all duration-300"
            >
              Step into the garden
            </a>
            <a href="#process" className="btn-text-link text-sm text-ivory/75">
              How it&apos;s made
            </a>
          </div>
        </div>

        {/* photo card */}
        <div
          ref={heroWrapRef}
          className="relative [height:min(66vh,620px)] [transform-style:preserve-3d]"
        >
          <div
            ref={heroPhotoRef}
            className="absolute inset-0 rounded-[18px] bg-hero-photo bg-cover bg-[52%_42%] shadow-warm hero-photo-glint transition-transform duration-150 will-change-transform [transform-style:preserve-3d]"
          />
          {/* gold frame behind */}
          <div className="absolute -inset-3.5 rounded-[24px] border border-gold/35 pointer-events-none [transform:translateZ(-30px)]" />

          {/* real flower cutout */}
          <div
            ref={flowerRef}
            className="absolute -left-[90px] -bottom-[70px] z-20 w-[220px] h-[220px] will-change-transform"
          >
            {/* glow halo */}
            <div
              className="absolute inset-[10%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(230,201,121,0.45), transparent 70%)",
                filter: "blur(18px)",
              }}
            />
            <div className="relative w-full h-full animate-float-bob">
              <img
                src="/flower-cutout.png"
                alt="Hand-sculpted Bloomora clay flower pendant"
                className="w-full h-full object-contain"
                style={{ filter: "drop-shadow(0 18px 26px rgba(0,0,0,0.45))" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute left-[6vw] bottom-10 z-20 flex items-center gap-3 text-[0.72rem] tracking-[0.2em] uppercase text-ivory/60">
        <span className="cue-line" />
        Scroll
      </div>
    </section>
  );
}
