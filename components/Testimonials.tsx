import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Mariana Costa',
    role: 'Designer Gráfica',
    image: 'https://i.pravatar.cc/150?img=5',
    content: "O Capitalia mudou completamente minha relação com dinheiro. A interface é linda e os insights da IA realmente me ajudaram a economizar para minha viagem.",
    stars: 5,
    delay: '0ms'
  },
  {
    id: 2,
    name: 'Ricardo Almeida',
    role: 'Empreendedor',
    image: 'https://i.pravatar.cc/150?img=11',
    content: "Já testei dezenas de apps financeiros, mas nenhum se compara. A sincronização automática com os bancos funciona perfeitamente e os relatórios são incríveis.",
    stars: 5,
    delay: '100ms'
  },
  {
    id: 3,
    name: 'Fernanda Lima',
    role: 'Médica',
    image: 'https://i.pravatar.cc/150?img=9',
    content: "Simplesmente fantástico. Consigo ver meus investimentos e gastos em um só lugar. O suporte é super rápido e atencioso. Recomendo para todos!",
    stars: 5,
    delay: '200ms'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Depoimentos</span>
              <span className="h-px w-8 bg-emerald-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Quem usa, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Recomenda</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Junte-se a milhares de usuários que transformaram sua vida financeira com o Capitalia.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] transition-all duration-300 transform hover:-translate-y-2 relative group border border-gray-100"
              style={{ animationDelay: review.delay }}
            >
              {/* Large Quote Icon Background */}
              <Quote className="absolute top-6 right-6 text-gray-100 w-16 h-16 transform rotate-180 group-hover:text-emerald-50 transition-colors duration-300" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={18} className="fill-emerald-400 text-emerald-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 mb-8 leading-relaxed relative z-10">
                "{review.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-emerald-400 to-cyan-400">
                    <img 
                        src={review.image} 
                        alt={review.name} 
                        className="w-full h-full rounded-full object-cover border-2 border-white"
                    />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-emerald-500 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-10 border-t border-gray-200 flex flex-wrap justify-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           {/* Placeholder Logos */}
           <div className="text-xl font-bold text-gray-400 flex items-center gap-2"><span className="w-6 h-6 bg-gray-400 rounded-full"></span> TechCrunch</div>
           <div className="text-xl font-bold text-gray-400 flex items-center gap-2"><span className="w-6 h-6 bg-gray-400 rounded-md"></span> Forbes</div>
           <div className="text-xl font-bold text-gray-400 flex items-center gap-2"><span className="w-6 h-6 bg-gray-400 rounded-sm rotate-45"></span> Bloomberg</div>
           <div className="text-xl font-bold text-gray-400 flex items-center gap-2"><span className="w-6 h-6 bg-gray-400 rounded-full border-2 border-gray-300"></span> Reuters</div>
        </div>

      </div>
    </section>
  );
};
