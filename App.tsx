
import React, { useState, useEffect } from 'react';
import { BookState } from './types';
import { BOOK_CONTENT } from './constants';
import BookPage from './components/BookPage';

type SpecialSection = 'prefacio' | 'expediente' | null;

const DICE_CHOICES = 4;

const buildRandomMenu = () => {
  const indexes = BOOK_CONTENT.map((_, index) => index);

  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes.slice(0, Math.min(DICE_CHOICES, indexes.length));
};

const App: React.FC = () => {
  const [state, setState] = useState<BookState>(BookState.COVER);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [specialSection, setSpecialSection] = useState<SpecialSection>(null);
  const [menuPages, setMenuPages] = useState<number[]>(() => buildRandomMenu());

  useEffect(() => {
    document.title = 'FILOSOFIA DAS FARPAS';
  }, []);

  const openSectionMenu = () => {
    setSpecialSection(null);
    setMenuPages(buildRandomMenu());
    setState(BookState.TOC);
  };

  const openPage = (pageIndex: number) => {
    setSpecialSection(null);
    setCurrentPageIndex(pageIndex);
    setState(BookState.READING);
  };

  const openSpecialSection = (section: Exclude<SpecialSection, null>) => {
    setSpecialSection(section);
    setState(BookState.READING);
  };

  const renderSpecialSection = () => {
    const isPrefacio = specialSection === 'prefacio';
    const title = isPrefacio ? 'Prefácio' : 'Expediente';
    const eyebrow = isPrefacio ? 'Abertura do livro' : 'Fecho editorial';
    const prefacioParagraphs = [
      'Kant chama de “sintéticas”, na Crítica da Razão Pura, as proposições em que a relação entre sujeito e predicado não é de simples identidade, mas de adição. Chama ainda de “sintéticas a posteriori” aquelas que dependem da experiência para serem conhecidas. A filosofia aqui reunida nasce dessa vizinhança conceitual, mas desloca sua imagem para outra figura: a farpa. A farpa é um fragmento mínimo da matéria, um pedaço arrancado do corpo das coisas, pequeno, agudo, penetrante. Também ela é, a seu modo, sintética: reduzida, concentrada, sem excesso. Filosofia das Farpas é, nesse sentido, uma filosofia sintética, feita de pequenas frases pontiagudas, capazes de atravessar a percepção e feri-la com seus significados.',
      'O que aqui se apresenta são 99 proposições nascidas da experiência, formuladas a partir de vivências mais ou menos profundas, quase sempre no contexto de longos trajetos e deslocamentos. Durante os anos em que meu trabalho exigiu viagens constantes, entre 2002 e 2019, fui anotando frases soltas, surgidas de reflexões, impressões e lampejos de pensamento. Eram proposições a posteriori, definidas no instante em que emergiam: numa poltrona de avião, numa sala de espera de aeroporto, numa praça, numa esquina, em algum intervalo qualquer em que o mundo, por alguma razão, se deixava condensar em poucas palavras.',
      'O que importava era a frase que surgia em mim como um gêiser, explodindo na consciência e expelindo seus significados por todo o corpo, como um abalo breve de lucidez. Depois desse tipo de irrupção, eu sacava rapidamente a moleskine e anotava ali, como quem recolhe o fragmento de uma descoberta, aquele pequeno caco de profundidade que havia se imposto ao pensamento. E talvez já estivesse aí a lógica da farpa: não a do discurso longo, contínuo, protegido, mas a do fragmento que entra de repente, se aloja, incomoda, permanece.',
      'Mais tarde, quando as viagens cessaram e a moleskine foi aposentada, essas frases ficaram guardadas, em silêncio, como restos de travessias. Agora, em 2026, volto a me encontrar com elas. E, ao revê-las, percebo uma filosofia em estado reduzido, comprimida em núcleos breves de linguagem, como se cada frase fosse uma farpa metafísica arrancada de um mundo sem transcendência. Não se trata de um sistema, nem de uma doutrina, nem de um tratado. Trata-se de incisões mínimas. Cada frase procura fixar um instante de percepção, uma intuição condensada, um ponto agudo de pensamento.',
      'A farpa tem uma natureza própria: é pequena, mas não é fraca; quase invisível, mas capaz de alterar inteiramente a relação que temos com o corpo. Assim também essas frases. São breves, mas não pretendem ser leves. Não querem oferecer conforto conceitual, nem explicações totalizantes. Querem tocar o pensamento de maneira rápida e incisiva, como fragmentos que perturbam mais do que concluem. Seu trabalho não é encerrar o sentido, mas abri-lo sob a forma de um incômodo.',
      'Não se deve exigir demais de frases tão breves. Poucas palavras raramente entregam mais do que uma direção. Elas apontam, insinuam, perfuram. São setas curtas, farpas de linguagem, lançadas para algum lugar de significado. Algumas delas, ao longo do tempo, me levaram muito além do seu impulso inicial, porque continham mais do que pareciam conter no momento em que foram escritas. As que segui em busca de maior entendimento se mostraram férteis. Espero que também possam ser assim para o leitor.',
    ];
    const expedienteBlocks = [
      'FILOSOFIA das FARPAS - UM MANIFESTO DO NÃO-SABER',
      'Copyright © 2026 - Paulo Volker. Todos os direitos reservados.',
      'Grafia atualizada segundo o Acordo Ortográfico da Língua Portuguesa de 1990, que entrou em vigor no Brasil em 2009.',
      'Volker, Paulo. Filosofia das Farpas - Um Manifesto do Não-Saber. Brasília: MDH, 2026.\nCDU: 1:159.942:128.2(0.034)\n(Filosofia - Existencialismo - Fenomenologia - Filosofia da mente - Forma literária)',
      'MDH\nSelo editorial: Independently published',
      'Capa, Ilustrações, programação  e gráficos © Paulo Volker',
    ];

    if (isPrefacio) {
      return (
        <div className="flex flex-col items-center animate-fadeIn w-full">
          <div className="w-full flex justify-between items-center mb-6 px-4">
            <button
              onClick={openSectionMenu}
              className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
            >
              &larr; Voltar ao sumário
            </button>
            <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.3em]">
              {title}
            </span>
          </div>

          <div className="w-full max-w-6xl bg-[#fdfaf6] shadow-2xl rounded-sm overflow-hidden border border-neutral-200 px-8 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
            <header className="mb-10 md:mb-14">
              <div className="flex items-baseline justify-between gap-6">
                <div>
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] font-inter font-semibold opacity-60"
                    style={{ color: '#8B2635' }}
                  >
                    {title}
                  </span>
                  <div className="h-[2px] w-8 mt-2" style={{ backgroundColor: '#8B2635' }} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Filosofia das Farpas
                </span>
              </div>
            </header>

            <main className="max-w-none">
              <div className="columns-1 lg:columns-2 lg:gap-14 [column-fill:balance]">
                {prefacioParagraphs.map((paragraph, index) => (
                  <p
                    key={`prefacio-${index}`}
                    className={`font-inter text-[15px] md:text-[16px] text-neutral-800 leading-8 text-justify mb-6 break-inside-avoid ${index === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-none first-letter:font-cinzel first-letter:text-rose-700' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="font-inter text-sm text-neutral-700">Paulo Volker</p>
                </div>
                <p className="font-cinzel text-[10px] tracking-widest text-neutral-300">
                  FILOSOFIA DAS FARPAS
                </p>
              </div>
            </main>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center animate-fadeIn">
        <div className="w-full flex justify-between items-center mb-6 px-4">
          <button
            onClick={openSectionMenu}
            className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            &larr; Voltar ao sumário
          </button>
          <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.3em]">
            {title}
          </span>
        </div>

        <div className="w-full max-w-4xl bg-[#fdfaf6] shadow-2xl rounded-sm overflow-hidden border border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            <div className="bg-neutral-100 p-8 md:p-12 flex items-center justify-center">
              <div className="w-full max-w-sm aspect-[3/4] rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.24),_rgba(20,20,20,0.96)_68%)] border border-neutral-800 shadow-[0_0_60px_rgba(0,0,0,0.35)] p-8 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-neutral-500">{eyebrow}</p>
                  <div className="mt-4 h-px w-16 bg-amber-600/80"></div>
                </div>
                <div className="text-center">
                  <p className="font-cinzel text-5xl text-amber-500 leading-none">{title}</p>
                  <p className="mt-3 font-inter text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                    Filosofia das Farpas
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] text-neutral-500">Seção especial</p>
                </div>
              </div>
            </div>

            <div className="p-10 md:p-16 flex flex-col justify-center relative bg-[#fdfaf6]">
              <div
                className="absolute top-0 right-0 w-1 h-full"
                style={{ backgroundColor: isPrefacio ? '#8B2635' : '#1A365D' }}
              />

              <header className="mb-8">
                <span
                  className="text-[10px] uppercase tracking-[0.3em] font-inter font-semibold opacity-60"
                  style={{ color: isPrefacio ? '#8B2635' : '#1A365D' }}
                >
                  {title}
                </span>
                <div
                  className="h-[2px] w-8 mt-2"
                  style={{ backgroundColor: isPrefacio ? '#8B2635' : '#1A365D' }}
                />
              </header>

              <main className="flex-grow flex flex-col justify-center">
                <blockquote className="font-playfair italic text-3xl md:text-4xl text-neutral-900 leading-relaxed mb-8 relative">
                  <span className="absolute -top-8 -left-6 text-7xl text-neutral-200 font-serif select-none pointer-events-none">
                    “
                  </span>
                  {isPrefacio
                    ? 'Antes do primeiro lance, convém abrir a página e ajustar o olhar.'
                    : 'Toda edição termina de algum modo, mesmo quando continua na mão do leitor.'}
                </blockquote>

                <div className="w-full h-[1px] bg-neutral-200 mb-8" />

                <div className="space-y-6">
                  {expedienteBlocks.map((block, index) => (
                    <p
                      key={`expediente-${index}`}
                      className="font-inter text-base text-neutral-700 leading-8 text-left whitespace-pre-line max-w-prose"
                    >
                      {block}
                    </p>
                  ))}
                </div>
              </main>

              <footer className="mt-auto flex justify-between items-baseline pt-12">
                <span className="font-mono text-[10px] text-neutral-400">
                  {isPrefacio ? 'PÁG. 000' : 'PÁG. 999'}
                </span>
                <span className="font-cinzel text-[10px] tracking-widest text-neutral-300">
                  FILOSOFIA DAS FARPAS
                </span>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const nextPage = () => {
    if (currentPageIndex < BOOK_CONTENT.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      setState(BookState.BACK_COVER);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    } else {
      setState(BookState.COVER);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (state === BookState.COVER) openSectionMenu();
        else if (state === BookState.TOC) openPage(menuPages[0]);
        else if (state === BookState.READING && !specialSection) nextPage();
      } else if (e.key === 'ArrowLeft') {
        if (state === BookState.BACK_COVER) setState(BookState.READING);
        else if (state === BookState.READING && specialSection) openSectionMenu();
        else if (state === BookState.READING && !specialSection) prevPage();
      }
      if (state === BookState.TOC) {
        if (e.key === '1') openSpecialSection('prefacio');
        if (e.key === '2') openSpecialSection('expediente');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, currentPageIndex, specialSection, menuPages]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 selection:bg-amber-200 selection:text-black">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#333_0%,_transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="z-10 w-full max-w-6xl transition-all duration-700">
        
        {/* Cover Section */}
        {state === BookState.COVER && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div 
              className="group relative w-full max-w-md aspect-[3/4.5] bg-black shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-sm border-[12px] border-[#1a1a1a] flex flex-col p-12 overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={openSectionMenu}
            >
              {/* Cover Design */}
              <div className="absolute inset-0 bg-[url('https://picsum.photos/id/400/800/1200')] grayscale opacity-30 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-full h-2 bg-amber-600/50"></div>
              
              <div className="mt-8 border-t border-b border-amber-900/30 py-4">
                <h2 className="font-cinzel text-neutral-500 tracking-[0.5em] text-center text-xs">UM MANIFESTO DO NÃO-SABER</h2>
              </div>
              
              <div className="mt-auto mb-12">
                <h1 className="font-cinzel text-5xl md:text-6xl text-amber-500 leading-tight tracking-tight">
                  FILOSOFIA<br/>
                  <span className="text-white">DAS FARPAS</span>
                </h1>
                <div className="h-1 w-24 bg-amber-600 mt-6"></div>
              </div>

              <div className="mt-auto flex flex-col items-end">
                <p className="font-playfair italic text-lg text-neutral-400">P. Volker</p>
                <span className="font-inter text-[10px] tracking-widest text-neutral-600 uppercase mt-2">Segunda Edição Revisada</span>
              </div>
              
              {/* Interaction prompt */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-amber-500 font-mono text-[10px] animate-pulse">ABRIR O LIVRO</span>
              </div>
            </div>
          </div>
        )}

        {/* Section Menu */}
        {state === BookState.TOC && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="w-full max-w-4xl bg-[#111111]/95 border border-neutral-800 shadow-[0_0_80px_rgba(0,0,0,0.6)] rounded-sm p-8 md:p-12">
              <div className="flex items-center justify-between gap-3 mb-10">
                <button
                  onClick={() => openSpecialSection('prefacio')}
                  className="px-3 py-2 rounded-full border border-neutral-700 text-[9px] uppercase tracking-[0.3em] text-neutral-400 hover:text-rose-300 hover:border-rose-400/60 transition-colors"
                >
                  Prefácio
                </button>

                <div className="flex-1 text-center">
                  <p className="font-mono text-[10px] tracking-[0.5em] text-neutral-500 uppercase">Sumário do acaso</p>
                  <h2 className="font-cinzel text-3xl md:text-4xl text-amber-500 mt-4">Escolha um dado</h2>
                  <p className="font-inter text-sm text-neutral-400 mt-4 max-w-xl mx-auto leading-relaxed">
                    O livro não revela tudo de uma vez. Ele oferece apenas quatro números, como se fossem faces lançadas ao acaso.
                  </p>
                </div>

                <button
                  onClick={() => openSpecialSection('expediente')}
                  className="px-3 py-2 rounded-full border border-neutral-700 text-[9px] uppercase tracking-[0.3em] text-neutral-400 hover:text-sky-300 hover:border-sky-400/60 transition-colors"
                >
                  Expediente
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {menuPages.map((pageIndex, slotIndex) => {
                  const page = BOOK_CONTENT[pageIndex];
                  const displayNumber = String(page.id).padStart(2, '0');

                  return (
                    <button
                      key={`${page.id}-${slotIndex}`}
                      onClick={() => openPage(pageIndex)}
                      className="group relative aspect-[4/3] rounded-xl border border-neutral-800 bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.18),_rgba(17,17,17,0.96)_55%)] p-6 text-left overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-amber-600/60"
                    >
                      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.08)_25%,rgba(255,255,255,0.08)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.08)_75%)] bg-[length:18px_18px]"></div>
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-neutral-500">DADO {slotIndex + 1}</span>
                          <span className="font-mono text-[10px] text-amber-500/70 uppercase">Abrir</span>
                        </div>

                        <div className="flex flex-col items-center justify-center flex-1 text-center">
                          <span className="font-cinzel text-7xl md:text-8xl text-amber-500 leading-none drop-shadow-[0_0_20px_rgba(217,119,6,0.35)]">
                            {displayNumber}
                          </span>
                          <span className="mt-3 font-inter text-xs uppercase tracking-[0.3em] text-neutral-500">
                            página oculta
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <button
                  onClick={openSectionMenu}
                  className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-amber-400 transition-colors"
                >
                  Reabrir
                </button>
                <div className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                  1 = Prefácio / 2 = Expediente
                </div>
                <button
                  onClick={() => setState(BookState.COVER)}
                  className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                  Voltar à capa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reader Section */}
        {state === BookState.READING && (
          specialSection ? (
            renderSpecialSection()
          ) : (
            <div className="flex flex-col items-center animate-fadeIn">
              <div className="w-full flex justify-between items-center mb-6 px-4">
                <button
                  onClick={openSectionMenu}
                  className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                >
                  &larr; Voltar ao sumário
                </button>
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-[10px] text-neutral-600">
                    {currentPageIndex + 1} / {BOOK_CONTENT.length}
                  </span>
                  <div className="h-1 w-32 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 transition-all duration-300"
                      style={{ width: `${((currentPageIndex + 1) / BOOK_CONTENT.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full transition-all duration-500">
                <BookPage page={BOOK_CONTENT[currentPageIndex]} />
              </div>

              <div className="flex space-x-8 mt-12">
                <button
                  onClick={prevPage}
                  className="p-4 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-all group disabled:opacity-30"
                  disabled={currentPageIndex === 0}
                >
                  <svg className="w-6 h-6 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={nextPage}
                  className="px-12 py-4 rounded-full bg-amber-600 hover:bg-amber-500 text-black font-cinzel font-bold tracking-widest transition-all shadow-xl shadow-amber-900/10 group flex items-center space-x-3"
                >
                  <span>PRÓXIMA PÁGINA</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          )
        )}

        {/* Back Cover Section */}
        {state === BookState.BACK_COVER && (
          <div className="flex flex-col items-center animate-fadeIn">
             <div 
              className="w-full max-w-md aspect-[3/4.5] bg-[#1a1a1a] shadow-2xl rounded-sm p-12 flex flex-col items-center justify-center text-center border-l-[12px] border-neutral-900"
            >
              <div className="w-16 h-1 w-full bg-amber-900/20 mb-12"></div>
              
              <div className="mb-12">
                <svg className="w-12 h-12 text-neutral-700 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-playfair text-neutral-400 text-sm leading-relaxed italic">
                  "O peruá é o milho que não explode. Resistência silenciosa ao calor que a todos transforma, ele permanece semente. Há filosofia no fracasso da explosão."
                </p>
              </div>

              <div className="mt-auto flex flex-col items-center space-y-4">
                <div className="w-32 h-32 bg-neutral-900 flex items-center justify-center border border-neutral-800">
                  <div className="w-24 h-24 opacity-40 grayscale invert brightness-200">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com" alt="QR Code" />
                  </div>
                </div>
                <p className="font-mono text-[10px] text-neutral-600 tracking-tighter uppercase">978-3-16-148410-0</p>
              </div>

              <button 
                onClick={openSectionMenu}
                className="mt-12 font-cinzel text-amber-600 tracking-widest text-xs hover:text-amber-400 transition-colors underline underline-offset-8"
              >
                REABRIR O SUMÁRIO
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
