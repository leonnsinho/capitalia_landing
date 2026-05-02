import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X, Download } from 'lucide-react';

// ---------------------------------------------------------------------------
// Windows Install Tutorial Modal
// ---------------------------------------------------------------------------
const WindowsModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

      {/* Dialog */}
      <div
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gray-950 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <img src="/windows.png" alt="Windows" className="w-5 h-5 object-contain brightness-0 invert" />
            <span className="text-white font-semibold text-sm">Como instalar no Windows</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors ml-4 shrink-0 p-1 rounded-lg hover:bg-white/10"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 YouTube embed */}
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/FCaXD6a7vpM?autoplay=1&rel=0"
            title="Como instalar o Capitalia no Windows"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* CTA bar */}
        <div className="flex items-center justify-between bg-gray-900 px-5 py-4 gap-4">
          <p className="text-gray-400 text-sm">Pronto para começar? Acesse agora mesmo.</p>
          <a
            href="https://app.capitaliahealth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-emerald-900/30"
          >
            <Download className="w-4 h-4" />
            Baixar agora
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

// SVG Background Blob
const BackgroundBlob = () => (
  <div className="absolute top-0 right-0 w-full md:w-[65%] h-full overflow-hidden z-0 pointer-events-none">
     <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,1000 C300,1000 200,800 200,600 C200,300 100,200 400,100 C600,0 800,100 1000,0 V1000 Z" fill="#10b981" className="opacity-10" />
        <path d="M1000,0 L1000,1000 L300,1000 C600,800 500,500 800,200 C900,100 950,50 1000,0 Z" fill="#34d399" />
        <path d="M1000,300 C900,400 700,500 800,800 C850,950 950,980 1000,1000 V300 Z" fill="#059669" className="opacity-20" />
        <circle cx="850" cy="200" r="50" fill="rgba(255,255,255,0.1)" />
        <circle cx="600" cy="800" r="100" fill="rgba(255,255,255,0.1)" />
     </svg>
  </div>
);

// Floating Decorative Circle
const FloatingDonut = ({ className, color }: { className: string, color: string }) => (
    <div className={`absolute rounded-full border-[15px] ${color} ${className} opacity-60 z-10`} />
);



export const Hero: React.FC = () => {
  const [showWindowsModal, setShowWindowsModal] = useState(false);

  // Easing used across all hero animations
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <section id="home" className="relative w-full h-screen max-h-screen lg:h-[125vh] lg:max-h-[125vh] pt-20 pb-10 md:pb-0 overflow-hidden" style={{ backgroundColor: '#FCFCFC' }}>
      {showWindowsModal && <WindowsModal onClose={() => setShowWindowsModal(false)} />}

      {/* Background Graphic */}
      <div style={{ animation: `heroFadeIn 1.2s ${ease} 0s both` }}>
        <BackgroundBlob />
      </div>

      {/* Floating Circles — desktop only */}
      <FloatingDonut className="w-20 h-20 border-cyan-400 top-[20%] right-[10%] animate-float-delayed hidden md:block" color="border-cyan-200" />
      <FloatingDonut className="w-32 h-32 border-emerald-300 bottom-[10%] right-[40%] animate-float hidden md:block" color="border-emerald-200" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col md:flex-row items-center h-full">

          {/* Mobile: hero image above content */}
          <div
            className="flex md:hidden w-full justify-center mt-2 mb-6"
            style={{ animation: `heroFadeUp 0.8s ${ease} 0s both` }}
          >
            <img src="/hero-right.png" alt="Capitalia App" className="h-64 object-contain" />
          </div>

          {/* Left Content */}
          <div className="w-full md:w-1/2 z-10 md:pt-0 flex flex-col md:justify-center">

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-3 md:mb-6 text-center md:text-left"
              style={{ animation: `heroBlurUp 0.9s ${ease} 0.1s both` }}
            >
              <span className="text-emerald-500">Capitalia</span> App
              <br />
              <span
                className="text-xl sm:text-2xl md:text-4xl text-gray-600 font-normal mt-1 block"
                style={{ animation: `heroBlurUp 0.9s ${ease} 0.22s both` }}
              >
                Controle Financeiro Inteligente
              </span>
            </h1>

            {/* Paragraph */}
            <p
              className="text-gray-600 text-base sm:text-lg mb-6 md:mb-8 max-w-lg leading-relaxed text-center md:text-left font-medium md:font-normal"
              style={{ animation: `heroFadeUp 0.8s ${ease} 0.32s both` }}
            >
              Transforme suas ideias financeiras em realidade. O Capitalia oferece insights poderosos, design responsivo e uma interface elegante para gerenciar seu patrimônio.
            </p>

            {/* Main CTA — desktop only */}
            <div
              className="hidden md:block mb-8"
              style={{ animation: `heroPop 0.75s ${ease} 0.44s both` }}
            >
              <a
                href="https://app.capitaliahealth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-emerald-500 rounded-full hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Cadastrar grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>

            {/* Platform Buttons */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
              {[
                {
                  delay: '0.56s',
                  mobileHide: true,
                  content: (
                    <button key="win" onClick={() => setShowWindowsModal(true)} className="bg-gray-900 text-white px-3 md:px-5 py-2.5 md:py-3 rounded-lg flex items-center gap-2 md:gap-3 hover:bg-gray-800 transition shadow-lg w-full justify-center md:justify-start">
                      <img src="/windows.png" alt="Windows" className="w-5 md:w-6 h-5 md:h-6 object-contain flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-[9px] md:text-[10px] uppercase opacity-70">Instalar no</div>
                        <div className="font-bold text-xs md:text-sm">Windows</div>
                      </div>
                    </button>
                  ),
                },
                {
                  delay: '0.65s',
                  content: (
                    <button key="safari" className="bg-gray-900 text-white px-3 md:px-5 py-2.5 md:py-3 rounded-lg flex items-center gap-2 md:gap-3 hover:bg-gray-800 transition shadow-lg w-full justify-center md:justify-start">
                      <img src="/app-store.png" alt="Apple" className="w-5 md:w-6 h-5 md:h-6 object-contain brightness-0 invert flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-[9px] md:text-[10px] uppercase opacity-70">Instalar no</div>
                        <div className="font-bold text-xs md:text-sm">Safari</div>
                      </div>
                    </button>
                  ),
                },
                {
                  delay: '0.74s',
                  content: (
                    <button key="play" className="bg-gray-900 text-white px-3 md:px-5 py-2.5 md:py-3 rounded-lg flex items-center gap-2 md:gap-3 hover:bg-gray-800 transition shadow-lg w-full justify-center md:justify-start">
                      <img src="/play-store.png" alt="Google Play" className="w-5 md:w-6 h-5 md:h-6 object-contain flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-[9px] md:text-[10px] uppercase opacity-70">Baixe no</div>
                        <div className="font-bold text-xs md:text-sm">Google Play</div>
                      </div>
                    </button>
                  ),
                },
              ].map(({ delay, content, mobileHide }) => (
                <div key={delay} className={mobileHide ? 'hidden md:block' : ''} style={{ animation: `heroPop 0.7s ${ease} ${delay} both` }}>
                  {content}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content — Desktop only */}
          <div
            className="hidden md:flex w-full md:w-1/2 relative h-full items-center justify-center z-10"
            style={{ animation: `heroFadeRight 1.1s ${ease} 0.25s both` }}
          >
            <img src="/hero-right.png" alt="Capitalia App" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};