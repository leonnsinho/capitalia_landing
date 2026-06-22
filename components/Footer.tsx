import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Phone, Mail, Shield, X } from 'lucide-react';

const FEATURES = [
    { label: 'Gastos e Entradas',         video: 'KDdenyrbvPE' },
    { label: 'Todos os Cartões',           video: 'sdxcDIiYAyw' },
    { label: 'Controle de Parcelas',       video: '9QMWoWA9jbg' },
    { label: 'Controle de Assinaturas',    video: 'eJVMB5je7YI' },
    { label: 'Análise Inteligente com IA', video: 'Z1JFXb9oFJ8' },
    { label: 'Investimentos e Cripto',     video: 'fasA47mqPRg' },
];

const FooterVideoModal = ({ title, video, onClose }: { title: string; video: string; onClose: () => void }) => {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }, [onClose]);
    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8" style={{ zIndex: 99999 }} onClick={onClose}>
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
            <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_30px_80px_-10px_rgba(0,0,0,0.7)]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between bg-gray-950 px-5 py-3.5">
                    <span className="text-white font-semibold text-sm truncate">{title}</span>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors ml-4 shrink-0 p-1 rounded-lg hover:bg-white/10" aria-label="Fechar">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${video}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
            </div>
        </div>,
        document.body
    );
};

export const Footer: React.FC = () => {
    const [modal, setModal] = useState<{ title: string; video: string } | null>(null);
    return (
        <footer className="bg-gray-950 text-white pt-20 pb-10 relative overflow-hidden rounded-t-[3.5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.25)] mt-0">
            {modal && <FooterVideoModal title={modal.title} video={modal.video} onClose={() => setModal(null)} />}

            {/* Ambient Background Glows */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-900/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Top brand row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14 pb-10 border-b border-white/8">
                    <div className="flex items-center gap-3">
                        <img src="/capitalia_logo.png" alt="Capitalia" className="h-12 w-auto object-contain" />
                        <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Rowdies, sans-serif' }}>
                            CAPITAL<span className="text-emerald-400">IA</span>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                        A plataforma definitiva para gestão financeira inteligente com IA. Controle, planeje e evolua sua vida financeira.
                    </p>
                    {/* Play Store CTA */}
                    <a
                        href="https://play.google.com/store/apps/details?id=com.capitalia.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 rounded-xl px-4 py-3 group shrink-0"
                    >
                        <img src="/play-store.png" alt="Play Store" className="w-6 h-6 object-contain" />
                        <div className="text-left">
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Get it on</div>
                            <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Google Play</div>
                        </div>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

                    {/* Column 1: About */}
                    <div className="space-y-5">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400">Sobre</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A plataforma definitiva para gestão financeira inteligente com IA. Controle, planeje e evolua sua vida financeira.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Shield size={13} className="text-emerald-500 shrink-0" />
                            Dados protegidos com criptografia
                        </div>
                    </div>

                    {/* Column 2: Funcionalidades */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400 mb-5">Funcionalidades</h4>
                        <ul className="space-y-3.5">
                            {FEATURES.map(({ label, video }) => (
                                <li key={label}>
                                    <button
                                        onClick={() => setModal({ title: label, video })}
                                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group text-left"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300 rounded-full"></span>
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400 mb-5">Links Rápidos</h4>
                        <ul className="space-y-3.5">
                            {[
                                { label: 'Home', id: 'home' },
                                { label: 'IA', id: 'ia' },
                                { label: 'Funcionalidades', id: 'funcionalidades' },
                                { label: 'Interface', id: 'interface' },
                                { label: 'Planos', id: 'planos' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent('capitaliaNavigate', { detail: { id: item.id } }))}
                                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300 rounded-full"></span>
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Suporte */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400 mb-5">Suporte</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:contato@stormcore.com.br" className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                                    <Mail size={15} className="text-emerald-500 shrink-0" />
                                    contato@stormcore.com.br
                                </a>
                            </li>
                            <li>
                                <a href="https://wa.me/5512992526242" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                                    <Phone size={15} className="text-emerald-500 shrink-0" />
                                    +55 12 99252-6242
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} Capitalia. Todos os direitos reservados.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Storm Core Ltda &nbsp;·&nbsp; CNPJ 64.104.432/0001-25
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Shield size={12} className="text-emerald-600" />
                        Seus dados estão protegidos com criptografia de ponta a ponta
                    </div>
                    <div className="flex gap-5">
                        <a href="https://app.capitaliahealth.com/privacidade.html" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400 text-xs transition-colors">Privacidade</a>
                        <a href="https://app.capitaliahealth.com/termos.html" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400 text-xs transition-colors">Termos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};