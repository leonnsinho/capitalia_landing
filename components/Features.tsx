import React, { useState } from 'react';
import { PhoneMockup } from './PhoneMockup';
import { Bot, Sparkles, Layout, ShieldCheck, ArrowRight, MessageSquare, Mic, Paperclip, Play, X } from 'lucide-react';

const VideoPhoneMockup = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className={`transition-all duration-700 ease-out z-40 origin-center ${isPlaying ? 'scale-110 md:scale-125' : 'scale-90 md:scale-100'}`}>
             <PhoneMockup className="!h-[550px] !w-[280px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden bg-gray-900">
                {!isPlaying ? (
                    <div 
                        className="relative w-full h-full flex items-center justify-center cursor-pointer group"
                        onClick={() => setIsPlaying(true)}
                    >
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/capa-video.png')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                        
                        <div className="relative z-10 flex flex-col items-center gap-3 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                                <Play size={24} className="text-white fill-white ml-1" />
                            </div>
                            <span className="text-white font-medium text-xs uppercase tracking-wider">Ver Vídeo</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full bg-black relative flex items-center justify-center">
                        <button 
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-12 right-4 z-50 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                        <video
                            className="w-full h-full object-cover"
                            src="/videos/video-chat.mp4"
                            autoPlay
                            controls
                            playsInline
                        />
                    </div>
                )}
             </PhoneMockup>
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
  return (
    <section id="features" className="relative py-24 bg-white overflow-hidden">
        {/* Decorative Big Circle Left (Like Reference) */}
        <div className="absolute top-1/2 -left-48 transform -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400 rounded-full opacity-10 blur-3xl pointer-events-none" />
        
        {/* Decorative Circle Right Bottom */}
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-emerald-400 rounded-full opacity-5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                
                {/* Left Side: Content */}
                <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="h-px w-8 bg-emerald-500"></span>
                        <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Sobre o App</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        INTELIGÊNCIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">ARTIFICIAL</span> NO SEU BOLSO
                    </h2>
                    
                    <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                        O Capitalia não é apenas um app de finanças, é o seu assistente pessoal. 
                        Com tecnologia de ponta, analisamos seus hábitos para sugerir economias 
                        inteligentes e investimentos personalizados.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 mb-10">
                        <FeatureItem 
                            icon={Sparkles} 
                            title="IA Personalizada" 
                            description="Insights adaptados ao seu estilo de vida." 
                        />
                        <FeatureItem 
                            icon={Layout} 
                            title="Design Intuitivo" 
                            description="Interface limpa e fácil de navegar." 
                        />
                        <FeatureItem 
                            icon={Bot} 
                            title="Assistente 24h" 
                            description="Tire dúvidas financeiras a qualquer momento." 
                        />
                        <FeatureItem 
                            icon={ShieldCheck} 
                            title="Segurança Militar" 
                            description="Criptografia avançada para seus dados." 
                        />
                    </div>

                    <button className="group bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all flex items-center gap-2">
                        CONHECER FUNCIONALIDADES
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Side: Visuals */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
                    {/* The Big Background Circle */}
                    <div className="relative w-[450px] h-[450px] md:w-[550px] md:h-[550px] flex items-center justify-center">
                        
                        {/* Circle Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-emerald-400 rounded-full opacity-100 shadow-[0_20px_50px_rgba(16,185,129,0.3)] animate-pulse" style={{ animationDuration: '4s' }}></div>
                        
                        {/* Inner Circle Decoration */}
                        <div className="absolute inset-8 border border-white/20 rounded-full"></div>
                        <div className="absolute inset-24 border border-white/10 rounded-full"></div>

                        {/* Floating Elements */}
                        <div className="absolute top-0 right-10 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float-delayed z-30">
                            <MessageSquare className="text-emerald-500" size={24} />
                        </div>
                        
                        <div className="absolute bottom-10 left-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-float z-30">
                            <Bot className="text-cyan-500" size={32} />
                        </div>

                        {/* Phone */}
                        <VideoPhoneMockup />
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};