import React, { useRef, useEffect } from 'react';
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
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-out blur/dark overlay effect
  useEffect(() => {
    let rafId: number;

    const update = () => {
      if (window.innerWidth < 768) return; // desktop only
      wrapperRefs.current.forEach((el) => {
        if (!el) return;
        const overlay = el.querySelector<HTMLElement>('[data-scroll-overlay]');
        if (!overlay) return;
        const rect = el.getBoundingClientRect();
        // progress 0→1 as section top scrolls from 0 to -40% of its height
        const progress = Math.max(0, Math.min(1, -rect.top / (el.offsetHeight * 0.4)));
        const blur = (progress * 14).toFixed(1);
        overlay.style.opacity = progress > 0 ? '1' : '0';
        overlay.style.backdropFilter = `blur(${blur}px)`;
        (overlay.style as any).WebkitBackdropFilter = `blur(${blur}px)`;
      });
    };

    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

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

  const wrap = (node: React.ReactNode, index: number, id?: string) => (
    <div
      id={id}
      ref={el => { wrapperRefs.current[index] = el; }}
      style={{ position: 'relative' }}
    >
      {/* Scroll-out overlay: blurs + darkens section as user scrolls past it */}
      <div
        data-scroll-overlay=""
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          zIndex: 40,
          pointerEvents: 'none',
          willChange: 'opacity, backdrop-filter',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
        }}
      />
      {node}
    </div>
  );

  return (
    <div>
      <Navbar />
      {wrap(<Hero />, 0, 'home')}
      {wrap(<Features />, 1, 'ia')}
      {wrap(<MoreFeatures />, 2, 'funcionalidades')}
      {wrap(<VideoSection />, 3)}
      {wrap(<Screenshots />, 4, 'interface')}
      {wrap(<Pricing />, 5, 'planos')}
      {wrap(<Testimonials />, 6)}
      <Footer />
    </div>
  );
}

export default App;