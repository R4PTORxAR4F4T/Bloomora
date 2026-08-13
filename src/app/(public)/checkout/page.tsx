"use client";

import { useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import customerOrderService from "@/src/services/customer-order.service";
import CheckoutSummary from "@/src/components/account/checkout/CheckoutSummary";
import AddressSelector from "@/src/components/account/checkout/AddressSelector";
import PaymentMethodSelector from "@/src/components/account/checkout/PaymentMethodSelector";
import PlaceOrderCard from "@/src/components/account/checkout/PlaceOrderCard";
import { AuthContext } from "@/src/context/AuthContext";
import { toast } from "sonner";
import { CheckoutData } from "@/src/types/order";
import CouponCard from "@/src/components/account/checkout/CouponCard";


export default function CheckoutPage() {
  const [couponCode, setCouponCode] =
  useState("");

  const [appliedCoupon, setAppliedCoupon] =
    useState<any>(null);

  const [discount, setDiscount] =
    useState(0);

  const { loading: authLoading, user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [checkout, setCheckout] = useState<CheckoutData | null>(null);

  const [addressId, setAddressId] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<
      "cod" | "sslcommerz" | "bkash" | "nagad"
    >("cod");

  async function loadCheckout() {
    try {
      setLoading(true);

      const data = await customerOrderService.getCheckout();

      setCheckout(data);
      setAppliedCoupon(data.appliedCoupon || null);
      setDiscount(data.discount ?? 0);

      if (data.addresses.length > 0) {
        setAddressId(data.addresses[0]._id);
      }
    } catch (error) {
      console.error("Failed to load checkout:", error);
      toast.error(
        "No Address to load checkout. Please create profile."
      );
      setCheckout(null);
    } finally {
      setLoading(false);
    }
  }

  function handleCouponApply(
    code: string,
    discount: number,
    coupon: any
  ) {
    setCouponCode(code);

    setAppliedCoupon(coupon);

    setDiscount(discount);
  }

  function handleCouponRemove() {
    setCouponCode("");

    setAppliedCoupon(null);

    setDiscount(0);
  }

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    loadCheckout();
  }, [authLoading, user]);

  // Wait for Firebase auth
  if (authLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2
          className="animate-spin"
          size={34}
        />
      </div>
    );
  }

  // Wait for checkout request
  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2
          className="animate-spin"
          size={34}
        />
      </div>
    );
  }

  if (!checkout) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Checkout unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-10 my-20">
      <div>
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <p className="text-gray-500">
          Review your order before placing it.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <>
            <CheckoutSummary
              checkout={{
                ...checkout,
                discount,
                total:
                  checkout.subtotal +
                  checkout.shippingFee -
                  discount,
              }}
            />

            <CouponCard
              subtotal={checkout.subtotal}
              appliedCoupon={appliedCoupon}
              onApply={handleCouponApply}
              onRemove={handleCouponRemove}
            />
          </>

          <AddressSelector
            addresses={checkout.addresses}
            value={addressId}
            onChange={setAddressId}
          />

          <PaymentMethodSelector
            methods={checkout.paymentMethods}
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>

        <PlaceOrderCard
          checkout={{
            ...checkout,
            discount,
            total:
              checkout.subtotal +
              checkout.shippingFee -
              discount,
          }}
          addressId={addressId}
          paymentMethod={paymentMethod}
          couponCode={couponCode}
        />
      </div>
    </div>
  );
}