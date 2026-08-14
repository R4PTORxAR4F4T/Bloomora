import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I get compliments every time I wear my Bloomora earrings — people can't believe they're clay.",
    name: "Anika R.",
    location: "Dhaka",
    initials: "AR",
    color: "#B78A61",
  },
  {
    quote:
      "So lightweight I forget I have them on by noon, and the packaging alone felt like a gift.",
    name: "Farhana T.",
    location: "Sylhet",
    initials: "FT",
    color: "#B97A78",
  },
  {
    quote:
      "Ordered a custom color for a wedding and it matched perfectly. Already planning my next piece.",
    name: "Mehjabin S.",
    location: "Khulna",
    initials: "MS",
    color: "#C48C75",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
            Kind Words
          </span>

          <h2 className="mt-4 text-4xl font-light text-[#3D2A22] md:text-5xl">
            Loved, Petal By Petal
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-[28px] border border-[#F0E4D6] bg-[#FBF7F2] p-8"
            >
              <div className="flex gap-1 text-[#B78A61]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="mt-5 leading-7 text-[#4A3B32]">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>

                <div>
                  <p className="font-semibold text-[#3D2A22]">
                    {t.name}
                  </p>

                  <p className="text-sm text-[#6F625B]">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
