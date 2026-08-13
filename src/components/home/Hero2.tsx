"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flower2, Gift, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className=" static overflow-hidden bg-[#FBF7F2] bg-bottom-right" style={{ backgroundImage: "url('/images/hero-bg.png')", height: "100vh", backgroundSize: "cover"}}>
      {/* Background Decoration */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#F4E7DC] blur-3xl opacity-40" />
      {/* <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-[#F8EEE5] blur-3xl opacity-50" /> */}

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center px-6 pt-20 lg:flex-row lg:gap-16">

        <div className="flex-1 text-center lg:text-left">

          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-[#B07A5A] shadow-sm">
            <Flower2 size={18} />
            Handmade With Love
          </span>

          <h1 className="mt-8 text-5xl font-light leading-tight text-[#3D2A22] md:text-7xl">
            Blooming Beauty,
            <br />
            <span className="font-serif italic text-[#B97A78]">
              Forever Yours
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#6E625C]">
            Discover handcrafted polymer clay flower jewelry inspired by nature.
            Every bloom is individually sculpted, creating timeless pieces that
            celebrate elegance, craftsmanship and femininity.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#B78A61] px-8 py-4 font-medium text-white transition hover:bg-[#a3774d]"
            >
              Shop Collection
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-[#D6C2AF] bg-white px-8 py-4 font-medium text-[#7A5E46] transition hover:bg-[#F7F1EA]"
            >
              Our Story
            </Link>

          </div>

          {/* Features */}

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-3 shadow">
                <Flower2 className="text-[#C48C75]" />
              </div>

              <div>
                <p className="font-semibold text-[#3D2A22]">
                  Custom Handmade
                </p>

                <p className="text-sm text-gray-500">
                  Every piece unique
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-3 shadow">
                <Sparkles className="text-[#C48C75]" />
              </div>

              <div>
                <p className="font-semibold text-[#3D2A22]">
                  Lightweight
                </p>

                <p className="text-sm text-gray-500">
                  Comfortable all day
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-3 shadow">
                <Gift className="text-[#C48C75]" />
              </div>

              <div>
                <p className="font-semibold text-[#3D2A22]">
                  Gift Ready
                </p>

                <p className="text-sm text-gray-500">
                  Premium packaging
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}