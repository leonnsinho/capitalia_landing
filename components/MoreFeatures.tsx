import React from 'react';
import { PhoneMockup } from './PhoneMockup';
import { User, RefreshCw, Zap, Lock, Layers, Headphones, ChevronRight, CreditCard, PieChart, Wallet } from 'lucide-react';

// Tela simulada de Menu/Gestão (Modo Escuro)
const ManagementScreen = () => (
    <div className="flex flex-col h-full bg-gray-900 font-body text-white p-6">
        {/* User Profile */}
        <div className="flex items-center gap-4 mb-10 mt-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[2px]">
                <div className="w-full h-full rounded-full bg-gray-800 border-2 border-transparent overflow-hidden">
                     <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-full h-full object-cover" />
                </div>
            </div>
            <div>
                <h3 className="font-bold text-lg">Carlos Eduardo</h3>
                <p className="text-xs text-gray-400">Membro Premium</p>
            </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6 flex-1">
            <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4 text-emerald-400">
                    <PieChart size={20} />
                    <span className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">Visão Geral</span>
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full">Novo</div>
            </div>

            <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-emerald-400 transition-colors">
                    <Wallet size={20} />
                    <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">Minhas Contas</span>
                </div>
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">3</div>
            </div>

            <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-emerald-400 transition-colors">
                    <CreditCard size={20} />
                    <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">Cartões</span>
                </div>
            </div>

             <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-emerald-400 transition-colors">
                    <Zap size={20} />
                    <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">Investimentos</span>
                </div>
            </div>

            <div className="h-px bg-gray-800 my-4"></div>

            <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4 text-gray-400 group-hover:text-emerald-400 transition-colors">
                    <Lock size={20} />
                    <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">Segurança</span>
                </div>
            </div>
        </div>

        {/* Footer Info */}
        <div className="mt-auto">
            <div className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400">Fatura Atual</p>
                    <p className="font-bold text-emerald-400">R$ 1.240,50</p>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
            </div>
        </div>
    </div>
);

const FeatureGridItem = ({ icon: Icon, title, description, colorClass }: { icon: any, title: string, description: string, colorClass: string }) => (
    <div className="flex flex-col items-start">
        <Icon className={`w-8 h-8 mb-4 ${colorClass}`} />
        <h4 className="font-bold text-gray-900 text-lg mb-2">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
);

export const MoreFeatures: React.FC = () => {
    return (
        <section className="relative py-24 overflow-hidden min-h-[800px] flex flex-col justify-center" style={{ backgroundImage: "url('/Funcionalidades-fundo.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                    
                    {/* Left Side: Phone Mockup with Background Blob */}
                    <div className="w-full md:w-1/2 relative flex justify-center md:justify-start">
                        {/* Organic Blue Shape Background */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] md:w-[500px] md:h-[500px] bg-[#00d2ff] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] opacity-90 -z-10 animate-float-delayed"></div>
                        
                        <div className="transform md:translate-x-12">
                             <PhoneMockup className="shadow-2xl">
                                <ManagementScreen />
                             </PhoneMockup>
                        </div>
                    </div>

                    {/* Right Side: Content Grid */}
                    <div className="w-full md:w-1/2">
                        <div className="mb-12">
                             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase tracking-wide">
                                Funcionalidades do <span className="text-emerald-500">Capitalia</span>
                             </h2>
                             <div className="w-20 h-1 bg-emerald-500 mt-4 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                            <FeatureGridItem 
                                icon={User} 
                                colorClass="text-cyan-500"
                                title="Fácil de Usar" 
                                description="Interface limpa projetada para que você faça lançamentos e consultas em segundos."
                            />
                            <FeatureGridItem 
                                icon={RefreshCw} 
                                colorClass="text-cyan-500"
                                title="Atualização Rápida" 
                                description="Sincronização bancária em tempo real para que seus saldos estejam sempre corretos."
                            />
                            <FeatureGridItem 
                                icon={Zap} 
                                colorClass="text-cyan-500"
                                title="Alta Performance" 
                                description="Carregamento instantâneo de gráficos complexos e relatórios de investimento."
                            />
                             <FeatureGridItem 
                                icon={Lock} 
                                colorClass="text-cyan-500"
                                title="100% Seguro" 
                                description="Criptografia de ponta a ponta e autenticação biométrica para sua tranquilidade."
                            />
                             <FeatureGridItem 
                                icon={Layers} 
                                colorClass="text-cyan-500"
                                title="Gestão Completa" 
                                description="Controle cartões, contas correntes e metas de economia em um único lugar."
                            />
                             <FeatureGridItem 
                                icon={Headphones} 
                                colorClass="text-cyan-500"
                                title="Suporte 24/7" 
                                description="Nossa equipe de especialistas está sempre pronta para ajudar você."
                            />
                        </div>

                         {/* Decorative Circle Bottom Right */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[20px] border-cyan-400 rounded-full opacity-20 hidden md:block"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};