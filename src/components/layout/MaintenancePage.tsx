"use client";

import Image from "next/image";
import { Wrench, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

export default function MaintenancePage() {

  const router = useRouter();
  const { user, logout , login } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf8f5]">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#B78A61]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">

        {/* Logo */}

        <Image
          src="/logo/bloomora.png"
          alt="Bloomora"
          width={170}
          height={170}
          className="mx-auto mb-8"
          priority
        />

        {/* Icon */}

        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#B78A61]/10">

          <Wrench
            size={36}
            className="text-[#B78A61]"
          />

        </div>

        {/* Heading */}

        <h1 className="text-5xl font-light tracking-wide text-gray-900">

          We'll Be Back Soon

        </h1>

        {/* Description */}

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">

          Bloomora is currently undergoing scheduled
          maintenance to improve your shopping
          experience.

        </p>

        {
          user ? (
            <button
              onClick={handleLogout}
              className="mt-10 rounded-lg border px-5 py-3"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="mt-10 rounded-lg border px-5 py-3"
            >
              Login
            </button>
          )
        }

        <p className="mt-3 text-gray-500">

          We appreciate your patience and look forward
          to welcoming you back shortly.

        </p>

        {/* Divider */}

        <div className="mx-auto my-10 h-px w-28 bg-[#B78A61]" />

        {/* Contact */}

        <div className="flex items-center justify-center gap-3 text-gray-600">

          <Mail
            size={18}
            className="text-[#B78A61]"
          />

          <span>

            support@bloomora.com

          </span>

        </div>

        {/* Footer */}

        <p className="mt-12 text-sm tracking-wide text-gray-400">

          © {new Date().getFullYear()} Bloomora

        </p>

      </div>

    </main>
  );
}