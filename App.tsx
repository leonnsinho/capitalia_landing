import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { MoreFeatures } from './components/MoreFeatures';
import { VideoSection } from './components/VideoSection';
import { Screenshots } from './components/Screenshots';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <MoreFeatures />
      <VideoSection />
      <Screenshots />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;