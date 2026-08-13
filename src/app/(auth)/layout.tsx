import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}