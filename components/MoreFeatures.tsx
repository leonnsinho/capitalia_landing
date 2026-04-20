import React, { useState, useEffect } from 'react';
import { Zap, CreditCard, PieChart, Wallet, Repeat2, Bitcoin, Play, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Video Modal — supports YouTube IDs and local file paths (starting with /)
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

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Dialog */}
            <div
                className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-900 px-5 py-3">
                    <span className="text-white font-semibold text-sm truncate">{title}</span>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors ml-4 shrink-0"
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
        </div>
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
    <div className="relative flex flex-col items-start bg-white/85 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
        <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shadow-md">
            {number}
        </div>
        <Icon className={`w-7 h-7 mb-3 ${colorClass}`} />
        <h4 className="font-bold text-gray-900 text-base mb-1">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
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

    const openDemo = (video: string, title: string) => setModal({ video, title });
    const closeDemo = () => setModal(null);

    return (
        <section className="relative py-24 overflow-hidden min-h-[800px] flex flex-col justify-center" style={{ backgroundImage: "url('/Funcionalidades-fundo.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

            {modal && <VideoModal video={modal.video} title={modal.title} onClose={closeDemo} />}

            {/* Background Shape Left (Cyan Blob) */}
            <div className="absolute top-0 left-0 w-[60%] h-full bg-cyan-400/5 rounded-br-[100px] -z-10 hidden md:block" />
            
            {/* Decorative Dot Pattern Top Right */}
            <div className="absolute top-10 right-0 w-64 h-64 opacity-10 -z-10">
                 <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="2" fill="#10b981" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
                    {/* Content Grid */}
                    <div className="w-full">
                        <div className="mb-12">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-px w-8 bg-emerald-500"></span>
                                <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Funcionalidades</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase leading-tight">
                                FUNCIONALIDADES DO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">CAPITALIA</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            <FeatureGridItem
                                number={1}
                                icon={PieChart}
                                colorClass="text-cyan-500"
                                title="Gastos e Entradas"
                                description="Controle completo das suas receitas e despesas com categorias personalizáveis."
                                video="KDdenyrbvPE"
                                onDemo={openDemo}
                            />
                            <FeatureGridItem
                                number={2}
                                icon={Wallet}
                                colorClass="text-cyan-500"
                                title="Todos os Cartões"
                                description="Centralize todos os seus cartões em um único lugar e visualize faturas e limites facilmente."
                                video="sdxcDIiYAyw"
                                onDemo={openDemo}
                            />
                            <FeatureGridItem
                                number={3}
                                icon={CreditCard}
                                colorClass="text-cyan-500"
                                title="Controle de Parcelas"
                                description="Acompanhe cada parcela dos seus débitos e saiba exatamente quando cada uma vence."
                                video="9QMWoWA9jbg"
                                onDemo={openDemo}
                            />
                            <FeatureGridItem
                                number={4}
                                icon={Repeat2}
                                colorClass="text-cyan-500"
                                title="Controle de Assinaturas"
                                description="Gerencie todas as suas assinaturas recorrentes e evite cobranças indesejadas."
                                video="eJVMB5je7YI"
                                onDemo={openDemo}
                            />
                            <FeatureGridItem
                                number={5}
                                icon={Zap}
                                colorClass="text-cyan-500"
                                title="Análise Inteligente com IA"
                                description="Módulos de análise financeira com inteligência artificial para insights personalizados."
                                video="/videos/video-chat.mp4"
                                onDemo={openDemo}
                            />
                            <FeatureGridItem
                                number={6}
                                icon={Bitcoin}
                                colorClass="text-cyan-500"
                                title="Investimentos e Cripto"
                                description="Controle e gerencie seus investimentos e criptoativos em um painel unificado."
                                video="fasA47mqPRg"
                                onDemo={openDemo}
                            />
                        </div>

                         {/* Decorative Circle Bottom Right */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[20px] border-cyan-400 rounded-full opacity-20 hidden md:block"></div>
                    </div>
            </div>
        </section>
    );
};