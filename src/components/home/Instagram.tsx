import { AtSign, Flower2, Gem, Heart, Sparkles } from "lucide-react";

const TILES = [
  { icon: Flower2, bg: "#F4E7DC" },
  { icon: Gem, bg: "#EFE0CE" },
  { icon: Sparkles, bg: "#F7EEE3" },
  { icon: Heart, bg: "#F0E0DC" },
];

export default function Instagram() {
  return (
    <section className="bg-[#FBF7F2] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
              Community
            </span>

            <h2 className="mt-4 text-4xl font-light text-[#3D2A22] md:text-5xl">
              Follow Along{" "}
              <span className="font-serif italic text-[#B97A78]">
                @bloomora
              </span>
            </h2>

            <p className="mt-6 max-w-md leading-8 text-[#6F625B]">
              New drops, behind-the-scenes clay work, and the pieces
              our community styles their own way — tag us to be
              featured.
            </p>

            <a
              href="https://instagram.com/bloomora"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D6C2AF] bg-white px-6 py-3 font-medium text-[#7A5E46] transition hover:bg-[#F7F1EA]"
            >
              <AtSign size={18} />
              Follow on Instagram
            </a>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-2">
            {TILES.map(({ icon: Icon, bg }, index) => (
              <div
                key={index}
                className="flex aspect-square items-center justify-center rounded-3xl"
                style={{ backgroundColor: bg }}
              >
                <Icon size={28} className="text-[#B78A61]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
