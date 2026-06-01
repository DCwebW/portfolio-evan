'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import type { R2Video } from '@/lib/fetchPrisesDeVue';
import { VideoTooltip } from './VideoTooltip';

export function VideoCarouselCell({ video }: { video: R2Video }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const title = video.key.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

  const handleMouseEnter = () => {
    gsap.to(tooltipRef.current, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(tooltipRef.current, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in' });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
  );
}
