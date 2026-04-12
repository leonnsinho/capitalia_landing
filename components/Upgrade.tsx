
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { User } from '../types';
import { getTranslation } from '../utils/i18n';
import { 
  Check, 
  X, 
  Crown, 
  Gem, 
  Zap,
  Construction,
  RotateCcw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Rocket,
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  ShoppingBag,
  CreditCard,
  Download
} from 'lucide-react';
import { purchasePlan, restorePurchases, isNativeApp } from '../services/purchaseService';
import { supabase } from '../services/storage';

interface UpgradeProps {
  user: User;
  onPlanUpdated?: (newPlan: 'free' | 'pro' | 'pro_annual') => void;
  onNavigate?: (view: string) => void;
}

const Upgrade: React.FC<UpgradeProps> = ({ user, onPlanUpdated, onNavigate }) => {
  const translations = getTranslation(user.language || 'pt');
  const t = translations.upgrade;

  const [loadingPlan, setLoadingPlan]       = useState<string | null>(null);
  const [errorMsg, setErrorMsg]             = useState<string | null>(null);
  const [successMsg, setSuccessMsg]         = useState<string | null>(null);
  const [restoring, setRestoring]           = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationPlan, setCelebrationPlan] = useState<'pro' | 'pro_annual'>('pro');

  const proFeatures = [
    { icon: Brain,      label: 'IA Financeira Pessoal' },
    { icon: TrendingUp, label: 'Análise Inteligente de Gastos' },
    { icon: Target,     label: 'Planejamento & Metas' },
    { icon: ShoppingBag,label: 'Consultor de Compras' },
    { icon: CreditCard, label: 'Múltiplos Cartões' },
    { icon: Download,   label: 'Exportação de Dados' },
  ];

  // Detecta retorno do Stripe Checkout (success ou cancelled)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stripeReturn = params.get('stripe_return');
    const plan = params.get('plan') as 'pro' | 'pro_annual' | null;

    if (!stripeReturn) return;

    // Limpa os params da URL imediatamente
    window.history.replaceState({}, '', window.location.pathname);

    if (stripeReturn === 'success' && plan) {
      // Mostra o cartaz imediatamente (otimista) usando o plano da URL
      setCelebrationPlan(plan === 'pro_annual' ? 'pro_annual' : 'pro');
      setShowCelebration(true);
      onPlanUpdated?.(plan);

      // Confirma em background com o Supabase (sem bloquear a UI)
      supabase
        .from('profiles')
        .select('plan_type')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          const confirmedPlan = (data?.plan_type as 'free' | 'pro' | 'pro_annual') || plan;
          if (confirmedPlan !== plan) onPlanUpdated?.(confirmedPlan);
        })
        .catch(() => { /* fallback já aplicado acima */ });
    }

    if (stripeReturn === 'cancelled') {
      setErrorMsg('Pagamento cancelado. Você pode assinar a qualquer momento.');
    }
  // Executa apenas uma vez na montagem do componente
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlans = () => [
    {
      id: 'free',
      name: t.plans.free.name,
      price: t.price_free,
      period: '',
      features: t.plans.free.features.map((f, i) => ({ text: f, included: i < 3, isAi: i === 0 })),
      limit: t.plans.free.limit,
      containerClass: 'bg-gradient-to-br from-slate-50 to-slate-200 shadow-xl relative isolate',
      textClass: 'text-slate-700',
      buttonClass: 'bg-slate-300 hover:bg-slate-400 text-slate-800',
      planImage: '/icone_planos/free.png',
      iconBg: 'bg-slate-300/50',
      badge: null
    },
    {
      id: 'pro',
      name: t.plans.pro.name,
      price: user.country === 'AR' ? '$ 7.900' : 'R$ 39,90',
      period: t.period_month,
      features: t.plans.pro.features.map((f, i, arr) => ({ text: f, included: true, isAi: i === 0 || i === 1, isFire: i >= arr.length - 2 })),
      limit: t.plans.pro.limit,
      containerClass: 'bg-gradient-to-br from-[#1a1200] via-[#2d1f00] to-[#1a1200] text-white shadow-2xl relative overflow-hidden shadow-amber-900/30',
      textClass: 'text-amber-100',
      buttonClass: 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-amber-950 font-black shadow-lg shadow-amber-500/40',
      planImage: '/icone_planos/pro.png',
      pricePerDay: user.country === 'AR' ? '$ 263' : 'R$ 1,33',
      iconBg: 'bg-amber-900/30',
      popular: true
    },
    {
      id: 'pro_annual',
      name: t.plans.pro_annual.name,
      price: user.country === 'AR' ? '$ 47.400' : 'R$ 289,00',
      originalPrice: user.country === 'AR' ? '$ 94.800' : 'R$ 478,80',
      period: t.period_year,
      discount: '40% OFF',
      features: t.plans.pro_annual.features.map((f, i, arr) => ({ text: f, included: true, isAi: i === 0 || i === 1, isFire: i >= arr.length - 2 })),
      limit: t.plans.pro_annual.limit,
      containerClass: 'bg-gradient-to-br from-[#021c15] via-[#064e3b] to-[#022c22] text-white shadow-2xl relative overflow-hidden',
      textClass: 'text-emerald-50',
      buttonClass: 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:via-emerald-300 hover:to-emerald-400 text-emerald-950 shadow-lg shadow-emerald-900/40 bg-[length:200%_auto] animate-gradient-xy font-black',
      planImage: '/icone_planos/pro_annual.png',
      iconBg: 'bg-emerald-900/40',
      badge: '40% OFF'
    }
  ];

  const plansList = getPlans();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to Pro card on mount (mobile horizontal carousel)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Only scroll on mobile (overflow-x-auto active)
    if (window.innerWidth >= 768) return;
    const proIndex = plansList.findIndex(p => p.id === 'pro');
    if (proIndex < 0) return;
    // Each card is 85vw wide + 16px gap (gap-4)
    const cardWidth = window.innerWidth * 0.85 + 16;
    // Center the card: scroll so the card's left edge puts it centered
    const offset = proIndex * cardWidth - (window.innerWidth - window.innerWidth * 0.85) / 2;
    el.scrollLeft = Math.max(0, offset);
  }, []);

  const handleUpgradeClick = useCallback(async (planId: string) => {
    if (planId === 'free' || planId === user.planType) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoadingPlan(planId);

    try {
      const result = await purchasePlan(
        planId as 'pro' | 'pro_annual',
        user.id,
        user.email,
      );

      if (result.success && result.planType) {
        setCelebrationPlan(result.planType);
        setShowCelebration(true);
        onPlanUpdated?.(result.planType);
      } else if (!result.cancelled) {
        setErrorMsg(result.error || 'Erro ao processar a compra.');
      }
    } finally {
      setLoadingPlan(null);
    }
  }, [user.id, user.planType, onPlanUpdated]);

  const handleRestore = useCallback(async () => {
    setRestoring(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const result = await restorePurchases(user.id);
      if (result.success && result.planType) {
        setSuccessMsg('✅ Assinatura restaurada com sucesso!');
        onPlanUpdated?.(result.planType);
      } else {
        setErrorMsg(result.error || 'Nenhuma compra anterior encontrada.');
      }
    } finally {
      setRestoring(false);
    }
  }, [user.id, onPlanUpdated]);

  // ─── Celebration overlay ────────────────────────────────────────────────────
  if (showCelebration) {
    const isGold = celebrationPlan === 'pro';

    const goldConfetti = [
      { color: 'bg-yellow-400',  top: '8%',  left: '10%', delay: '0s',   size: 'w-2 h-2' },
      { color: 'bg-amber-300',   top: '12%', left: '80%', delay: '0.3s', size: 'w-3 h-3' },
      { color: 'bg-yellow-200',  top: '20%', left: '55%', delay: '0.6s', size: 'w-1.5 h-1.5' },
      { color: 'bg-amber-400',   top: '5%',  left: '40%', delay: '0.1s', size: 'w-2 h-2' },
      { color: 'bg-yellow-500',  top: '15%', left: '25%', delay: '0.8s', size: 'w-2.5 h-2.5' },
      { color: 'bg-amber-200',   top: '25%', left: '70%', delay: '0.4s', size: 'w-1.5 h-1.5' },
      { color: 'bg-yellow-300',  top: '7%',  left: '90%', delay: '0.9s', size: 'w-2 h-2' },
      { color: 'bg-amber-500',   top: '18%', left: '5%',  delay: '0.5s', size: 'w-3 h-3' },
    ];

    const emeraldConfetti = [
      { color: 'bg-emerald-400', top: '6%',  left: '8%',  delay: '0s',   size: 'w-2 h-2',    diamond: true },
      { color: 'bg-teal-300',    top: '11%', left: '82%', delay: '0.3s', size: 'w-3 h-3',    diamond: false },
      { color: 'bg-emerald-200', top: '22%', left: '58%', delay: '0.6s', size: 'w-1.5 h-1.5', diamond: true },
      { color: 'bg-cyan-300',    top: '5%',  left: '42%', delay: '0.1s', size: 'w-2 h-2',    diamond: false },
      { color: 'bg-teal-400',    top: '16%', left: '22%', delay: '0.8s', size: 'w-2.5 h-2.5', diamond: true },
      { color: 'bg-emerald-300', top: '28%', left: '72%', delay: '0.4s', size: 'w-1.5 h-1.5', diamond: false },
      { color: 'bg-green-300',   top: '8%',  left: '92%', delay: '0.9s', size: 'w-2 h-2',    diamond: true },
      { color: 'bg-teal-200',    top: '19%', left: '3%',  delay: '0.5s', size: 'w-3 h-3',    diamond: false },
      { color: 'bg-emerald-500', top: '32%', left: '15%', delay: '0.7s', size: 'w-1.5 h-1.5', diamond: true },
      { color: 'bg-cyan-400',    top: '3%',  left: '65%', delay: '0.2s', size: 'w-2 h-2',    diamond: false },
    ];

    return (
      <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-y-auto animate-in fade-in duration-700 ${isGold ? 'bg-gradient-to-b from-[#0d0800] via-[#1f1200] to-[#0d0800]' : 'bg-gradient-to-b from-[#020f07] via-[#021a0e] to-[#020f07]'}`}>

        {/* EMERALD: Noise texture overlay */}
        {!isGold && (
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '200px'}} />
        )}

        {/* Top light beam */}
        {isGold
          ? <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-amber-400/10 to-transparent pointer-events-none" />
          : <>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 bg-gradient-to-b from-emerald-400/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-t from-emerald-700/20 to-transparent pointer-events-none" />
            </>
        }

        {/* EMERALD: Side ambient orbs */}
        {!isGold && (
          <>
            <div className="absolute -left-32 top-1/3 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-32 top-2/3 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        {/* Confetti */}
        {isGold
          ? goldConfetti.map((c, i) => (
              <span key={i} className={`absolute rounded-full ${c.color} ${c.size} opacity-70 animate-bounce`} style={{ top: c.top, left: c.left, animationDelay: c.delay, animationDuration: '2s' }} />
            ))
          : emeraldConfetti.map((c, i) => (
              <span key={i} className={`absolute ${c.diamond ? '' : 'rounded-full'} ${c.color} ${c.size} opacity-75 animate-bounce`} style={{ top: c.top, left: c.left, animationDelay: c.delay, animationDuration: '2s', transform: c.diamond ? 'rotate(45deg)' : undefined }} />
            ))
        }

        {/* Central glow halo */}
        <div className={`absolute rounded-full blur-3xl ${isGold ? 'w-80 h-80 bg-amber-500/15' : 'w-96 h-96 bg-emerald-400/20'}`} />
        {!isGold && <div className="absolute w-52 h-52 rounded-full blur-2xl bg-emerald-300/25" />}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto px-5 w-full py-8 min-h-screen justify-center">

          {/* Icon */}
          <div className="relative mb-4 md:mb-6 flex items-center justify-center">
            {!isGold && (
              <>
                <div className="absolute rounded-full border-2 border-emerald-400/20 animate-ping" style={{ inset: '-28px', animationDuration: '2.5s' }} />
                <div className="absolute rounded-full border border-emerald-400/35 animate-pulse" style={{ inset: '-12px' }} />
                <div className="absolute rounded-full bg-emerald-400/10 blur-xl" style={{ inset: '-8px' }} />
              </>
            )}
            <img
              src={celebrationPlan === 'pro_annual' ? '/icone_planos/pro_annual.png' : '/icone_planos/pro.png'}
              alt={celebrationPlan === 'pro_annual' ? 'Pro Anual' : 'Pro'}
              className={`object-contain relative ${isGold ? 'drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]' : 'drop-shadow-[0_0_45px_rgba(16,185,129,0.85)]'} ${celebrationPlan === 'pro_annual' ? 'w-24 h-24 md:w-36 md:h-36' : 'w-20 h-20 md:w-28 md:h-28'}`}
            />
          </div>

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 md:mb-4 border ${isGold ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-emerald-400/15 text-emerald-300 border-emerald-400/50 shadow-[0_0_16px_rgba(52,211,153,0.4)]'}`}>
            <Zap className="w-3 h-3" /> Assinatura Ativada
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black text-white mb-1.5 md:mb-2 tracking-tight">
            Parabéns! 🎉
          </h1>
          <p className={`font-black text-xl mb-3 text-transparent bg-clip-text ${isGold ? 'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400' : 'bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400'}`}>
            Bem-vindo ao {celebrationPlan === 'pro_annual' ? 'Pro Anual' : 'Pro'}
          </p>
          <p className="text-slate-400 font-medium text-sm mb-4 md:mb-7 leading-relaxed">
            Você desbloqueou todos os recursos Premium da Capitalia. Suas finanças nunca mais serão as mesmas.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-2 md:gap-2.5 w-full mb-5 md:mb-8">
            {proFeatures.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 md:gap-2.5 rounded-xl p-2.5 md:p-3 text-left border ${isGold ? 'bg-amber-400/5 border-amber-400/20' : 'bg-emerald-400/10 border-emerald-400/25 shadow-[0_0_10px_rgba(52,211,153,0.08)]'}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isGold ? 'bg-amber-400/20' : 'bg-emerald-400/20'}`}>
                  <f.icon className={`w-3.5 h-3.5 ${isGold ? 'text-amber-300' : 'text-emerald-300'}`} />
                </div>
                <span className="text-xs font-bold text-white leading-tight">{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => { setShowCelebration(false); onNavigate?.('overview'); }}
            className={`w-full py-4 font-black text-sm uppercase tracking-widest rounded-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${isGold ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-amber-950 shadow-[0_8px_30px_rgba(251,191,36,0.45)]' : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:via-teal-300 hover:to-emerald-400 text-emerald-950 font-black shadow-[0_8px_35px_rgba(52,211,153,0.55)]'}`}
          >
            <Rocket className="w-4 h-4" /> Começar a explorar
          </button>

          {/* Skip */}
          <button
            onClick={() => setShowCelebration(false)}
            className="mt-4 text-xs text-slate-500 hover:text-slate-400 font-semibold transition-colors"
          >
            Ver planos
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes borderRotate {
        100% { transform: translate(-50%, -50%) rotate(1turn); }
      }
      .animate-silver-border, .animate-gold-border, .animate-emerald-border {
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
        top: 50%;
        left: 50%;
        width: 300%;
        height: 300%;
        background: conic-gradient(
          from 0deg, 
          transparent 60%, 
          #94a3b8 75%,
          #f8fafc 85%,
          #94a3b8 95%,
          transparent 100%
        );
        transform: translate(-50%, -50%) rotate(0deg);
        animation: borderRotate 4s linear infinite;
      }
      .animate-gold-border::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300%;
        height: 300%;
        background: conic-gradient(
          from 0deg, 
          transparent 55%, 
          #92400e 68%,
          #d97706 75%,
          #fef08a 82%,
          #fbbf24 88%,
          #d97706 94%,
          transparent 100%
        );
        transform: translate(-50%, -50%) rotate(0deg);
        animation: borderRotate 3s linear infinite;
      }
      .animate-emerald-border::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300%;
        height: 300%;
        background: conic-gradient(
          from 0deg, 
          transparent 60%, 
          #059669 75%,
          #6ee7b7 85%,
          #059669 95%,
          transparent 100%
        );
        transform: translate(-50%, -50%) rotate(0deg);
        animation: borderRotate 4s linear infinite;
      }
    `}} />
    <div className="pb-24 md:pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8 md:mb-14 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" /> Planos
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4 leading-tight">
            {t.subtitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{t.highlight}</span>
        </h1>
      </div>

      <div ref={scrollRef} className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 -mx-6 md:mx-auto px-6 md:px-0 snap-x snap-mandatory scroll-smooth no-scrollbar max-w-6xl">
        {plansList.map((plan) => { 
            const isCurrent = user.planType === plan.id; 
            return (
                <div key={plan.id} className={`flex-shrink-0 w-[85vw] md:w-auto snap-center rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between transition-transform duration-300 md:hover:-translate-y-2 relative ${plan.containerClass}`}>
                    {plan.id === 'free' && (
                        <div className="animate-silver-border drop-shadow-[0_0_8px_rgba(148,163,184,0.5)]" />
                    )}
                    {plan.id === 'pro' && (
                        <>
                          <div className="animate-gold-border drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
                          {/* Gold noise texture overlay */}
                          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '150px'}} />
                          {/* Gold radial glow top */}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
                        </>
                    )}
                    {plan.id === 'pro_annual' && (
                        <div className="animate-emerald-border drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
                    )}
                    {plan.popular && (<div className="absolute -right-12 top-6 w-[170px] transform rotate-45 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 text-[10px] font-black uppercase tracking-widest py-1 text-center shadow-md z-10">{t.popular_badge}</div>)}
                    <div className="mb-6 relative z-10">
                        <img src={plan.planImage} className="w-16 h-16 md:w-20 md:h-20 object-contain mb-6 drop-shadow-lg" alt={plan.name} />
                        <h3 className={`text-lg md:text-xl font-black uppercase tracking-widest mb-2 ${plan.textClass}`}>{plan.name}</h3>
                        {plan.originalPrice && (
                            <span className="text-sm font-bold line-through opacity-50 text-red-400 block mb-0.5">{plan.originalPrice}</span>
                        )}
                        {plan.pricePerDay ? (
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-baseline gap-1">
                              <span className={`text-5xl font-black tracking-tight ${plan.textClass}`}>{plan.pricePerDay}</span>
                              <span className={`text-sm font-bold opacity-70 ${plan.textClass}`}>/dia</span>
                            </div>
                            <span className={`text-sm font-bold opacity-60 ${plan.textClass}`}>{plan.price}{plan.period}</span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className={`text-3xl md:text-3xl font-black tracking-tight ${plan.textClass}`}>{plan.price}</span>
                            <span className={`text-xs font-bold opacity-70 ${plan.textClass}`}>{plan.period}</span>
                            {plan.discount && (
                                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 text-sm font-black uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/30 animate-pulse">{plan.discount}</span>
                            )}
                          </div>
                        )}
                        <p className={`text-[10px] md:text-xs font-bold mt-3 opacity-80 uppercase tracking-wider ${plan.textClass}`}>{plan.limit}</p>
                    </div>
                    <div className="space-y-4 mb-8 relative z-10 flex-1">
                        {plan.features.map((feature, idx) => (
                            <div key={idx} className={`flex items-start gap-3 text-xs font-bold ${feature.included ? plan.textClass : 'text-slate-400 opacity-70'}`}>
                                <div className="mt-0.5 shrink-0">{feature.included ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}</div>
                                <span className={`flex items-center flex-wrap gap-2 leading-tight ${!feature.included ? 'line-through' : ''}`}>
                                    {feature.text}
                                    {feature.isAi && (<div className="w-auto px-1.5 py-0.5 rounded-md bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-500 animate-gradient-xy flex items-center justify-center border border-white/30 shadow-sm shrink-0"><span className="text-[7px] font-black text-white">IA</span></div>)}
                                    {feature.isFire && feature.included && (<img src="https://media.tenor.com/8McIGu0Tf_QAAAAj/fire-joypixels.gif" alt="🔥" className="w-5 h-5 shrink-0" />)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => !isCurrent && plan.id !== 'free' && handleUpgradeClick(plan.id)}
                        disabled={isCurrent || loadingPlan !== null}
                        className={`w-full py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all relative z-10 flex items-center justify-center gap-2 ${plan.buttonClass} ${(isCurrent || loadingPlan !== null) ? 'opacity-50 cursor-default' : 'hover:scale-[1.02] active:scale-95'}`}
                    >
                        {loadingPlan === plan.id ? (
                            <><Loader2 className="w-3 h-3 animate-spin" /> Processando...</>
                        ) : isCurrent ? t.btn_current
                          : plan.id === 'free' ? t.btn_downgrade
                          : <><Zap className="w-3 h-3" /> {t.btn_subscribe}</>}
                    </button>
                </div>
            ); 
        })}
      </div>

      {/* Feedback de erro/sucesso */}
      {errorMsg && (
        <div className="mt-6 mx-auto max-w-md flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-400 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="mt-6 mx-auto max-w-md flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Botão restaurar compras — aparece apenas no app nativo */}
      {isNativeApp() && (
        <div className="mt-8 text-center">
          <button
            onClick={handleRestore}
            disabled={restoring}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors disabled:opacity-50"
          >
            {restoring
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Restaurando...</>
              : <><RotateCcw className="w-3.5 h-3.5" /> Restaurar compras anteriores</>
            }
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Upgrade;
