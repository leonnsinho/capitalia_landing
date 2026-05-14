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
const CARD_ACCENTS = [
    { from: '#10b981', to: '#06b6d4', bg: 'rgba(16,185,129,0.10)', text: '#059669' },
    { from: '#06b6d4', to: '#6366f1', bg: 'rgba(6,182,212,0.10)',  text: '#0891b2' },
    { from: '#8b5cf6', to: '#ec4899', bg: 'rgba(139,92,246,0.10)', text: '#7c3aed' },
    { from: '#f59e0b', to: '#ef4444', bg: 'rgba(245,158,11,0.10)', text: '#d97706' },
    { from: '#10b981', to: '#3b82f6', bg: 'rgba(16,185,129,0.10)', text: '#059669' },
    { from: '#ec4899', to: '#f59e0b', bg: 'rgba(236,72,153,0.10)', text: '#db2777' },
];

const FeatureGridItem = ({
    icon: Icon, title, description, number, video, onDemo,
}: {
    icon: any; title: string; description: string;
    number: number; video: string; onDemo: (video: string, title: string) => void;
}) => {
    const accent = CARD_ACCENTS[(number - 1) % CARD_ACCENTS.length];
    return (
        <div
            className="relative flex flex-col bg-white rounded-2xl p-5 h-full overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
            {/* Faded number decoration */}
            <span
                className="absolute -bottom-3 right-3 text-[7rem] font-black leading-none select-none pointer-events-none"
                style={{ color: accent.from, opacity: 0.07 }}
            >
                {String(number).padStart(2, '0')}
            </span>

            {/* Icon with gradient */}
            <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
            >
                <Icon className="w-5 h-5 text-white" />
            </div>

            <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1.5 leading-snug">{title}</h4>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed flex-1">{description}</p>

            <button
                onClick={() => onDemo(video, title)}
                className="mt-4 flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70 w-fit"
                style={{ color: accent.text }}
            >
                <Play className="w-3 h-3 flex-shrink-0" style={{ fill: accent.text, color: accent.text }} />
                Ver Demo
            </button>
        </div>
    );
};

const FEATURES = [
    { number: 1, icon: PieChart,   title: 'Gastos e Entradas',         description: 'Controle completo das suas receitas e despesas com categorias personalizáveis.',             video: 'KDdenyrbvPE' },
    { number: 2, icon: Wallet,     title: 'Todos os Cartões',           description: 'Centralize todos os seus cartões em um único lugar e visualize faturas e limites facilmente.', video: 'sdxcDIiYAyw' },
    { number: 3, icon: CreditCard, title: 'Controle de Parcelas',       description: 'Acompanhe cada parcela dos seus débitos e saiba exatamente quando cada uma vence.',           video: '9QMWoWA9jbg' },
    { number: 4, icon: Repeat2,    title: 'Controle de Assinaturas',    description: 'Gerencie todas as suas assinaturas recorrentes e evite cobranças indesejadas.',               video: 'eJVMB5je7YI' },
    { number: 5, icon: Zap,        title: 'Análise Inteligente com IA', description: 'Módulos de análise financeira com inteligência artificial para insights personalizados.',     video: 'Z1JFXb9oFJ8' },
    { number: 6, icon: Bitcoin,    title: 'Investimentos e Cripto',     description: 'Controle e gerencie seus investimentos e criptoativos em um painel unificado.',               video: 'fasA47mqPRg' },
];

export const MoreFeatures: React.FC = () => {
    const [modal, setModal] = useState<{ video: string; title: string } | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const cards = track.querySelectorAll('[data-slide]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const idx = parseInt((entry.target as HTMLElement).dataset.slide ?? '0');
                        setActiveSlide(idx);
                    }
                });
            },
            { root: track, threshold: 0.6 }
        );
        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (idx: number) => {
        const track = trackRef.current;
        if (!track) return;
        const cardWidth = window.innerWidth - 64;
        track.scrollTo({ left: idx * (cardWidth + 12), behavior: 'smooth' });
    };

    const anim = (keyframe: string, duration: string, delay: string) =>
        visible ? { animation: `${keyframe} ${duration} ${ease} ${delay} both` } : { opacity: 0 };

    return (
        <section ref={sectionRef} id="funcionalidades" className="relative py-16 md:py-24 md:overflow-hidden min-h-[600px] md:min-h-[800px] flex flex-col justify-center">
            {/* Background — desktop only */}
            <div className="absolute inset-0 hidden md:block" style={{ backgroundImage: "url('/Funcionalidades-fundo.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

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

                    {/* Desktop: grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-12">
                        {FEATURES.map(({ number, icon, title, description, video }, i) => (
                            <div key={number} style={anim('heroPop', '0.65s', `${0.22 + i * 0.1}s`)}>
                                <FeatureGridItem
                                    number={number}
                                    icon={icon}
                                    title={title}
                                    description={description}
                                    video={video}
                                    onDemo={openDemo}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Mobile: carousel — outside padded container so overflow-hidden doesn't clip the track */}
            <div className="md:hidden mt-2" style={{ zIndex: 2, position: 'relative' }} >
                <div
                    ref={trackRef}
                    className="flex overflow-x-auto snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        paddingLeft: '1rem',
                        paddingTop: '0.5rem',
                        paddingBottom: '1rem',
                        gap: '0.75rem',
                        scrollPaddingLeft: '1rem',
                    }}
                >
                    {FEATURES.map(({ number, icon, title, description, video }) => (
                        <div
                            key={number}
                            data-slide={number - 1}
                            className="flex-none snap-start"
                            style={{ width: 'calc(100vw - 4rem)' }}
                        >
                            <FeatureGridItem
                                number={number}
                                icon={icon}
                                title={title}
                                description={description}
                                video={video}
                                onDemo={openDemo}
                            />
                        </div>
                    ))}
                    <div className="flex-none" style={{ width: '1rem' }} />
                </div>
                {/* Dots */}
                <div className="flex justify-center gap-2 mt-5">
                    {FEATURES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(idx)}
                            className={`rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-5 h-2 bg-emerald-500' : 'w-2 h-2 bg-gray-400/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};