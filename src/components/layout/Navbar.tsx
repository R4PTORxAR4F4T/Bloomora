"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  User,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/src/hooks/useAuth";
import { useCart } from "@/src/hooks/useCart";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  const {
    cartCount,
  } = useCart();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="absolute left-0 right-0 top-0 z-50 text-[#2E1910]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center justify-center text-4xl font-bold tracking-widest"
        >
          <img
            src="/logo/bloomora.png"
            alt="Bloomora"
            className="h-14"
          />
        </Link>

        {/* Navigation */}

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#B78A61]"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Cart */}

          <Link
            href="/cart"
            className="group relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#F3E8DB]"
          >
            <ShoppingBag
              size={22}
              className="transition group-hover:scale-110 group-hover:text-[#B78A61]"
            />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#B78A61]
                  px-1
                  text-[10px]
                  font-bold
                  leading-none
                  text-white
                "
              >
                {cartCount > 99
                  ? "99+"
                  : cartCount}
              </span>
            )}
          </Link>

          {!user ? (
            <Link
              href="/login"
              className="rounded-full border border-[#B78A61] px-5 py-2 transition hover:bg-[#B78A61] hover:text-white"
            >
              Login
            </Link>
          ) : (
            <div
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="flex items-center gap-2"
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-[#B78A61]"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B78A61] text-white">
                    <User size={20} />
                  </div>
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">

                  <div className="border-b px-4 py-3">
                    <p className="font-semibold">
                      {user.name}
                    </p>

                    <p className="truncate text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/account"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-100"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <button
                    onClick={async () => {
                      setOpen(false);
                      await logout();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </header>
  );
}