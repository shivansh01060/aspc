import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import StorySection from "./components/sections/StorySection";
import ProductSection from "./components/sections/ProductSection";
import QualitySection from "./components/sections/QualitySection";
import ContactSection from "./components/sections/ContactSection";
import ScrollToTop from "./components/ui/ScrollToTop";
import VideoSection from "./components/sections/VideoSection";

export default function App() {
  return (
    <div className="grain-overlay">
      <Navbar />
      <main>
        {/* <HeroSection /> */}
        <VideoSection />
        <StorySection />
        <ProductSection />
        <QualitySection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
