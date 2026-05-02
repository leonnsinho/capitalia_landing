import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Layout, ShieldCheck, ArrowRight, Bot, Play } from 'lucide-react';

const VIDEO_ID = 'Z1JFXb9oFJ8';

const VideoPhoneMockup = () => {
    const [active, setActive] = useState(false);
    return (
        <div className="relative w-full max-w-[220px] lg:max-w-xs rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] bg-black">
            {/* 9:16 portrait ratio for YouTube Shorts */}
            <div style={{ paddingBottom: '177.78%', position: 'relative' }}>
                {active ? (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
                        title="Capitalia App Demo"
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
                            src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                            alt="Thumbnail do vídeo"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark overlay */}
                        <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                        {/* Play button */}
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                                <Play className="w-7 h-7 text-gray-900 ml-1" fill="currentColor" />
                            </span>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

const FeatureItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500 transition-colors bg-white">
            <Icon className="w-5 h-5 text-gray-600 group-hover:text-emerald-500" />
        </div>
        <div>
            <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
    </div>
);

export const Features: React.FC = () => {
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={sectionRef} id="ia" className="relative py-24 overflow-hidden" style={{ backgroundColor: '#FCFCFC' }}>
        {/* Decorative Big Circle Left */}
        <div className="absolute top-1/2 -left-48 transform -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400 rounded-full opacity-10 blur-3xl pointer-events-none" />
        {/* Decorative Circle Right Bottom */}
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-emerald-400 rounded-full opacity-5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-0 lg:gap-12">

                {/* Content */}
                <div className="w-full lg:w-1/2 order-1">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-4" style={anim('heroFadeUp', '0.6s', '0s')}>
                        <span className="h-px w-8 bg-emerald-500"></span>
                        <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Sobre o App</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight" style={anim('heroBlurUp', '0.85s', '0.1s')}>
                        INTELIGÊNCIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">ARTIFICIAL</span> NO SEU BOLSO
                    </h2>

                    {/* Paragraph */}
                    <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed" style={anim('heroFadeUp', '0.7s', '0.22s')}>
                        O Capitalia não é apenas um app de finanças, é o seu assistente pessoal.
                        Com tecnologia de ponta, analisamos seus hábitos para sugerir economias
                        inteligentes e investimentos personalizados.
                    </p>

                    {/* Feature items — staggered */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 mb-0">
                        {[
                            { icon: Sparkles,    title: 'IA Personalizada',   desc: 'Insights adaptados ao seu estilo de vida.',      delay: '0.34s' },
                            { icon: Layout,      title: 'Design Intuitivo',   desc: 'Interface limpa e fácil de navegar.',            delay: '0.44s' },
                            { icon: Bot,         title: 'Assistente 24h',     desc: 'Tire dúvidas financeiras a qualquer momento.',  delay: '0.54s' },
                            { icon: ShieldCheck, title: 'Segurança Militar',  desc: 'Criptografia avançada para seus dados.',        delay: '0.64s' },
                        ].map(({ icon: Icon, title, desc, delay }) => (
                            <div key={title} className="flex items-start gap-4" style={anim('heroPop', '0.65s', delay)}>
                                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 bg-white">
                                    <Icon className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-0.5 text-sm md:text-base">{title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA — desktop only (mobile CTA rendered below video) */}
                    <div className="hidden lg:block mt-8" style={anim('heroPop', '0.65s', '0.76s')}>
                        <a href="https://app.capitaliahealth.com" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all inline-flex items-center gap-2">
                            CONHECER FUNCIONALIDADES
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Video — mobile: plain centered phone with breathing room */}
                <div className="block lg:hidden order-2 w-full flex justify-center py-10"
                     style={anim('heroFadeUp', '0.9s', '0.2s')}>
                    <VideoPhoneMockup />
                </div>

                {/* Video — desktop: phone inside decorative circle */}
                <div className="hidden lg:flex w-full lg:w-1/2 order-2 justify-center lg:justify-start relative"
                     style={anim('heroFadeRight', '1.1s', '0.15s')}>
                    <div className="relative w-[380px] h-[380px] flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-emerald-400 rounded-full opacity-90 shadow-[0_20px_50px_rgba(16,185,129,0.3)] animate-pulse" style={{ animationDuration: '4s' }}></div>
                        <div className="absolute inset-6 border border-white/20 rounded-full"></div>
                        <VideoPhoneMockup />
                    </div>
                </div>

                {/* CTA — mobile only, always last */}
                <div className="block lg:hidden order-3 w-full flex justify-center pb-4" style={anim('heroPop', '0.65s', '0.76s')}>
                    <a href="https://app.capitaliahealth.com" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all flex items-center gap-2">
                        CONHECER FUNCIONALIDADES
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

            </div>
        </div>
    </section>
  );
};