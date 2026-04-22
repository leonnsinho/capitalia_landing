import React from 'react';
import { MapPin, Mail, Shield, Zap, Users } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-950 text-white pt-20 pb-10 relative overflow-hidden rounded-t-[3.5rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.25)] mt-0">

            {/* Ambient Background Glows */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-900/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Top brand row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14 pb-10 border-b border-white/8">
                    <div className="flex items-center gap-3">
                        <img src="/capitalia_logo.png" alt="Capitalia" className="h-12 w-auto object-contain brightness-0 invert" />
                        <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Rowdies, sans-serif' }}>
                            CAPITAL<span className="text-emerald-400">IA</span>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                        A plataforma definitiva para gestão financeira inteligente com IA. Controle, planeje e evolua sua vida financeira.
                    </p>
                    {/* Play Store CTA */}
                    <a
                        href="https://capitaliahealth.com/"
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

                    {/* Column 2: Product */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400 mb-5">Produto</h4>
                        <ul className="space-y-3.5">
                            {[
                                { label: 'Funcionalidades', icon: Zap },
                                { label: 'Planos e Preços', icon: null },
                                { label: 'Segurança', icon: Shield },
                                { label: 'Atualizações', icon: null },
                                { label: 'Para Empresas', icon: Users },
                            ].map(({ label, icon: Icon }) => (
                                <li key={label}>
                                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300 rounded-full"></span>
                                        {label}
                                    </a>
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

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-400 mb-5">Contato</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={15} className="text-emerald-500 shrink-0" />
                                contato@stormcore.com.br
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <MapPin size={15} className="text-emerald-500 shrink-0" />
                                Brasil
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} Capitalia. Todos os direitos reservados.
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