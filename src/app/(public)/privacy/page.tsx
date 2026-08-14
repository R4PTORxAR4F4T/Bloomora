import Link from "next/link";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `When you create an account, place an order, or contact us, we collect information such as your name, email address, phone number, shipping address, and order history. We also automatically collect basic technical data, like your browser and device type, to help our site run smoothly.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to process and deliver orders, communicate with you about your purchases, respond to support requests, and improve our products and site. We do not use your data for anything beyond running and improving the Bloomora store.`,
  },
  {
    title: "3. Sharing Of Information",
    body: `We share information only with the third parties needed to fulfill your order — such as payment processors and shipping couriers — and never sell your personal information to advertisers or data brokers.`,
  },
  {
    title: "4. Cookies",
    body: `Our site uses cookies to keep you signed in, remember items in your cart, and understand how the site is used. You can disable cookies in your browser settings, though some features may not work as expected.`,
  },
  {
    title: "5. Data Security",
    body: `We take reasonable technical and organizational steps to protect your information. That said, no method of transmission over the internet is completely secure, and we can't guarantee absolute security.`,
  },
  {
    title: "6. Your Rights",
    body: `You can access, update, or request deletion of your personal information at any time by reaching out to us directly, or by editing your details from your account settings.`,
  },
  {
    title: "7. Children's Privacy",
    body: `Bloomora is not directed at children, and we do not knowingly collect personal information from anyone under the age of 13.`,
  },
  {
    title: "8. Changes To This Policy",
    body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <span className="text-sm uppercase tracking-[5px] text-[#C49A6C]">
        Legal
      </span>

      <h1 className="mt-4 text-5xl font-light text-[#3D2A22]">
        Privacy Policy
      </h1>

      <p className="mt-6 leading-8 text-[#6F625B]">
        Your privacy matters to us. This policy explains what
        information Bloomora collects, how it's used, and the
        choices you have.
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
          Have a question about your data? Email us at{" "}
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
