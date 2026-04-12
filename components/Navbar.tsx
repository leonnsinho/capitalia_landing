import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        scrolled 
          ? 'top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[90%] max-w-6xl rounded-full bg-white/80 backdrop-blur-lg shadow-lg shadow-emerald-500/5 border border-white/20 py-3' 
          : 'top-0 left-0 right-0 w-full bg-transparent py-6'
      }`}
    >
      <div className={`mx-auto px-4 sm:px-8 h-full flex flex-col justify-center ${scrolled ? 'max-w-none' : 'max-w-7xl'}`}>
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <img src="/capitalia_logo.png" alt="Capitalia" className="h-9 w-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {['Home', 'Funcionalidades', 'Sobre', 'Blog', 'Contato'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50' 
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-white/50'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center">
             <button className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg ${
                 scrolled 
                 ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20' 
                 : 'bg-gray-900 text-white hover:bg-gray-800'
             }`}>
              Baixar App
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-500 focus:outline-none p-2 bg-transparent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute left-0 w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen 
            ? 'opacity-100 translate-y-2 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        } ${scrolled ? 'px-0 top-full' : 'px-4 top-20'}`}
      >
          <div className={`bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-4 space-y-2 ${scrolled ? 'mx-0 mt-2' : 'mx-0'}`}>
            {['Home', 'Funcionalidades', 'Sobre', 'Blog', 'Contato'].map((item) => (
               <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
               >
                 {item}
               </a>
            ))}
            <div className="pt-2">
                <button className="w-full bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-emerald-600 transition-colors">
                  Baixar Agora
                </button>
            </div>
          </div>
        </div>
    </nav>
  );
};