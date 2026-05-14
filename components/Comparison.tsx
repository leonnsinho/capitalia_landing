import React from 'react';

export const Comparison: React.FC = () => {
  return (
    <section className="relative w-full py-12 md:py-16 flex justify-center items-center overflow-hidden" style={{ backgroundColor: '#FCFCFC' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes comparisonBorder {
          100% { transform: translate(-50%, -50%) rotate(1turn); }
        }
        .comparison-border-wrap {
          position: relative;
          border-radius: 1.25rem;
          padding: 3px;
          background: transparent;
        }
        .comparison-border-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 3px;
          background: transparent;
          z-index: 0;
        }
        .comparison-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 1.25rem;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .comparison-border-glow::before {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          width: 300%; height: 300%;
          background: conic-gradient(from 0deg, transparent 60%, #dc2626 73%, #fca5a5 82%, #ef4444 88%, #dc2626 95%, transparent 100%);
          transform: translate(-50%, -50%) rotate(0deg);
          animation: comparisonBorder 3s linear infinite;
        }
      `}} />

      <div className="comparison-border-wrap w-full max-w-[90%] mx-auto shadow-2xl shadow-red-500/20">
        {/* Animated border ring */}
        <div className="comparison-border-glow" />
        {/* Image */}
        <div className="relative z-10 rounded-[1.1rem] overflow-hidden">
          <img
            src="/comparação.png"
            alt="Comparação: planilha vs Capitalia App"
            className="w-full h-auto block hidden md:block"
          />
          <img
            src="/comparação-mobile.png"
            alt="Comparação: planilha vs Capitalia App"
            className="w-full h-auto block md:hidden"
          />
        </div>
      </div>
    </section>
  );
};
