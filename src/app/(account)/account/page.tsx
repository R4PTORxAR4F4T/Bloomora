import Link from "next/link";
import { User, MapPin, Package } from "lucide-react";

export default function AccountPage() {
  const cards = [
    {
      title: "My Profile",
      description: "Manage your personal information.",
      href: "/account/profile",
      icon: User,
    },
    {
      title: "My Addresses",
      description: "Manage your delivery addresses.",
      href: "/account/address",
      icon: MapPin,
    },
    {
      title: "My Orders",
      description: "Track and view your orders.",
      href: "/account/orders",
      icon: Package,
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-28">
      <h1 className="text-4xl font-light text-[#3D2A22]">
        My Account
      </h1>

      <p className="mt-2 text-gray-500">
        Manage your Bloomora account.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Icon
                size={38}
                className="text-[#B78A61]"
              />

              <h2 className="mt-5 text-xl font-semibold">
                {card.title}
              </h2>

              <p className="mt-2 text-gray-500">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}