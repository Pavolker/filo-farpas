
import React from 'react';
import { BookPage as IBookPage } from '../types';
import Illustration from './Illustration';

interface BookPageProps {
  page: IBookPage;
}

const BookPage: React.FC<BookPageProps> = ({ page }) => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#fdfaf6] min-h-[600px] shadow-2xl rounded-sm overflow-hidden border border-neutral-200">
      {/* Left side: Illustration */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-neutral-100 flex items-center justify-center">
        <div className="w-full aspect-[3/4] max-h-[500px]">
          <Illustration phrase={page.phrase} school={page.school} pageId={page.id} />
        </div>
      </div>

      {/* Right side: Text content */}
      <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col relative">
        <div 
          className="absolute top-0 right-0 w-1 h-full"
          style={{ backgroundColor: page.color }}
        />
        
        <header className="mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-inter font-semibold opacity-60" style={{ color: page.color }}>
            {page.school}
          </span>
          <div className="h-[2px] w-8 mt-2" style={{ backgroundColor: page.color }}></div>
        </header>

        <main className="flex-grow flex flex-col justify-center">
          <blockquote className="font-playfair italic text-2xl md:text-3xl text-neutral-800 leading-relaxed mb-12 relative">
            <span className="absolute -top-8 -left-6 text-7xl text-neutral-200 font-serif select-none pointer-events-none">“</span>
            {page.phrase}
          </blockquote>
          
          <div className="w-full h-[1px] bg-neutral-200 mb-8"></div>
          
          <p className="font-inter text-sm text-neutral-500 leading-relaxed text-justify">
            {page.commentary}
          </p>
        </main>

        <footer className="mt-auto flex justify-between items-baseline pt-12">
          <span className="font-mono text-[10px] text-neutral-400">PÁG. {page.id.toString().padStart(3, '0')}</span>
          <span className="font-cinzel text-[10px] tracking-widest text-neutral-300">FILOSOFIA DAS FARPAS</span>
        </footer>
      </div>
    </div>
  );
};

export default BookPage;
