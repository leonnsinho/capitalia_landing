import React from 'react';
import { Zap, CreditCard, PieChart, Wallet, Repeat2, Bitcoin, Play } from 'lucide-react';

const FeatureGridItem = ({ icon: Icon, title, description, colorClass, number }: { icon: any, title: string, description: string, colorClass: string, number: number }) => (
    <div className="relative flex flex-col items-start bg-white/85 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
        <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center shadow-md">
            {number}
        </div>
        <Icon className={`w-7 h-7 mb-3 ${colorClass}`} />
        <h4 className="font-bold text-gray-900 text-base mb-1">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
        <button className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors px-3 py-1.5 rounded-lg">
            <Play className="w-3 h-3 fill-emerald-600" />
            Ver Demo
        </button>
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
                                icon={CreditCard} 
                                colorClass="text-cyan-500"
                                title="Controle de Parcelas" 
                                description="Acompanhe cada parcela dos seus débitos e saiba exatamente quando cada uma vence."
                            />
                            <FeatureGridItem 
                                number={2}
                                icon={Wallet} 
                                colorClass="text-cyan-500"
                                title="Todos os Cartões" 
                                description="Centralize todos os seus cartões em um único lugar e visualize faturas e limites facilmente."
                            />
                            <FeatureGridItem 
                                number={3}
                                icon={Repeat2} 
                                colorClass="text-cyan-500"
                                title="Controle de Assinaturas" 
                                description="Gerencie todas as suas assinaturas recorrentes e evite cobranças indesejadas."
                            />
                            <FeatureGridItem 
                                number={4}
                                icon={PieChart} 
                                colorClass="text-cyan-500"
                                title="Gastos e Entradas" 
                                description="Controle completo das suas receitas e despesas com categorias personalizáveis."
                            />
                            <FeatureGridItem 
                                number={5}
                                icon={Zap} 
                                colorClass="text-cyan-500"
                                title="Análise Inteligente com IA" 
                                description="Módulos de análise financeira com inteligência artificial para insights personalizados."
                            />
                            <FeatureGridItem 
                                number={6}
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
        </section>
    );
};