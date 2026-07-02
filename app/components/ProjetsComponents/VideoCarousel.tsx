'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import type { R2Video } from '@/lib/fetchPrisesDeVue';
import { VideoCarouselCell } from './VideoCarouselCell';
import { VideoModal } from './VideoModal';
import type { VideoInfo } from '../Projets';

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function VideoCarousel({ videos }: { videos: R2Video[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const updateArrows = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  const scrollByCol = (dir: 1 | -1) => {
    const container = containerRef.current;
    if (!container) return;
    const firstCol = container.firstElementChild as HTMLElement | null;
    const colWidth = firstCol ? firstCol.offsetWidth : 280;
    container.scrollBy({ left: dir * (colWidth + 12), behavior: 'smooth' });
  };

  if (videos.length === 0) return null;

  const columns: R2Video[][] = [];
  for (let i = 0; i < videos.length; i += 2) {
    columns.push(videos.slice(i, i + 2));
  }

  const videoItems: VideoInfo[] = videos.map((v) => ({
    src: v.url,
    title: v.key.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
    description: '',
  }));

  return (
    <>
      <div className="flex items-center gap-3 py-6">
        <button
          onClick={() => scrollByCol(-1)}
          aria-label="Colonne précédente"
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white ${atStart ? 'invisible pointer-events-none' : 'visible'}`}
        >
          <ChevronLeft />
        </button>

        <div
          ref={containerRef}
          onScroll={updateArrows}
          className="flex-1 flex gap-3 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {columns.map((col, colIdx) => {
            const isAlone = col.length === 1;
            return (
              <div
                key={colIdx}
                className="flex-shrink-0 flex flex-col gap-3 w-[280px] md:w-[360px] h-[372px] md:h-[452px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                {col.map((video, videoIdx) => {
                  const globalIdx = colIdx * 2 + videoIdx;
                  return (
                    <VideoCarouselCell
                      key={video.key}
                      video={video}
                      fullHeight={isAlone}
                      onOpen={() => setSelectedIndex(globalIdx)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scrollByCol(1)}
          aria-label="Colonne suivante"
          className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white ${atEnd ? 'invisible pointer-events-none' : 'visible'}`}
        >
          <ChevronRight />
        </button>
      </div>

      <VideoModal
        items={videoItems}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </>
  );
}
