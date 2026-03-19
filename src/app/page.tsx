import Navbar from '@/components/Navbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import StickyScrollSection from '@/components/StickyScrollSection';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VideoPortfolio from '@/components/VideoPortfolio';
import PhotoPortfolio from '@/components/PhotoPortfolio';
import Services from '@/components/Services';
import Collaborations from '@/components/Collaborations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      {/* Mobile: original components with scroll animations */}
      <div className="md:hidden">
        <Hero />
        <About />
        <Services />
        <VideoPortfolio />
        <PhotoPortfolio />
        <Collaborations />
        <Contact />
        <Footer />
      </div>

      {/* Desktop: sticky scroll storytelling */}
      <div className="hidden md:block">
        <StickyScrollSection />
      </div>
    </>
  );
}
