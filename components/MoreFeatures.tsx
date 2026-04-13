import React from 'react';
import { PhoneMockup } from './PhoneMockup';
import { User, RefreshCw, Zap, Lock, Layers, Headphones, ChevronRight, CreditCard, PieChart, Wallet, Repeat2, Bell, TrendingUp, Bitcoin } from 'lucide-react';

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
        <section className="relative py-24 overflow-hidden min-h-[800px] flex flex-col justify-center">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0 }}
                src="/videos/video_funcionalidades.mp4"
            />

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
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                    
                    {/* Left Side: Phone Mockup with Background Blob */}
                    <div className="w-full md:w-1/2 relative flex justify-center md:justify-start">
                        {/* Phone Mockup */}
                        
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
                                icon={CreditCard} 
                                colorClass="text-cyan-500"
                                title="Controle de Parcelas" 
                                description="Acompanhe cada parcela dos seus débitos e saiba exatamente quando cada uma vence."
                            />
                            <FeatureGridItem 
                                icon={Wallet} 
                                colorClass="text-cyan-500"
                                title="Todos os Cartões" 
                                description="Centralize todos os seus cartões em um único lugar e visualize faturas e limites facilmente."
                            />
                            <FeatureGridItem 
                                icon={Repeat2} 
                                colorClass="text-cyan-500"
                                title="Controle de Assinaturas" 
                                description="Gerencie todas as suas assinaturas recorrentes e evite cobranças indesejadas."
                            />
                            <FeatureGridItem 
                                icon={PieChart} 
                                colorClass="text-cyan-500"
                                title="Gastos e Entradas" 
                                description="Controle completo das suas receitas e despesas com categorias personalizáveis."
                            />
                            <FeatureGridItem 
                                icon={Zap} 
                                colorClass="text-cyan-500"
                                title="Análise Inteligente com IA" 
                                description="Módulos de análise financeira com inteligência artificial para insights personalizados."
                            />
                            <FeatureGridItem 
                                icon={Bitcoin} 
                                colorClass="text-cyan-500"
                                title="Investimentos e Cripto" 
                                description="Controle e gerencie seus investimentos e criptoativos em um painel unificado."
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