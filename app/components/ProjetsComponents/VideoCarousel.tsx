'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { R2Video } from '@/lib/fetchPrisesDeVue';
import { VideoCarouselCell } from './VideoCarouselCell';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function VideoCarousel({ videos }: { videos: R2Video[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const row = rowRef.current;
    if (!wrapper || !row || videos.length === 0) return;

    tweenRef.current = gsap.to(row, {
      x: '-50%',
      duration: 70,
      ease: 'none',
      repeat: -1,
      paused: true,
    });

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top 85%',
      end: 'bottom 15%',
      onEnter: () => tweenRef.current?.play(),
      onLeave: () => tweenRef.current?.pause(),
      onEnterBack: () => tweenRef.current?.play(),
      onLeaveBack: () => tweenRef.current?.pause(),
    });

    wrapper.onmouseenter = () => tweenRef.current?.pause();
    wrapper.onmouseleave = () => tweenRef.current?.play();
  }, { scope: wrapperRef, dependencies: [videos.length] });

  if (videos.length === 0) return null;

  return (
    <div ref={wrapperRef} className="py-6" style={{ overflowX: 'clip' }}>
      <div ref={rowRef} className="flex gap-3" style={{ width: 'max-content' }}>
        {[...videos, ...videos].map((video, i) => (
          <VideoCarouselCell key={`${video.key}-${i}`} video={video} />
        ))}
      </div>
    </div>
  );
}
