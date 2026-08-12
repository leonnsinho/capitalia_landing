import React, { useRef, useEffect, useState } from 'react';
import { Monitor } from 'lucide-react';

export const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = (keyframe: string, duration: string, delay: string) =>
    visible ? { animation: `${keyframe} ${duration} ${ease} ${delay} both` } : { opacity: 0 };

  return (
    <section ref={sectionRef} id="planos" className="relative">
      <div className="relative w-full">
        {/* Mobile: banner vertical | Desktop: banner horizontal */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/banner-vertical.jpg" />
          <img
            src="/banner-promo.jpg"
            alt="Todos os recursos desbloqueados"
            className="w-full h-auto block"
          />
        </picture>

        {/* Mobile: botões centralizados na base */}
        <div
          className="md:hidden absolute bottom-[5%] inset-x-0 flex flex-col items-center gap-3 px-6"
          style={anim('heroFadeUp', '0.7s', '0.3s')}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.capitalia.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 bg-gray-900/90 hover:bg-gray-800 text-white rounded-2xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-95 shadow-lg backdrop-blur-sm"
          >
            <img src="/play-store.png" alt="Google Play" className="w-5 h-5 object-contain" />
            <div className="text-left">
              <p className="text-[10px] font-normal opacity-60 leading-none mb-0.5">Disponível no</p>
              <p className="leading-none">Google Play</p>
            </div>
          </a>
          <a
            href="https://app.capitaliahealth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-emerald-500/40"
          >
            <Monitor className="w-5 h-5 text-white" />
            <div className="text-left">
              <p className="text-[10px] font-normal opacity-80 leading-none mb-0.5">Acesse grátis</p>
              <p className="leading-none">Cadastrar Grátis</p>
            </div>
          </a>
        </div>

        {/* Desktop: botões no topo esquerdo */}
        <div
          className="hidden md:flex absolute top-[8%] left-[3%] flex-row items-center gap-3"
          style={anim('heroFadeUp', '0.7s', '0.3s')}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.capitalia.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 bg-gray-900/90 hover:bg-gray-800 text-white rounded-2xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-95 shadow-lg backdrop-blur-sm"
          >
            <img src="/play-store.png" alt="Google Play" className="w-5 h-5 object-contain" />
            <div className="text-left">
              <p className="text-[10px] font-normal opacity-60 leading-none mb-0.5">Disponível no</p>
              <p className="leading-none">Google Play</p>
            </div>
          </a>
          <a
            href="https://app.capitaliahealth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-emerald-500/40"
          >
            <Monitor className="w-5 h-5 text-white" />
            <div className="text-left">
              <p className="text-[10px] font-normal opacity-80 leading-none mb-0.5">Acesse grátis</p>
              <p className="leading-none">Cadastrar Grátis</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
