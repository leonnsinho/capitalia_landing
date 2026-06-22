import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'IA', id: 'ia' },
  { label: 'Funcionalidades', id: 'funcionalidades' },
  { label: 'Interface', id: 'interface' },
  { label: 'Planos', id: 'planos' },
];

// IDs are on sticky wrappers whose offsetTop can be unreliable.
// Instead, dispatch a custom event handled by App.tsx which has the wrapperRefs.
const scrollToSection = (id: string) => {
  window.dispatchEvent(new CustomEvent('capitaliaNavigate', { detail: { id } }));
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">

      {/* Inner pill — animates visually, never moves in the DOM */}
      <div
        className={`
          mx-auto flex items-center justify-between
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled
            ? 'max-w-5xl rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl shadow-black/5 border border-gray-100 px-5 py-3'
            : 'max-w-7xl rounded-none bg-transparent border-transparent px-2 py-3'
          }
        `}
      >
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer">
          <img src="/capitalia_logo.png" alt="Capitalia" className="h-11 w-auto object-contain" />
          <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Rowdies, sans-serif' }}>
            CAPITAL<span className="text-emerald-500">IA</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${scrolled
                  ? 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                  : 'text-gray-700 hover:text-emerald-600 hover:bg-white/60'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.capitalia.app"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95
              ${scrolled
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 hover:bg-emerald-600'
                : 'bg-gray-900 text-white shadow-md hover:bg-gray-800'
              }`}
          >
            <img src="/play-store.png" alt="Play Store" className="w-4 h-4 object-contain" />
            Baixar App
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden mx-auto max-w-5xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden
          ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
      >
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100 shadow-xl rounded-2xl p-3 space-y-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => { scrollToSection(id); setIsOpen(false); }}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="pt-1 pb-1">
            <a
              href="https://play.google.com/store/apps/details?id=com.capitalia.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:bg-emerald-600 transition-colors"
            >
              <img src="/play-store.png" alt="Play Store" className="w-4 h-4 object-contain" />
              Baixar App
            </a>
          </div>
        </div>
      </div>

    </nav>
  );
};