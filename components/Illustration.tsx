
import React, { useEffect, useMemo, useState } from 'react';

interface IllustrationProps {
  phrase: string;
  school: string;
  pageId: number;
}

const Illustration: React.FC<IllustrationProps> = ({ phrase, pageId }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [candidateIndex, setCandidateIndex] = useState(0);

  const imageCandidates = useMemo(() => {
    const fallbackMap: Record<number, string[]> = {
      23: ['/book-images/page-23.png?v=3', '/book-images/page-22-b.jpg?v=3'],
      27: ['/book-images/page-27.png?v=3', '/book-images/page-25-b.jpg?v=3'],
      41: ['/book-images/page-41.png?v=3', '/book-images/page-38-b.jpg?v=3'],
      42: ['/book-images/page-42.png?v=3', '/book-images/page-38-c.jpg?v=3'],
      44: ['/book-images/page-44.png?v=3', '/book-images/page-45.png?v=3'],
      69: ['/book-images/page-69.png?v=3', '/book-images/page-62-b.jpg?v=3'],
      79: ['/book-images/page-79.png?v=3', '/book-images/page-71-b.jpg?v=3'],
    };

    return fallbackMap[pageId] ?? [`/book-images/page-${pageId}.png?v=3`];
  }, [pageId]);

  const imageUrl = imageCandidates[candidateIndex] ?? imageCandidates[0];

  useEffect(() => {
    // Reset state when page changes
    setImageLoaded(false);
    setError(false);
    setCandidateIndex(0);
  }, [pageId]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    const hasMoreCandidates = candidateIndex < imageCandidates.length - 1;

    if (hasMoreCandidates) {
      setCandidateIndex(prev => prev + 1);
      return;
    }

    setError(true);
    setImageLoaded(true); // Stop loading state even if error
  };

  return (
    <div className="relative w-full h-full bg-neutral-900 rounded-lg overflow-hidden shadow-2xl group border border-neutral-800">

      {/* Loading Skeleton */}
      {!imageLoaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 animate-pulse z-10 bg-neutral-900">
          <div className="w-12 h-12 border-4 border-t-amber-500 border-neutral-700 rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Carregando...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-neutral-900 z-10">
          <div className="text-center">
            <p className="text-neutral-600 font-mono text-xs uppercase mb-2">Imagem não encontrada</p>
            <p className="text-neutral-800 text-[10px]">Página {pageId}</p>
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={imageUrl}
        alt={`Ilustração para: ${phrase}`}
        className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'opacity-100 grayscale-[0.3] hover:grayscale-0' : 'opacity-0'
          }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
        <div className="h-[1px] w-0 group-hover:w-full bg-amber-500 transition-all duration-500"></div>
      </div>
    </div>
  );
};

export default Illustration;
