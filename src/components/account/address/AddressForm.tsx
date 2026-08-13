"use client";

import { useEffect, useState } from "react";
import { Address } from "@/src/types/user";

interface Props {
  initialValues?: Address;
  loading?: boolean;
  onSubmit: (data: Address) => void;
}

const emptyAddress: Address = {
  label: "",
  receiverName: "",
  phone: "",
  division: "",
  district: "",
  area: "",
  address: "",
  postalCode: "",
  isDefault: false,
};

export default function AddressForm({
  initialValues,
  loading,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<Address>(emptyAddress);

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  }

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        name="label"
        placeholder="Home / Office"
        value={form.label}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="receiverName"
        placeholder="Receiver Name"
        value={form.receiverName}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="division"
        placeholder="Division"
        value={form.division}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="area"
        placeholder="Area"
        value={form.area}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="address"
        placeholder="Full Address"
        value={form.address}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <input
        name="postalCode"
        placeholder="Postal Code"
        value={form.postalCode}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
        />
        Set as default address
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
}