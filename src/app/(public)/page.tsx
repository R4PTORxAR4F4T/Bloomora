import AboutSection from "@/src/components/home/AboutSection";
import BestSeller from "@/src/components/home/BestSeller";
import Categories from "@/src/components/home/Categories";
import FeaturedCollection from "@/src/components/home/FeaturedCollection";
import Hero from "@/src/components/home/Hero";
import Hero2 from "@/src/components/home/Hero2";
import Instagram from "@/src/components/home/Instagram";
import NewArrivals from "@/src/components/home/NewArrivals";
import Newsletter from "@/src/components/home/Newsletter";
import Process from "@/src/components/home/Process";
import Testimonials from "@/src/components/home/Testimonials";
import WhyChooseUs from "@/src/components/home/WhyChooseUs";


export default function HomePage() {
  return (
    <>
      {/* <Hero /> */}
      <Hero2 />
      <FeaturedCollection />
      <Categories />
      <NewArrivals />
      <AboutSection />
      <WhyChooseUs />
      <Process />
      <BestSeller />
      <Testimonials />
      <Instagram />
      <Newsletter />
    </>
  );
}