"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] transition-all duration-500",
        scrolled
          ? "py-4 bg-black/[0.82] backdrop-blur-md border-b border-white/[0.08]"
          : "py-7",
      ].join(" ")}
    >
      <div className="font-display italic font-medium text-2xl text-ivory tracking-tight">
        Bloomora
      </div>

      <div className="hidden md:flex gap-10 text-sm tracking-wide">
        {["#collection", "#process", "#story", "#newsletter"].map((href, i) => (
          <a
            key={href}
            href={href}
            className="text-ivory/80 hover:text-ivory transition-opacity duration-200"
          >
            {["Collection", "The Process", "Story", "Care"][i]}
          </a>
        ))}
      </div>

      <a
        href="#collection"
        className="border border-gold text-gold-bright text-xs tracking-widest px-5 py-2.5 rounded-full hover:bg-gold hover:text-ink transition-all duration-300"
      >
        Shop the bloom
      </a>
    </nav>
  );
}
