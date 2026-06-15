'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { R2Video } from '@/lib/fetchPrisesDeVue';
import { VideoCarouselCell } from './VideoCarouselCell';
import { VideoModal } from './VideoModal';
import type { VideoInfo } from '../Projets';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function VideoCarousel({ videos }: { videos: R2Video[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const videoItems: VideoInfo[] = videos.map((v) => ({
    src: v.url,
    title: v.key.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
    description: '',
  }));

  return (
    <>
      <div ref={wrapperRef} className="py-6" style={{ overflowX: 'clip' }}>
        <div ref={rowRef} className="flex gap-3" style={{ width: 'max-content' }}>
          {[...videos, ...videos].map((video, i) => (
            <VideoCarouselCell
              key={`${video.key}-${i}`}
              video={video}
              onOpen={() => setSelectedIndex(i % videos.length)}
            />
          ))}
        </div>
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
