import React, { useEffect, useRef, useState } from 'react';

const Avatar: React.FC<{ initials: string; bg: string; size?: string }> = ({ initials, bg, size = 'w-9 h-9 text-sm' }) => (
  <div
    className={`${size} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
    style={{ backgroundColor: bg }}
  >
    {initials}
  </div>
);

const ThumbUp = () => (
  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a18.68 18.68 0 0 1 1.71-.175c1.034-.034 2.026.152 2.666.604.672.461.63 1.08.345 1.566-.05.088-.058.197-.002.283.42.643.406 1.368.188 1.978-.52 1.489-1.441 2.361-2.587 2.626-1.172.27-2.498-.012-3.878-.593a28.2 28.2 0 0 0-.994-.399c-.478-.173-.995-.37-1.162-.557a2 2 0 0 1-.466-.957l-.577-3.431a2 2 0 0 1 .466-1.643L6.956 1.745z"/>
    <path d="M2 6h1.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
  </svg>
);

const Heart = () => (
  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="#f33e58">
    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
  </svg>
);

const WowFace = () => (
  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="#f7b500">
    <circle cx="8" cy="8" r="8"/>
    <path fill="#333" d="M5.5 6a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm6 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM8 9.5c-1.105 0-2 .895-2 2h4c0-1.105-.895-2-2-2z"/>
  </svg>
);

interface Reply {
  id: number;
  name: string;
  bg: string;
  initials: string;
  time: string;
  text: string;
  likes: number;
}

interface Comment {
  id: number;
  name: string;
  bg: string;
  initials: string;
  time: string;
  text: string;
  reactions: { thumb: number; heart: number; wow?: number };
  replies?: Reply[];
}

const COMMENTS: Comment[] = [
  {
    id: 1,
    name: 'Ana Carolina Ferreira',
    bg: '#e91e8c',
    initials: 'AC',
    time: '4 d',
    text: 'Gente, esse app mudou minha vida financeira! Já usei vários e nunca consegui manter o hábito, mas o Capitalia é tão intuitivo que uso todos os dias sem esforço 😍 Em menos de 1 mês já sei exatamente pra onde vai cada real.',
    reactions: { thumb: 84, heart: 41 },
    replies: [
      {
        id: 11,
        name: 'Juliana Martins',
        bg: '#9c27b0',
        initials: 'JM',
        time: '4 d',
        text: 'Exatamente isso! A parte de categorias automáticas é incrível, pouquíssimos apps fazem isso tão bem.',
        likes: 19,
      },
      {
        id: 12,
        name: 'Rodrigo Alves',
        bg: '#1565c0',
        initials: 'RA',
        time: '3 d',
        text: 'Ana, muito verdade! Eu indiquei pra toda minha família já 😂',
        likes: 11,
      },
    ],
  },
  {
    id: 2,
    name: 'Bruno Henrique Costa',
    bg: '#1565c0',
    initials: 'BH',
    time: '5 d',
    text: 'Finalmente um app de finanças que não parece planilha de contador 😂 Design impecável, funciona super rápido e o suporte respondeu minhas dúvidas em menos de 2 horas. 10/10',
    reactions: { thumb: 62, heart: 28, wow: 7 },
    replies: [
      {
        id: 21,
        name: 'Fernanda Lima',
        bg: '#00897b',
        initials: 'FL',
        time: '5 d',
        text: 'Hahaha essa parte da planilha de contador me pegou 😂😂 É exatamente como eu me sentia com os outros apps!',
        likes: 34,
      },
    ],
  },
  {
    id: 3,
    name: 'Mariana Souza',
    bg: '#00897b',
    initials: 'MS',
    time: '1 sem',
    text: 'Uso o Capitalia há 2 meses e consegui juntar R$1.200 que eu nem sabia que estava desperdiçando todo mês. O relatório mensal abre o olho demais! Recomendo muito pra quem quer tomar o controle das finanças ✅',
    reactions: { thumb: 113, heart: 67 },
    replies: [],
  },
  {
    id: 4,
    name: 'Carlos Eduardo Ramos',
    bg: '#e65100',
    initials: 'CE',
    time: '6 d',
    text: 'O que mais me impressionou foi como o app é completo! Consigo lançar tudo em segundos e os gráficos deixam bem claro pra onde está indo o meu dinheiro. Nunca tive tanto controle financeiro assim.',  
    reactions: { thumb: 47, heart: 22 },
    replies: [
      {
        id: 41,
        name: 'Priscila Nunes',
        bg: '#ad1457',
        initials: 'PN',
        time: '6 d',
        text: 'Isso mesmo! A integração bancária é o diferencial. Outros apps cobram caro por isso.',
        likes: 16,
      },
    ],
  },
  {
    id: 5,
    name: 'Tatiane Oliveira',
    bg: '#6a1b9a',
    initials: 'TO',
    time: '1 sem',
    text: 'Estava procrastinando a vida financeira faz anos e o Capitalia foi o que me fez começar de verdade. A interface é linda, os gráficos são claros e dá pra entender tudo sem tutorial nenhum. Atualização recente então ficou ainda melhor 🙌',
    reactions: { thumb: 95, heart: 53, wow: 12 },
    replies: [],
  },
];

const ReactionBubble: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { thumb, heart, wow } = comment.reactions;
  const total = thumb + heart + (wow || 0);
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="flex -space-x-0.5">
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 ring-1 ring-white">
          <ThumbUp />
        </span>
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-400 ring-1 ring-white">
          <Heart />
        </span>
        {wow && (
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-yellow-400 ring-1 ring-white">
            <WowFace />
          </span>
        )}
      </div>
      <span className="text-xs text-gray-400">{total}</span>
    </div>
  );
};

const CommentCard: React.FC<{ comment: Comment; isLast: boolean }> = ({ comment, isLast }) => (
  <div className="pt-3 md:pt-4">
    <div className="flex gap-2 items-start">
      <Avatar initials={comment.initials} bg={comment.bg} />
      <div className="flex-1 min-w-0">
        <div className="inline-block max-w-full rounded-2xl rounded-tl-sm px-3 py-2" style={{ backgroundColor: '#F0F2F5' }}>
          <p className="font-bold text-[#050505] text-sm leading-tight">{comment.name}</p>
          <p className="text-[#050505] text-sm mt-0.5 leading-relaxed">{comment.text}</p>
        </div>
        <ReactionBubble comment={comment} />
        <div className="flex items-center gap-3 mt-1 pl-1">
          <button className="text-xs font-bold text-gray-400 hover:text-blue-500 transition-colors">Curtir</button>
          <button className="text-xs font-bold text-gray-400 hover:text-blue-500 transition-colors">Responder</button>
          <span className="text-xs text-gray-400">{comment.time}</span>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 space-y-2 pl-2 border-l-2 border-gray-100 ml-1">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-2 items-start">
                <Avatar initials={reply.initials} bg={reply.bg} size="w-7 h-7 text-xs" />
                <div className="flex-1 min-w-0">
                  <div className="inline-block max-w-full rounded-2xl rounded-tl-sm px-3 py-2" style={{ backgroundColor: '#F0F2F5' }}>
                    <p className="font-bold text-[#050505] text-xs leading-tight">{reply.name}</p>
                    <p className="text-[#050505] text-xs mt-0.5 leading-relaxed">{reply.text}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 pl-1">
                    <div className="flex items-center gap-0.5">
                      <span className="flex items-center justify-center w-[14px] h-[14px] rounded-full bg-blue-500 ring-1 ring-white">
                        <ThumbUp />
                      </span>
                      <span className="text-xs text-gray-400 ml-0.5">{reply.likes}</span>
                    </div>
                    <button className="text-xs font-bold text-gray-400 hover:text-blue-500 transition-colors">Curtir</button>
                    <button className="text-xs font-bold text-gray-400 hover:text-blue-500 transition-colors">Responder</button>
                    <span className="text-xs text-gray-400">{reply.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    {!isLast && <div className="mt-3 md:mt-4 border-t border-gray-100" />}
  </div>
);

const GROUPS = [COMMENTS.slice(0, 2), COMMENTS.slice(2)];

export const FacebookComments: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      setActiveSlide(idx);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' });
  };

  const anim = (keyframe: string, duration: string, delay: string) =>
    visible ? { animation: `${keyframe} ${duration} ${ease} ${delay} both` } : { opacity: 0 };

  return (
    <section ref={sectionRef} className="relative py-10 md:py-24 overflow-hidden" style={{ backgroundColor: '#F0F2F5' }}>
      {/* Header */}
      <div className="max-w-2xl mx-auto px-5 mb-6 md:mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3" style={anim('heroFadeUp', '0.6s', '0s')}>
          <span className="h-px w-8 bg-emerald-500"></span>
          <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Comunidade</span>
          <span className="h-px w-8 bg-emerald-500"></span>
        </div>
        <h2
          className="text-2xl md:text-4xl font-bold text-gray-900 uppercase leading-tight"
          style={anim('heroBlurUp', '0.85s', '0.1s')}
        >
          O QUE DIZEM SOBRE O{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">CAPITALIA</span>
        </h2>
      </div>

      {/* Mobile: carousel */}
      <div className="md:hidden" style={anim('heroPop', '0.65s', '0.3s')}>
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="flex-none w-[calc(100%-2rem)] snap-center bg-white rounded-2xl shadow-sm px-4 pb-4"
            >
              {group.map((comment, idx) => (
                <CommentCard key={comment.id} comment={comment} isLast={idx === group.length - 1} />
              ))}
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {GROUPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-5 h-2 bg-emerald-500' : 'w-2 h-2 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: two comment columns + image column */}
      <div className="hidden md:flex max-w-6xl mx-auto px-4 gap-4 items-center">
        {/* Column 1 */}
        <div
          className="flex-1 bg-white rounded-2xl shadow-sm px-4 pb-5 self-start"
          style={anim('heroPop', '0.65s', '0.25s')}
        >
          {GROUPS[0].map((comment, idx) => (
            <CommentCard key={comment.id} comment={comment} isLast={idx === GROUPS[0].length - 1} />
          ))}
        </div>

        {/* Column 2 — image */}
        <div
          className="flex-shrink-0 w-56 flex items-center justify-center"
          style={anim('heroFadeUp', '0.9s', '0.35s')}
        >
          <img
            src="/robo-celular.png"
            alt="Robô com celular"
            className="w-full object-contain drop-shadow-xl"
          />
        </div>

        {/* Column 3 */}
        <div
          className="flex-1 bg-white rounded-2xl shadow-sm px-4 pb-5 self-start"
          style={anim('heroPop', '0.65s', '0.4s')}
        >
          {GROUPS[1].map((comment, idx) => (
            <CommentCard key={comment.id} comment={comment} isLast={idx === GROUPS[1].length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};
