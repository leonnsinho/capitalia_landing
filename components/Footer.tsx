import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send, ArrowRight, Apple, Play } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden">
            {/* Decorative Top Border Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500"></div>
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Column 1: Brand & App Buttons */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/capitalia_logo.png" alt="Capitalia" className="h-10 w-auto object-contain brightness-0 invert" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A plataforma definitiva para gestão financeira inteligente. 
                            Transforme sua relação com o dinheiro através de tecnologia e design.
                        </p>
                        <div className="flex flex-col space-y-3 pt-2">
                             <button className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/50 transition-all rounded-lg px-4 py-2 w-fit group">
                                <Apple size={20} className="text-white group-hover:text-emerald-400 transition-colors" />
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-400 uppercase">Download on the</div>
                                    <div className="text-xs font-bold">App Store</div>
                                </div>
                             </button>
                             <button className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-emerald-500/50 transition-all rounded-lg px-4 py-2 w-fit group">
                                <div className="text-white group-hover:text-emerald-400 transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-400 uppercase">Get it on</div>
                                    <div className="text-xs font-bold">Google Play</div>
                                </div>
                             </button>
                        </div>
                    </div>

                    {/* Column 2: Product Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Produto</h4>
                        <ul className="space-y-4">
                            {['Funcionalidades', 'Segurança', 'Planos', 'Para Empresas', 'Atualizações'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Empresa</h4>
                        <ul className="space-y-4">
                            {['Sobre Nós', 'Carreiras', 'Blog', 'Imprensa', 'Contato'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Novidades</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Receba dicas financeiras e novidades do app diretamente no seu e-mail.
                        </p>
                        <div className="relative">
                            <input 
                                type="email" 
                                placeholder="Seu melhor e-mail" 
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-white placeholder-gray-500"
                            />
                            <button className="absolute right-1 top-1 bottom-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-3 transition-colors flex items-center justify-center">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="mt-6 flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 Capitalia Inc. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Política de Privacidade</a>
                        <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Termos de Uso</a>
                        <a href="#" className="text-gray-500 hover:text-emerald-400 text-sm transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}