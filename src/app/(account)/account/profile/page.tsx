"use client";

import { useAuth } from "@/src/hooks/useAuth";
import Image from "next/image";
import ProfileForm from "@/src/components/account/profile/ProfileForm";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-5xl px-6 py-28">
      <h1 className="text-4xl font-light">
        My Profile
      </h1>

      <div className="mt-10 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex items-center gap-6">
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.name}
              width={90}
              height={90}
              className="rounded-full"
            />
          )}

          <div>
            <h2 className="text-2xl font-semibold">
              {user?.name}
            </h2>

            <p className="text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>

        <ProfileForm />
      </div>
    </main>
  );
}