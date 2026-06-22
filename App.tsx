import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { MoreFeatures } from './components/MoreFeatures';
import { VideoSection } from './components/VideoSection';
import { Screenshots } from './components/Screenshots';
import { Pricing } from './components/Pricing';
import { FacebookComments } from './components/FacebookComments';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

function App() {
  const [showFab, setShowFab] = useState(false);

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

  // Show FAB only after scrolling past hero
  useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="ia"><Features /></div>
      <div id="funcionalidades"><MoreFeatures /></div>
      <div><VideoSection /></div>
      <div id="interface"><Screenshots /></div>
      <FacebookComments />
      <div id="planos"><Pricing /></div>
      <Testimonials />
      <Footer />

      {/* Floating download button */}
      <a
        href="https://play.google.com/store/apps/details?id=com.capitalia.app"
        target="_blank"
        rel="noopener noreferrer"
        title="Baixar na Google Play"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/40 hover:bg-emerald-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${showFab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <Download size={22} />
      </a>
    </div>
  );
}

export default App;