import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const TRAITS = [
  "Hand-Sculpted Petals",
  "Made To Order",
  "Nickel-Free Findings",
];

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-white py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-[#F4E7DC]" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
            <Image
              src="/images/hero-jewelry.png"
              alt="Bloomora jewelry being hand-finished"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -right-6 flex h-28 w-28 items-center justify-center rounded-full border border-[#EADFCF] bg-white shadow-lg">
            <Image
              src="/images/flower-cutout.png"
              alt=""
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </div>

        <div>
          <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
            Our Story
          </span>

          <h2 className="mt-4 text-4xl font-light text-[#3D2A22] md:text-5xl">
            Handformed,{" "}
            <span className="font-serif italic text-[#B97A78]">
              petal by petal
            </span>
          </h2>

          <p className="mt-6 leading-8 text-[#6F625B]">
            Every piece at Bloomora starts as a lump of polymer clay
            on a small worktable — no molds, no mass production.
            Each petal is shaped, layered, and cured by hand before
            it's set onto findings you can wear every day.
          </p>

          <p className="mt-4 leading-8 text-[#6F625B]">
            We designed Bloomora for people who want jewelry that
            feels personal: lightweight enough to forget you're
            wearing it, and detailed enough that someone always
            asks where it's from.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {TRAITS.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-[#EADFCF] bg-[#FBF7F2] px-4 py-2 text-sm font-medium text-[#7A5E46]"
              >
                {trait}
              </span>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 font-medium text-[#B68663] transition hover:gap-4"
          >
            Read Our Full Story
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
