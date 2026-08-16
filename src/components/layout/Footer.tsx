export default function Footer() {
  const cols = [
    { title: "Shop",    links: [["#collection","Earrings"],["#collection","Necklaces"],["#collection","Gift sets"]] },
    { title: "Company", links: [["#story","Story"],["#newsletter","Care guide"],["#","Contact"]] },
    { title: "Follow",  links: [["#","Instagram"],["#","Facebook"],["#","TikTok"]] },
  ];

  return (
    <footer className="bg-dark px-[6vw] pt-20 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] gap-12 pb-14 border-b border-white/[0.08]">
        <div>
          <div className="font-display italic font-medium text-2xl text-ivory">Bloomora</div>
          <p className="mt-4 max-w-[280px] text-sm text-ivory/55 leading-relaxed">
            Hand-sculpted polymer clay flowers, made to be worn — not watered.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-[0.78rem] tracking-[0.1em] uppercase text-gold-bright font-body mb-4">{col.title}</h4>
            {col.links.map(([href, label]) => (
              <a key={label} href={href} className="block text-sm text-ivory/68 mb-3 hover:text-ivory transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between items-center pt-7 gap-3 text-xs text-ivory/40">
        <span>© 2026 Bloomora. Handmade, one petal at a time.</span>
        <span>Made on a bench, not in a factory.</span>
      </div>
    </footer>
  );
}
