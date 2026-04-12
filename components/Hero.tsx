import React from 'react';
import { ArrowRight } from 'lucide-react';

// SVG Background Blob
const BackgroundBlob = () => (
  <div className="absolute top-0 right-0 w-full md:w-[65%] h-full overflow-hidden z-0 pointer-events-none">
     <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,1000 C300,1000 200,800 200,600 C200,300 100,200 400,100 C600,0 800,100 1000,0 V1000 Z" fill="#10b981" className="opacity-10" />
        <path d="M1000,0 L1000,1000 L300,1000 C600,800 500,500 800,200 C900,100 950,50 1000,0 Z" fill="#34d399" />
        <path d="M1000,300 C900,400 700,500 800,800 C850,950 950,980 1000,1000 V300 Z" fill="#059669" className="opacity-20" />
        <circle cx="850" cy="200" r="50" fill="rgba(255,255,255,0.1)" />
        <circle cx="600" cy="800" r="100" fill="rgba(255,255,255,0.1)" />
     </svg>
  </div>
);

// Floating Decorative Circle
const FloatingDonut = ({ className, color }: { className: string, color: string }) => (
    <div className={`absolute rounded-full border-[15px] ${color} ${className} opacity-60 z-10`} />
);



export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-screen max-h-screen lg:h-[125vh] lg:max-h-[125vh] pt-20 pb-10 md:pb-0 overflow-hidden bg-white">
      {/* Background Graphic */}
      <BackgroundBlob />

      {/* Floating Circles (Donuts) - Mimicking the reference */}
      <FloatingDonut className="w-20 h-20 border-cyan-400 top-[20%] right-[10%] animate-float-delayed hidden md:block" color="border-cyan-200" />
      <FloatingDonut className="w-32 h-32 border-emerald-300 bottom-[10%] right-[40%] animate-float hidden md:block" color="border-emerald-200" />
      <FloatingDonut className="w-10 h-10 border-emerald-500 top-[15%] left-[5%] animate-pulse opacity-20" color="border-emerald-100" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col md:flex-row items-center h-full">
          
          {/* Left Content - Text */}
          <div className="w-full md:w-1/2 z-10 pt-10 md:pt-0 flex flex-col justify-center h-full">
             <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
               <span className="text-emerald-500">Capitalia</span> App
               <br />
               <span className="text-xl sm:text-2xl md:text-4xl text-gray-600 font-normal mt-2 block">Controle Financeiro Inteligente</span>
             </h1>
             
             <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
               Transforme suas ideias financeiras em realidade. O Capitalia oferece insights poderosos, design responsivo e uma interface elegante para gerenciar seu patrimônio.
             </p>

             {/* Main CTA */}
             <div className="mb-8">
               <a 
                 href="https://capitaliahealth.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-emerald-500 rounded-full hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
               >
                 Cadastrar grátis
                 <ArrowRight className="ml-2 w-5 h-5" />
               </a>
             </div>

             {/* Platform Buttons */}
             <div className="flex flex-wrap gap-3 mb-12">
                <button className="bg-gray-900 text-white px-5 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition shadow-lg">
                    <img src="/windows.png" alt="Windows" className="w-6 h-6 object-contain" />
                    <div className="text-left">
                        <div className="text-[10px] uppercase opacity-70">Instalar no</div>
                        <div className="font-bold text-sm">Windows</div>
                    </div>
                </button>
                <button className="bg-gray-900 text-white px-5 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition shadow-lg">
                    <img src="/app-store.png" alt="Apple" className="w-6 h-6 object-contain brightness-0 invert" />
                    <div className="text-left">
                        <div className="text-[10px] uppercase opacity-70">Instalar no</div>
                        <div className="font-bold text-sm">Safari</div>
                    </div>
                </button>
                <button className="bg-gray-900 text-white px-5 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition shadow-lg">
                    <img src="/play-store.png" alt="Google Play" className="w-6 h-6 object-contain" />
                    <div className="text-left">
                        <div className="text-[10px] uppercase opacity-70">Baixe no</div>
                        <div className="font-bold text-sm">Google Play</div>
                    </div>
                </button>
             </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="hidden md:flex w-full md:w-1/2 relative h-full items-center justify-center z-10">
            <img src="/hero-right.png" alt="Capitalia App" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};