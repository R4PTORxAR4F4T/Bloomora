interface Props {
  status:
    | "pending"
    | "paid"
    | "failed"
    | "refunded";
}

const colors = {
  pending:
    "bg-yellow-100 text-yellow-700",

  paid:
    "bg-green-100 text-green-700",

  failed:
    "bg-red-100 text-red-700",

  refunded:
    "bg-gray-200 text-gray-700",
};

export default function PaymentStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${colors[status]}`}
    >
      {status}
    </span>
  );
}