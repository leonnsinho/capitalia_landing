import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

const TOTAL = 5;

export const Screenshots: React.FC = () => {
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  const activeImg = hoveredImg ?? 1;
  const [mobileIndex, setMobileIndex] = useState(0); // 0-based
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const prev = () => setMobileIndex(i => (i - 1 + TOTAL) % TOTAL);
  const next = () => setMobileIndex(i => (i + 1) % TOTAL);

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = (keyframe: string, duration: string, delay: string) =>
    visible ? { animation: `${keyframe} ${duration} ${ease} ${delay} both` } : { opacity: 0 };

  return (
    <section ref={sectionRef} id="interface" className="relative py-16 overflow-hidden" style={{ backgroundColor: '#FCFCFC' }}>

        {/* Decorative Background Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-emerald-400 rounded-full opacity-100 z-0 shadow-[0_0_100px_rgba(16,185,129,0.4)] animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Header */}
        <div className="text-center mb-20 relative z-10 px-4">
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight"
              style={anim('heroBlurUp', '0.85s', '0s')}
            >
                INTERFACE DO <span className="text-gray-800">CAPITAL<span className="text-emerald-500">IA</span></span>
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full mb-6"
              style={anim('heroFadeIn', '0.6s', '0.2s')}
            />
        </div>

        {/* Mobile — phone mockup + arrow navigation */}
        <div className="flex md:hidden flex-col items-center gap-6 px-4" style={anim('heroFadeUp', '0.9s', '0.25s')}>
            <div className="relative">
                <PhoneMockup className="!h-[500px] !w-[245px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.35)]">
                    <div className="relative w-full h-full">
                        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => (
                            <img
                                key={n}
                                src={`/interface/${n}.jpg`}
                                alt={`Interface ${n}`}
                                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
                                style={{ opacity: mobileIndex + 1 === n ? 1 : 0 }}
                            />
                        ))}
                    </div>
                </PhoneMockup>

                {/* Arrow buttons — positioned on sides of phone */}
                <button
                    onClick={prev}
                    className="absolute left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-emerald-500 hover:text-white transition-all"
                    aria-label="Anterior"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-emerald-500 hover:text-white transition-all"
                    aria-label="Próxima"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Dots indicator */}
            <div className="flex gap-2">
                {Array.from({ length: TOTAL }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setMobileIndex(i)}
                        className={`rounded-full transition-all ${mobileIndex === i ? 'w-6 h-2 bg-emerald-500' : 'w-2 h-2 bg-gray-300'}`}
                        aria-label={`Imagem ${i + 1}`}
                    />
                ))}
            </div>
        </div>

        {/* Desktop — phone + 4 side images */}
        <div className="hidden md:flex flex-row items-end gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Phone Mockup */}
                <div
                  className="flex-shrink-0 z-20 transition-transform duration-300"
                  style={{
                    transform: hoveredImg ? 'scale(1.06)' : 'scale(1)',
                    ...anim('heroFadeUp', '0.9s', '0.25s'),
                  }}
                >
                    <PhoneMockup className="!h-[580px] !w-[285px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.35)]">
                        <div className="relative w-full h-full">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <img
                                    key={n}
                                    src={`/interface/${n}.jpg`}
                                    alt={`Interface ${n}`}
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
                                    style={{ opacity: activeImg === n ? 1 : 0 }}
                                />
                            ))}
                        </div>
                    </PhoneMockup>
                </div>

                {/* 4 side images */}
                <div className="flex flex-row gap-3 flex-1">
                    {[2, 3, 4, 5].map((n, i) => (
                        <div
                            key={n}
                            className="rounded-2xl overflow-hidden shadow-lg flex-1 cursor-pointer transition-all duration-300"
                            style={{
                                height: '480px',
                                outline: hoveredImg === n ? '3px solid #10b981' : '3px solid transparent',
                                transform: hoveredImg === n ? 'translateY(-8px)' : 'translateY(0)',
                                ...anim('heroFadeUp', '0.75s', `${0.35 + i * 0.1}s`),
                            }}
                            onMouseEnter={() => setHoveredImg(n)}
                            onMouseLeave={() => setHoveredImg(null)}
                        >
                            <img
                                src={`/interface/${n}.jpg`}
                                alt={`Interface ${n}`}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    ))}
                </div>

        </div>
    </section>
  );
};
