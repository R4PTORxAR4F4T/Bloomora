"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const products = [
  { tag: "Earrings", name: "The Bloom Drops",   price: "$58",  pos: "22% 46%" },
  { tag: "Necklace", name: "The Bloom Pendant",  price: "$72",  pos: "70% 18%" },
  { tag: "The set",  name: "The Full Garden",    price: "$118", pos: "78% 72%" },
];

function TiltCard({ product }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = ref.current;
    if (rm || !card || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = ref.current;
    if (rm || !card) return;
    const move = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateY(-4px)`;
    };
    const leave = () => { card.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)"; };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", leave);
    return () => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} rounded-2xl overflow-hidden bg-ivory shadow-warm-lg hover:shadow-warm-xl cursor-pointer transition-shadow duration-300 [transform-style:preserve-3d]`}
    >
      <div
        className="h-[280px] bg-hero-photo bg-[280%]"
        style={{ backgroundPosition: product.pos }}
      />
      <div className="p-6 pb-7">
        <span className="text-[0.7rem] tracking-[0.16em] uppercase text-rose-deep font-body">{product.tag}</span>
        <h3 className="font-display font-medium text-espresso text-xl mt-2">{product.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="font-display italic text-gold-deep text-lg">{product.price}</span>
          <span className="text-sm text-espresso border-b border-espresso pb-0.5">View piece</span>
        </div>
      </div>
    </div>
  );
}

export default function Collection() {
  return (
    <section className="bg-porcelain-2 px-[6vw] py-32 text-espresso" id="collection">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="flex flex-wrap justify-between items-end gap-8">
          <div>
            <span className="inline-flex items-center gap-2 text-rose-deep text-xs font-semibold tracking-[0.24em] uppercase font-body">
              <span className="w-5 h-px bg-rose-deep" />
              The current bloom
            </span>
            <h2
              className="font-display font-medium text-espresso mt-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
            >
              This season&apos;s collection
            </h2>
          </div>
          <p className="max-w-[360px] text-espresso-soft text-base">
            Three ways to wear the same hand-sculpted flower — mix them, or wear the full set.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 [perspective:1600px]">
          {products.map((p) => <TiltCard product={p} key={p.name} />)}
        </div>
      </div>
    </section>
  );
}
