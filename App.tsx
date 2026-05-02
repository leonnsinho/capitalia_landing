import React, { useEffect } from 'react';
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
  // Section navigation
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('capitaliaNavigate', handleNavigate);
    return () => window.removeEventListener('capitaliaNavigate', handleNavigate);
  }, []);

  return (
    <div>
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="ia"><Features /></div>
      <div id="funcionalidades"><MoreFeatures /></div>
      <div><VideoSection /></div>
      <div id="interface"><Screenshots /></div>
      <div id="planos"><Pricing /></div>
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;