import React, { useState } from 'react';
import { PhoneMockup } from './PhoneMockup';

export const Screenshots: React.FC = () => {
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  const activeImg = hoveredImg ?? 1;

  return (
    <section id="screenshots" className="relative py-16 bg-white overflow-hidden">

        {/* Decorative Background Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-emerald-400 rounded-full opacity-100 z-0 shadow-[0_0_100px_rgba(16,185,129,0.4)] animate-pulse" style={{ animationDuration: '8s' }} />

        {/* Header Section */}
        <div className="text-center mb-20 relative z-10 px-4">
             <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
                INTERFACE DO <span className="text-gray-800">CAPITAL<span className="text-emerald-500">IA</span></span>
             </h2>
             <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full mb-6"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-row items-end gap-4">

                {/* Left — Phone Mockup (shows hovered image) */}
                <div className="flex-shrink-0 z-20 transition-transform duration-300" style={{ transform: hoveredImg ? 'scale(1.06)' : 'scale(1)' }}>
                    <PhoneMockup className="!h-[580px] !w-[285px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.35)]">
                        <div className="relative w-full h-full">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <img
                                    key={n}
                                    src={`/interface/${n}.jpg`}
                                    alt={`Interface ${n}`}
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300"
                                    style={{ opacity: activeImg === n ? 1 : 0 }}
                                />
                            ))}
                        </div>
                    </PhoneMockup>
                </div>

                {/* Right — 4 images in a single row */}
                <div className="flex flex-row gap-3 flex-1">
                    {[2, 3, 4, 5].map((n) => (
                        <div
                            key={n}
                            className="rounded-2xl overflow-hidden shadow-lg flex-1 cursor-pointer transition-all duration-300"
                            style={{
                                height: '480px',
                                outline: hoveredImg === n ? '3px solid #10b981' : '3px solid transparent',
                                transform: hoveredImg === n ? 'translateY(-8px)' : 'translateY(0)',
                            }}
                            onMouseEnter={() => setHoveredImg(n)}
                            onMouseLeave={() => setHoveredImg(null)}
                        >
                            <img
                                src={`/interface/${n}.jpg`}
                                alt={`Interface ${n}`}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  );
};
