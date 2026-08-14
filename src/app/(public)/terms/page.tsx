import Link from "next/link";

const SECTIONS = [
  {
    title: "1. Acceptance Of Terms",
    body: `By accessing or placing an order with Bloomora, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our site or services.`,
  },
  {
    title: "2. About Our Products",
    body: `Every Bloomora piece is hand-sculpted from polymer clay, so small variations in shape, color, and finish between photos and the item you receive are part of the handmade process, not a defect. Product descriptions, materials, and dimensions are provided as accurately as possible at the time of listing.`,
  },
  {
    title: "3. Pricing & Payment",
    body: `All prices are listed in Bangladeshi Taka (৳) and are subject to change without notice. We reserve the right to correct pricing errors even after an order has been placed, in which case we'll contact you before processing. Payment must be completed through one of the methods offered at checkout before an order is confirmed.`,
  },
  {
    title: "4. Shipping & Delivery",
    body: `Estimated delivery timeframes are shown at checkout and are not guaranteed. Bloomora is not responsible for delays caused by couriers, customs, or circumstances outside our control. Risk of loss passes to you once an order has been handed to the shipping carrier.`,
  },
  {
    title: "5. Returns & Exchanges",
    body: `Unworn items in their original condition and packaging can be returned within 7 days of delivery. Made-to-order or customized pieces are final sale unless they arrive damaged or defective. To start a return, contact us with your order number.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All photos, designs, logos, and written content on this site belong to Bloomora and may not be reproduced or used commercially without written permission.`,
  },
  {
    title: "7. Limitation Of Liability",
    body: `Bloomora is not liable for indirect, incidental, or consequential damages arising from the use of our products or website, to the fullest extent permitted by law.`,
  },
  {
    title: "8. Changes To These Terms",
    body: `We may update these Terms & Conditions from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.`,
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
        Legal
      </span>

      <h1 className="mt-4 text-5xl font-light text-[#3D2A22]">
        Terms & Conditions
      </h1>

      <p className="mt-6 leading-8 text-[#6F625B]">
        These terms govern your use of the Bloomora website and any
        purchase made through it. Please read them carefully before
        placing an order.
      </p>

      <div className="mt-14 space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold text-[#3D2A22]">
              {section.title}
            </h2>

            <p className="mt-3 leading-8 text-[#6F625B]">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-[#F0E4D6] bg-[#FBF7F2] p-6">
        <p className="text-[#6F625B]">
          Questions about these terms? Reach out any time at{" "}
          <a
            href="mailto:hello@bloomora.com"
            className="font-medium text-[#B78A61]"
          >
            hello@bloomora.com
          </a>{" "}
          or visit our{" "}
          <Link href="/contact" className="font-medium text-[#B78A61]">
            Contact page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
