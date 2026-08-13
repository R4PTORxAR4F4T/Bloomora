"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="bg-porcelain px-[6vw] py-28 text-espresso" id="newsletter">
      <Reveal className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 text-rose-deep text-xs font-semibold tracking-[0.24em] uppercase font-body">
          <span className="w-5 h-px bg-rose-deep" />
          Care &amp; new blooms
        </span>
        <h2
          className="font-display font-medium text-espresso mt-5 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
        >
          Get first pick of new blooms
        </h2>
        <form
          className="mt-8 flex gap-3 w-full max-w-sm flex-col sm:flex-row"
          onSubmit={(e) => { e.preventDefault(); setDone(true); }}
        >
          <input
            type="email"
            placeholder="you@email.com"
            required
            aria-label="Email address"
            className="flex-1 px-5 py-3.5 rounded-full border border-espresso/25 bg-porcelain-2 text-espresso font-body text-sm focus:outline-none focus:ring-2 focus:ring-rose-deep focus:ring-offset-2"
          />
          <button
            type="submit"
            className="bg-espresso text-porcelain-2 rounded-full px-6 text-sm tracking-wide hover:bg-rose-deep transition-colors duration-300 py-3.5 sm:py-0 whitespace-nowrap"
          >
            {done ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>
        <p className="mt-4 text-xs text-espresso-soft">
          One email a month. Includes a petal-care guide. Unsubscribe anytime.
        </p>
      </Reveal>
    </section>
  );
}
