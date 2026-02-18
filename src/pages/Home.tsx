import BentoGrid from '../components/BentoGrid'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import MarqueeSection from '../components/MarqueeSection'
import GeckoGallery from '../components/GeckoGallery'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'

export const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <HeroSection/>
    <MarqueeSection />
    <BentoGrid />
    <GeckoGallery />
    <FeaturesSection />
    <Footer />
    </div>
  )
}
