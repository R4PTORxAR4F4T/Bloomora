"use client";

interface Address {
  _id: string;

  receiverName: string;

  phone: string;

  division: string;

  district: string;

  area: string;

  address: string;

  postalCode: string;
}

interface Props {
  addresses: Address[];

  value: string;

  onChange: (id: string) => void;
}

export default function AddressSelector({
  addresses,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">

      <div className="border-b px-6 py-4">

        <h2 className="text-lg font-semibold">
          Shipping Address
        </h2>

      </div>

      <div className="space-y-4 p-6">

        {addresses.length === 0 ? (

          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">
            No saved address found.
            <br />
            Please add an address from your account.
          </div>

        ) : (

          addresses.map((address) => (

            <label
              key={address._id}
              className={`block cursor-pointer rounded-xl border p-5 transition ${
                value === address._id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >

              <div className="flex items-start gap-4">

                <input
                  type="radio"
                  checked={value === address._id}
                  onChange={() =>
                    onChange(address._id)
                  }
                  className="mt-1"
                />

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold">
                      {address.receiverName}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {address.phone}
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-7 text-gray-600">

                    {address.address}

                    <br />

                    {address.area},{" "}
                    {address.district}

                    <br />

                    {address.division}

                    <br />

                    Postal Code:{" "}
                    {address.postalCode}

                  </p>

                </div>

              </div>

            </label>

          ))

        )}

      </div>

    </div>
  );
}