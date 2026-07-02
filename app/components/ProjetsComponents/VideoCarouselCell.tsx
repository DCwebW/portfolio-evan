'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import type { R2Video } from '@/lib/fetchPrisesDeVue';
import { VideoTooltip } from './VideoTooltip';
import type { VideoInfo } from '../Projets';

export function VideoCarouselCell({ video, onOpen, fullHeight }: { video: R2Video; onOpen?: () => void; fullHeight?: boolean }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const title = video.key.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  const info: VideoInfo = { src: video.url, title, description: '' };

  const handleMouseEnter = () => {
    gsap.to(tooltipRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(tooltipRef.current, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in' });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen?.();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative w-full overflow-hidden rounded-xl cursor-pointer ${fullHeight ? 'h-full' : 'h-[180px] md:h-[220px]'}`}
    >
      <video
        src={video.url}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <VideoTooltip ref={tooltipRef} info={info} />
    </div>
  );
}
