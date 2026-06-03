'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import type { R2Video } from '@/lib/fetchPrisesDeVue';
import { VideoTooltip } from './VideoTooltip';
import { VideoModal } from './VideoModal';
import type { VideoInfo } from '../Projets';

export function VideoCarouselCell({ video }: { video: R2Video }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [modalInfo, setModalInfo] = useState<VideoInfo | null>(null);
  const title = video.key.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

  const handleMouseEnter = () => {
    gsap.to(tooltipRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(tooltipRef.current, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in' });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalInfo({ src: video.url, title, description: '' });
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative flex-shrink-0 w-[280px] h-[180px] md:w-[360px] md:h-[220px] overflow-hidden rounded-xl cursor-pointer"
      >
        <video
          src={video.url}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <VideoTooltip ref={tooltipRef} info={{ src: video.url, title, description: '' }} />
      </div>

      <VideoModal info={modalInfo} onClose={() => setModalInfo(null)} />
    </>
  );
}
