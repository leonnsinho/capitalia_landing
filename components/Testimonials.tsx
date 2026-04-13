import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Powered by</p>
          <a
            href="https://stormcore.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-black text-gray-700 hover:text-gray-900 transition-colors duration-300 tracking-tight"
            style={{ fontFamily: 'Exo 2, sans-serif' }}
          >
            Storm<span className="text-blue-500">Core</span>
          </a>
        </div>
      </div>
    </section>
  );
};
