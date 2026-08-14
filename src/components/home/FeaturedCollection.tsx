"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Flower Earrings",
    description:
      "Delicate handcrafted blossoms designed to bloom beautifully with every outfit.",
    image: "/images/hero-jewelry.png",
    href: "/shop?subcategories=earrings",
  },
  {
    title: "Jewelry",
    description:
      "Exquisite handmade floral jewelry, perfect for adding a touch of elegance to any ensemble.",
    image: "/images/hero-jewelry.png",
    href: "/shop?category=jewelry",
  },
  {
    title: "Luxury Gift Sets",
    description:
      "Beautifully packaged handmade jewelry, perfect for meaningful gifts.",
    image: "/images/hero-jewelry.png",
    href: "/shop?category=gift-set",
  },
  {
    title: "New Arrivals",
    description:
      "Discover Bloomora's latest handcrafted floral creations.",
    image: "/images/hero-jewelry.png",
    href: "/shop?sort=new",
  },
];

export default function FeaturedCollection() {
  return (
    <section className="bg-[#FBF7F2] py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
            Signature Collection
          </span>

          <h2 className="mt-4 text-5xl font-light text-[#3D2A22] md:text-6xl">
            Discover Bloomora
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#6F625B]">
            Every collection celebrates the beauty of nature through
            handcrafted polymer clay flowers designed to be timeless,
            lightweight, and unforgettable.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {collections.map((item) => (

            <div
              key={item.title}
              className="group overflow-hidden rounded-[28px] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative aspect-[4/5] overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              </div>

              {/* Content */}

              <div className="p-7">

                <h3 className="text-2xl font-semibold text-[#3D2A22]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-[#6E625C]">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-2 font-medium text-[#B68663] transition hover:gap-4"
                >
                  Shop Collection

                  <ArrowRight size={18} />

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}