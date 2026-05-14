import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Zap, CreditCard, PieChart, Wallet, Repeat2, Bitcoin, Play, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Video Modal — renders via portal directly into body to escape sticky/overflow
// ---------------------------------------------------------------------------
const VideoModal = ({ video, title, onClose }: { video: string; title: string; onClose: () => void }) => {
    const isLocal = video.startsWith('/');

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
            {/* Full-screen blur backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

            {/* Dialog — wider on large screens */}
            <div
                className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-950 px-5 py-3.5">
                    <span className="text-white font-semibold text-sm truncate">{title}</span>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors ml-4 shrink-0 p-1 rounded-lg hover:bg-white/10"
                        aria-label="Fechar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* 16:9 player */}
                <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                    {isLocal ? (
                        <video
                            className="absolute inset-0 w-full h-full"
                            src={video}
                            autoPlay
                            controls
                            playsInline
                        />
                    ) : (
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${video}?autoplay=1&rel=0`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

// ---------------------------------------------------------------------------
// Feature card
// ---------------------------------------------------------------------------
const FeatureGridItem = ({
    icon: Icon, title, description, colorClass, number, video, onDemo,
}: {
    icon: any; title: string; description: string; colorClass: string;
    number: number; video: string; onDemo: (video: string, title: string) => void;
}) => (
    <div className="relative flex flex-col items-start bg-white/85 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-sm h-full">
        <div className="absolute -top-3 -left-3 w-6 h-6 md:w-7 md:h-7 rounded-full bg-emerald-500 text-white text-[10px] md:text-xs font-black flex items-center justify-center shadow-md">
            {number}
        </div>
        <Icon className={`w-5 h-5 md:w-7 md:h-7 mb-2 md:mb-3 ${colorClass}`} />
        <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1 leading-snug">{title}</h4>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3">{description}</p>
        <button
            onClick={() => onDemo(video, title)}
            className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors px-3 py-1.5 rounded-lg"
        >
            <Play className="w-3 h-3 fill-emerald-600" />
            Ver Demo
        </button>
    </div>
);

export const MoreFeatures: React.FC = () => {
    const [modal, setModal] = useState<{ video: string; title: string } | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    const openDemo = (video: string, title: string) => setModal({ video, title });
    const closeDemo = () => setModal(null);

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
        <section ref={sectionRef} id="funcionalidades" className="relative py-16 md:py-24 overflow-hidden min-h-[600px] md:min-h-[800px] flex flex-col justify-center">
            {/* Background — mobile vs desktop */}
            <div className="absolute inset-0 block md:hidden" style={{ backgroundImage: "url('/funcionalidades-mobile.png')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.35 }} />
            <div className="absolute inset-0 hidden md:block" style={{ backgroundImage: "url('/Funcionalidades-fundo.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            {/* White wash — mobile only */}
            <div className="absolute inset-0 bg-white/50 md:hidden" />

            {modal && <VideoModal video={modal.video} title={modal.title} onClose={closeDemo} />}

            {/* Background Shape Left */}
            <div className="absolute top-0 left-0 w-[60%] h-full bg-cyan-400/5 rounded-br-[100px] -z-10 hidden md:block" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
                <div className="w-full">

                    {/* Header */}
                    <div className="mb-8 md:mb-12">
                        <div className="flex items-center gap-2 mb-3" style={anim('heroFadeUp', '0.6s', '0s')}>
                            <span className="h-px w-8 bg-emerald-500"></span>
                            <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Funcionalidades</span>
                        </div>
                        <h2 className="text-2xl md:text-5xl font-bold text-gray-900 uppercase leading-tight" style={anim('heroBlurUp', '0.85s', '0.1s')}>
                            FUNCIONALIDADES DO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">CAPITALIA</span>
                        </h2>
                    </div>

                    {/* Cards grid — 2 cols on mobile, 2 on md, 3 on lg */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-12">
                        {[
                            { number: 1, icon: PieChart,   title: 'Gastos e Entradas',          description: 'Controle completo das suas receitas e despesas com categorias personalizáveis.',                              video: 'KDdenyrbvPE' },
                            { number: 2, icon: Wallet,     title: 'Todos os Cartões',            description: 'Centralize todos os seus cartões em um único lugar e visualize faturas e limites facilmente.',               video: 'sdxcDIiYAyw' },
                            { number: 3, icon: CreditCard, title: 'Controle de Parcelas',        description: 'Acompanhe cada parcela dos seus débitos e saiba exatamente quando cada uma vence.',                          video: '9QMWoWA9jbg' },
                            { number: 4, icon: Repeat2,    title: 'Controle de Assinaturas',     description: 'Gerencie todas as suas assinaturas recorrentes e evite cobranças indesejadas.',                              video: 'eJVMB5je7YI' },
                            { number: 5, icon: Zap,        title: 'Análise Inteligente com IA',  description: 'Módulos de análise financeira com inteligência artificial para insights personalizados.',                     video: 'Z1JFXb9oFJ8' },
                            { number: 6, icon: Bitcoin,    title: 'Investimentos e Cripto',      description: 'Controle e gerencie seus investimentos e criptoativos em um painel unificado.',                              video: 'fasA47mqPRg' },
                        ].map(({ number, icon, title, description, video }, i) => (
                            <div key={number} style={anim('heroPop', '0.65s', `${0.22 + i * 0.1}s`)}>
                                <FeatureGridItem
                                    number={number}
                                    icon={icon}
                                    colorClass="text-cyan-500"
                                    title={title}
                                    description={description}
                                    video={video}
                                    onDemo={openDemo}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Decorative Circle Bottom Right */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[20px] border-cyan-400 rounded-full opacity-20 hidden md:block"></div>
                </div>
            </div>
        </section>
    );
};