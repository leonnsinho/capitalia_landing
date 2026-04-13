import React from 'react';
import { Check, X, Zap } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 'R$ 0',
    period: '',
    limit: 'Para sempre gratuito',
    planImage: '/icone_planos/free.png',
    containerClass: 'bg-gradient-to-br from-slate-50 to-slate-200 shadow-xl',
    textClass: 'text-slate-700',
    buttonClass: 'bg-slate-300 hover:bg-slate-400 text-slate-800',
    borderClass: 'animate-silver-border',
    features: [
      { text: 'Assistente IA (limitado)', included: true,  isAi: true },
      { text: '50.000 tokens/mês',         included: true,  isAi: true },
      { text: 'Controle de gastos básico', included: true  },
      { text: 'Dashboard simplificado',    included: true  },
      { text: 'Múltiplos cartões',         included: false },
      { text: 'Análise inteligente IA',    included: false, isAi: true },
      { text: 'Planejamento & Metas',      included: false },
      { text: 'Exportação de dados',       included: false },
      { text: 'Suporte prioritário',       included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 1,33',
    priceLabel: '/dia',
    priceSubtitle: 'R$ 39,90/mês',
    period: '/mês',
    limit: 'Acesso completo mensal',
    planImage: '/icone_planos/pro.png',
    popular: true,
    containerClass: 'bg-gradient-to-br from-[#1a1200] via-[#2d1f00] to-[#1a1200] text-white shadow-2xl shadow-amber-900/30',
    textClass: 'text-amber-100',
    buttonClass: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-amber-950 font-black shadow-lg shadow-amber-500/40',
    borderClass: 'animate-gold-border',
    features: [
      { text: 'IA Financeira Pessoal',        included: true, isAi: true  },
      { text: '1.200.000 tokens/mês',          included: true, isAi: true  },
      { text: 'Análise inteligente de gastos', included: true, isAi: true  },
      { text: 'Planejamento & Metas',          included: true              },
      { text: 'Consultor de compras',          included: true              },
      { text: 'Múltiplos cartões',             included: true              },
      { text: 'Exportação de dados',           included: true              },
      { text: 'Suporte prioritário',           included: true              },
      { text: 'Acesso antecipado a novidades', included: true              },
    ],
  },
  {
    id: 'pro_annual',
    name: 'Pro Anual',
    price: 'R$ 289,00',
    originalPrice: 'R$ 478,80',
    period: '/ano',
    discount: '40% OFF',
    limit: 'Melhor custo-benefício',
    planImage: '/icone_planos/pro_annual.png',
    containerClass: 'bg-gradient-to-br from-[#021c15] via-[#064e3b] to-[#022c22] text-white shadow-2xl',
    textClass: 'text-emerald-50',
    buttonClass: 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:via-emerald-300 hover:to-emerald-400 text-emerald-950 font-black shadow-lg shadow-emerald-900/40',
    borderClass: 'animate-emerald-border',
    features: [
      { text: 'IA Financeira Pessoal',        included: true, isAi: true  },
      { text: '1.200.000 tokens/mês',          included: true, isAi: true  },
      { text: 'Análise inteligente de gastos', included: true, isAi: true  },
      { text: 'Planejamento & Metas',          included: true              },
      { text: 'Consultor de compras',          included: true              },
      { text: 'Múltiplos cartões',             included: true              },
      { text: 'Exportação de dados',           included: true              },
      { text: 'Suporte prioritário',           included: true              },
      { text: 'Acesso antecipado a novidades', included: true              },
    ],
  },
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="relative py-24 bg-white overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes borderRotate {
          100% { transform: translate(-50%, -50%) rotate(1turn); }
        }
        .animate-silver-border,
        .animate-gold-border,
        .animate-emerald-border {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 3px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          overflow: hidden;
        }
        .animate-silver-border::before {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          width: 300%; height: 300%;
          background: conic-gradient(from 0deg, transparent 60%, #94a3b8 75%, #f8fafc 85%, #94a3b8 95%, transparent 100%);
          transform: translate(-50%, -50%) rotate(0deg);
          animation: borderRotate 4s linear infinite;
        }
        .animate-gold-border::before {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          width: 300%; height: 300%;
          background: conic-gradient(from 0deg, transparent 55%, #92400e 68%, #d97706 75%, #fef08a 82%, #fbbf24 88%, #d97706 94%, transparent 100%);
          transform: translate(-50%, -50%) rotate(0deg);
          animation: borderRotate 3s linear infinite;
        }
        .animate-emerald-border::before {
          content: "";
          position: absolute;
          top: 50%; left: 50%;
          width: 300%; height: 300%;
          background: conic-gradient(from 0deg, transparent 60%, #059669 75%, #6ee7b7 85%, #059669 95%, transparent 100%);
          transform: translate(-50%, -50%) rotate(0deg);
          animation: borderRotate 4s linear infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" /> Planos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Plano</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Comece grátis e evolua conforme sua necessidade.<br /><span className="text-emerald-500 font-bold">Cancele quando quiser.</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-[2rem] p-8 flex flex-col transition-transform duration-300 hover:-translate-y-2 ${plan.popular ? 'md:scale-[1.07] md:z-10' : ''} ${plan.containerClass}`}
            >
              {/* Animated border */}
              <div className={plan.borderClass} />

              {/* Popular badge */}
              {plan.popular && (
                <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 mb-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md relative z-10">
                  <span>⭐</span> Mais popular
                </div>
              )}

              {/* Gold ambient glow */}
              {plan.id === 'pro' && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
              )}

              {/* Plan image */}
              <img
                src={plan.planImage}
                alt={plan.name}
                className="w-16 h-16 object-contain mb-6 drop-shadow-lg relative z-10"
              />

              {/* Name */}
              <h3 className={`text-lg font-black uppercase tracking-widest mb-2 relative z-10 ${plan.textClass}`}>
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-1 relative z-10">
                {plan.originalPrice && (
                  <span className="text-sm font-bold line-through opacity-50 text-red-400 block mb-0.5">
                    {plan.originalPrice}
                  </span>
                )}
                {plan.priceLabel ? (
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-black tracking-tight ${plan.textClass}`}>{plan.price}</span>
                      <span className={`text-sm font-bold opacity-70 ${plan.textClass}`}>{plan.priceLabel}</span>
                    </div>
                    <span className={`text-sm font-bold opacity-60 ${plan.textClass}`}>{plan.priceSubtitle}</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className={`text-3xl font-black tracking-tight ${plan.textClass}`}>{plan.price}</span>
                    <span className={`text-xs font-bold opacity-70 ${plan.textClass}`}>{plan.period}</span>
                    {plan.discount && (
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 text-sm font-black uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/30 animate-pulse">
                        {plan.discount}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className={`text-[10px] font-bold mt-2 mb-6 opacity-80 uppercase tracking-wider relative z-10 ${plan.textClass}`}>
                {plan.limit}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8 flex-1 relative z-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className={`flex items-start gap-3 text-xs font-bold ${feature.included ? plan.textClass : 'text-slate-400 opacity-60'}`}>
                    <div className="mt-0.5 shrink-0">
                      {feature.included
                        ? <Check className="w-3.5 h-3.5" />
                        : <X className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`flex items-center flex-wrap gap-2 leading-tight ${!feature.included ? 'line-through' : ''}`}>
                      {feature.text}
                      {feature.isAi && (
                        <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 text-[7px] font-black text-white border border-white/30 shadow-sm shrink-0">
                          IA
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="https://capitaliahealth.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all relative z-10 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 ${plan.buttonClass}`}
              >
                {plan.id === 'free' ? 'Começar grátis' : <><Zap className="w-3 h-3" /> Assinar agora</>}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
