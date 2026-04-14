import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Layout, ShieldCheck, ArrowRight, Bot, Play, Pause } from 'lucide-react';

const VideoPhoneMockup = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Auto-play/pause based on viewport visibility
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) { video.play().catch(() => {}); }
        else { video.pause(); }
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video || !video.duration) return;
        video.currentTime = (parseFloat(e.target.value) / 100) * video.duration;
        setProgress(parseFloat(e.target.value));
    };

    const fmt = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`;

    return (
        <div className="relative w-full max-w-xs rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] bg-black">
            <video
                ref={videoRef}
                className="w-full h-auto object-cover"
                src="/videos/video-chat.mp4"
                muted
                playsInline
                loop
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {/* Custom controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-5 pt-10">
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1 rounded-full cursor-pointer mb-3 accent-emerald-400"
                />
                <div className="flex items-center justify-between">
                    <button onClick={togglePlay} className="text-white hover:text-emerald-400 transition-colors">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <span className="text-white/70 text-[11px] tabular-nums">
                        {fmt(currentTime)} / {fmt(duration)}
                    </span>
                </div>
            </div>
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

                        {/* Phone */}
                        <VideoPhoneMockup />
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};