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

  useEffect(() => {
    let rafId: number;

    const updateScales = () => {
      const vh = window.innerHeight;
      // Filter to only the actual wrapped elements (skip nulls from non-wrapped sections)
      const validEls = wrapperRefs.current.filter((el): el is HTMLDivElement => el !== null);
      validEls.forEach((el, i) => {
        const nextEl = validEls[i + 1];
        if (!nextEl) return;

        const nextTop = nextEl.getBoundingClientRect().top;
        // progress: 0 when next section enters from bottom, 1 when it reaches top
        const progress = Math.max(0, Math.min(1, (vh - nextTop) / vh));
        const scale = 1 - 0.08 * progress;
        const radius = Math.round((1 - scale) * 200);

        el.style.transform = `scale(${scale.toFixed(4)})`;
        el.style.borderRadius = `${radius}px`;

        const overlay = el.querySelector<HTMLElement>('[data-overlay]');
        if (overlay) overlay.style.opacity = ((1 - scale) * 1.5).toFixed(4);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScales);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScales();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Navigation: calculate exact scroll target from wrapperRef heights
  // (offsetTop on sticky elements is unreliable after scroll)
  useEffect(() => {
    // Maps section id -> how many wrapperRefs to sum to reach it
    // wrapperRefs: [0]=Hero [1]=Features [2]=MoreFeatures [3]=VideoSection [4]=Screenshots [5]=Testimonials [6]=Footer
    // Planos (Pricing) sits between index 4 and 5 in the DOM
    const sectionEndIdx: Record<string, number> = {
      home: 0,           // scroll to 0
      ia: 1,             // sum refs[0]
      funcionalidades: 2, // sum refs[0..1]
      interface: 4,       // sum refs[0..3]
      planos: 5,          // sum refs[0..4]
    };

    const handleNavigate = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail;
      const endIdx = sectionEndIdx[id];
      if (endIdx === undefined) return;
      let top = 0;
      for (let i = 0; i < endIdx; i++) {
        const ref = wrapperRefs.current[i];
        if (ref) top += ref.offsetHeight;
      }
      window.scrollTo({ top, behavior: 'smooth' });
    };

    window.addEventListener('capitaliaNavigate', handleNavigate);
    return () => window.removeEventListener('capitaliaNavigate', handleNavigate);
  }, []);

  const wrap = (node: React.ReactNode, index: number, id?: string) => (
    <div
      id={id}
      ref={el => { wrapperRefs.current[index] = el; }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: index + 1,
        transformOrigin: 'top center',
        willChange: 'transform',
        overflow: 'hidden',
      }}
    >
      {/* Dark overlay that fades in as the section goes behind */}
      <div
        data-overlay=""
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'black',
          opacity: 0,
          zIndex: 999,
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }}
      />
      {node}
    </div>
  );

  return (
    <div className="bg-gray-900">
      <Navbar />
      {wrap(<Hero />, 0, 'home')}
      {wrap(<Features />, 1, 'ia')}
      {wrap(<MoreFeatures />, 2, 'funcionalidades')}
      {wrap(<VideoSection />, 3)}
      {wrap(<Screenshots />, 4, 'interface')}
      {/* Pricing scrolls normally — too tall to fit in a single viewport card */}
      <div id="planos" style={{ position: 'relative', zIndex: 6 }}>
        <Pricing />
      </div>
      {wrap(<Testimonials />, 5)}
      {wrap(<Footer />, 6)}
    </div>
  );
}

export default App;