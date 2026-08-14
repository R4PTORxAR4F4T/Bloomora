const STEPS = [
  {
    number: "01",
    title: "Sculpt",
    description:
      "Every petal and leaf begins as raw polymer clay, shaped entirely by hand.",
  },
  {
    number: "02",
    title: "Layer & Detail",
    description:
      "Petals are layered for depth, then hand-painted with fine detail work.",
  },
  {
    number: "03",
    title: "Cure & Set",
    description:
      "Pieces are cured for durability, then set onto nickel-free findings.",
  },
  {
    number: "04",
    title: "Finish & Inspect",
    description:
      "Each piece is polished, quality-checked, and packaged for its new home.",
  },
];

export default function Process() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
            How It's Made
          </span>

          <h2 className="mt-4 text-4xl font-light text-[#3D2A22] md:text-5xl">
            From Clay To Keepsake
          </h2>
        </div>

        <div className="relative grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-[#EADFCF] lg:block" />

          {STEPS.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#B78A61] font-serif text-xl text-white">
                {step.number}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-[#3D2A22]">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#6F625B]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
