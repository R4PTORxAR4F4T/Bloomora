import Nav from "@/src/components/landing/Nav";
import Hero from "@/src/components/landing/Hero";
import Story from "@/src/components/landing/Story";
import Process from "@/src/components/landing/Process";
import Collection from "@/src/components/landing/Collection";
import Quote from "@/src/components/landing/Quote";
import Newsletter from "@/src/components/landing/Newsletter";
import Footer from "@/src/components/landing/Footer";
import "@/src/app/(public)/landing/landing.css";


export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Story />
      <Process />
      <Collection />
      <Quote />
      <Newsletter />
      <Footer />
    </>
  );
}
