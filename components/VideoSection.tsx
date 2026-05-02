import React, { useState, useRef, useEffect } from 'react';

const VIDEO_ID = 'aMJaMO-eCd4';

export const VideoSection: React.FC = () => {
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = (keyframe: string, duration: string, delay: string) =>
    visible ? { animation: `${keyframe} ${duration} ${ease} ${delay} both` } : { opacity: 0 };

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden flex flex-col justify-center" style={{ backgroundColor: '#FCFCFC' }}>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4" style={anim('heroFadeUp', '0.6s', '0s')}>
            <span className="h-px w-8 bg-emerald-500"></span>
            <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Demonstração</span>
            <span className="h-px w-8 bg-emerald-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6" style={anim('heroBlurUp', '0.85s', '0.1s')}>
            Veja o <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Futuro</span> das Finanças
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed" style={anim('heroFadeUp', '0.7s', '0.22s')}>
            Descubra como o Capitalia simplifica sua vida financeira em menos de 2 minutos.
            Uma experiência fluida, inteligente e desenhada para você.
          </p>
        </div>

        {/* Notebook mockup */}
        <div className="flex flex-col items-center" style={anim('heroPop', '0.9s', '0.35s')}>

          {/* Lid / screen */}
          <div
            className="w-full rounded-t-2xl overflow-hidden shadow-2xl"
            style={{
              background: '#1e1e1e',
              padding: '12px 12px 0 12px',
              maxWidth: '860px',
            }}
          >
            {/* Menu bar dots */}
            <div className="flex items-center gap-1.5 mb-2 px-1">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            {/* Screen bezel with video */}
            <div
              className="relative w-full overflow-hidden rounded-t-lg bg-black"
              style={{ aspectRatio: '16/9' }}
            >
              {active ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                  title="Capitalia Demonstração"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => setActive(true)}
                  className="absolute inset-0 w-full h-full group"
                  aria-label="Reproduzir vídeo"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt="Thumbnail do vídeo"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                      <svg className="w-9 h-9 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Base / keyboard */}
          <div
            className="w-full shadow-xl"
            style={{ maxWidth: '860px' }}
          >
            {/* Hinge strip */}
            <div style={{ background: '#2a2a2a', height: '8px', borderRadius: '0 0 2px 2px' }} />
            {/* Keyboard deck */}
            <div
              style={{
                background: 'linear-gradient(180deg, #2d2d2d 0%, #252525 100%)',
                height: '28px',
                borderRadius: '0 0 8px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Trackpad */}
              <div style={{ width: '80px', height: '14px', background: '#1a1a1a', borderRadius: '4px', opacity: 0.7 }} />
            </div>
            {/* Bottom foot */}
            <div
              style={{
                background: '#1c1c1c',
                height: '6px',
                borderRadius: '0 0 12px 12px',
                width: '96%',
                margin: '0 auto',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
