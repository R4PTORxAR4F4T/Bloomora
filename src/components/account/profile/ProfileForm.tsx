"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/src/hooks/useAuth";
import profileService from "@/src/services/profile.service";

export default function ProfileForm() {
  const { user, refreshUser } = useAuth();

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      phone: user.phone || "",
    });
  }, [user]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      setLoading(true);

      await profileService.updateProfile(form);

      await refreshUser();

      toast.success("Profile updated successfully.");

      setEditing(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">

      <div>
        <label className="text-sm text-gray-500">
          Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!editing}
          className="mt-2 w-full rounded-lg border p-3 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">
          Email
        </label>

        <input
          value={user?.email || ""}
          disabled
          className="mt-2 w-full rounded-lg border bg-gray-100 p-3"
        />
      </div>

      <div>
        <label className="text-sm text-gray-500">
          Phone
        </label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={!editing}
          className="mt-2 w-full rounded-lg border p-3 disabled:bg-gray-100"
        />
      </div>

      <div className="flex items-end gap-3">

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg bg-green-600 px-5 py-3 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => {
                setEditing(false);

                setForm({
                  name: user?.name || "",
                  phone: user?.phone || "",
                });
              }}
              className="rounded-lg border px-5 py-3"
            >
              Cancel
            </button>
          </>
        )}

      </div>

    </div>
  );
}