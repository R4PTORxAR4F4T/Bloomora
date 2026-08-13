"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) { setInView(true); return; }
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
