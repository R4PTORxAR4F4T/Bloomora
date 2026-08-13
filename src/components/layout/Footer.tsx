import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-2xl font-bold">
          BLOOMORA
        </h2>

        <p className="mb-8 text-gray-500">
          Handmade polymer clay flower jewelry crafted with
          love.
        </p>

        <div className="flex gap-6">
          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>

          <Link href="/privacy">Privacy</Link>

          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}