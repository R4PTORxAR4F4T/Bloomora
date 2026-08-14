import { Feather, Gem, PackageCheck, RotateCcw } from "lucide-react";

const FEATURES = [
  {
    icon: Gem,
    title: "Handcrafted Quality",
    description:
      "Every petal is sculpted and cured by hand, so no two pieces are ever quite identical.",
  },
  {
    icon: Feather,
    title: "Light As A Petal",
    description:
      "Polymer clay is a fraction of the weight of resin or metal — made for all-day wear.",
  },
  {
    icon: PackageCheck,
    title: "Gift-Ready Packaging",
    description:
      "Every order ships in protective, gift-ready packaging so it arrives ready to give.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "Not the right fit? Reach out within 7 days of delivery for an easy return.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FBF7F2] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
            Why Bloomora
          </span>

          <h2 className="mt-4 text-4xl font-light text-[#3D2A22] md:text-5xl">
            Made With Care, Worn With Ease
          </h2>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon size={26} className="text-[#C48C75]" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#3D2A22]">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#6F625B]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
