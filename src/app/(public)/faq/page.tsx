"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What is polymer clay jewelry?",
    answer:
      "Polymer clay is a soft, moldable material that's hand-shaped and then oven-cured until firm and durable. It's lightweight, holds fine detail beautifully, and lets us hand-paint each petal individually.",
  },
  {
    question: "How do I take care of my jewelry?",
    answer:
      "Keep pieces away from water, perfume, and direct sunlight for long periods, and store them flat or hanging so petals don't get crushed. A soft, dry cloth is all you need to keep them looking fresh.",
  },
  {
    question: "Can I request a custom color?",
    answer:
      "Many of our pieces support color customization — look for a color selector on the product page. For fully custom requests, reach out through our Contact page and we'll do our best to help.",
  },
  {
    question: "What's your return policy?",
    answer:
      "Unworn items in original condition can be returned within 7 days of delivery. Made-to-order or customized pieces are final sale unless they arrive damaged. See our Terms & Conditions for full details.",
  },
  {
    question: "Do the findings contain nickel?",
    answer:
      "We use nickel-free findings across our pieces. If you have a specific sensitivity, feel free to check with us before ordering.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll be able to view its status from your Account page under Orders. You'll also receive updates by email.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
        Support
      </span>

      <h1 className="mt-4 text-5xl font-light text-[#3D2A22]">
        Frequently Asked Questions
      </h1>

      <p className="mt-6 leading-8 text-[#6F625B]">
        Can't find what you're looking for? Reach out on our{" "}
        <Link href="/contact" className="font-medium text-[#B78A61]">
          Contact page
        </Link>{" "}
        and we'll get back to you.
      </p>

      <div className="mt-12 divide-y divide-[#F0E4D6] rounded-2xl border border-[#F0E4D6]">
        {FAQS.map((faq, index) => {
          const open = openIndex === index;

          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-[#3D2A22]">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 text-[#B78A61] transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="px-6 pb-6">
                  <p className="leading-7 text-[#6F625B]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
