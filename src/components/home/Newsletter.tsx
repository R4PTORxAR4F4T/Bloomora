"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    // NOTE: there's no newsletter-subscription endpoint on the backend
    // yet, so this only confirms locally. Wire this up to a real
    // /api/newsletter route (or a provider like Mailchimp) before launch.
    setSubscribed(true);
  }

  return (
    <section className="relative overflow-hidden bg-[#2E1F17] py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
          <Image
            src="/images/flower-cutout.png"
            alt=""
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        <h2 className="mt-6 text-4xl font-light text-white md:text-5xl">
          Never Miss A{" "}
          <span className="font-serif italic text-[#D9AE84]">
            New Bloom
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-md leading-7 text-white/70">
          Join our list for early access to new drops, restock
          alerts, and the occasional jewelry care tip. No spam,
          ever.
        </p>

        {subscribed ? (
          <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-medium text-white">
            <Check size={18} className="text-[#D9AE84]" />
            You're on the list!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-[#B78A61] px-7 py-3 font-semibold text-white transition hover:bg-[#a3774d]"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
