import React from 'react';

export const VideoSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden min-h-[800px] flex flex-col justify-center bg-white">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Demonstração</span>
              <span className="h-px w-8 bg-emerald-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Veja o <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Futuro</span> das Finanças
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Descubra como o Capitalia simplifica sua vida financeira em menos de 2 minutos. 
            Uma experiência fluida, inteligente e desenhada para você.
          </p>
        </div>

        {/* Video */}
        <div className="relative max-w-7xl mx-auto">
            <video
                className="w-full h-auto rounded-2xl"
                src="/videos/video-notebook.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
        </div>

      </div>
    </section>
  );
};
