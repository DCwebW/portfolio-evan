'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Image {
  src: string;
  alt?: string;
  label?: string;
}

interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: Image[];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const isMobile = useIsMobile();
  const container = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({
    target: mounted ? container : undefined,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0.4, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0.4, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0.4, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0.4, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0.4, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const labelOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.05, 0.22], [18, 0]);

  if (isMobile) {
    const visibleImages = images.filter((img) => img.label).slice(0, 4);
    return (
      <div className="py-10 px-5 bg-amber-50">
        <div className="grid grid-cols-2 gap-2">
          {visibleImages.map((img, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-xl">
              <img
                src={img.src}
                alt={img.alt || `Image ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {img.label && (
                <div
                  className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(180,30,30,0.55) 0%, rgba(180,30,30,0.18) 50%, transparent 100%)',
                  }}
                >
                  <span className="relative z-10 text-white text-[10px] font-semibold tracking-widest uppercase text-center leading-tight px-2">
                    {img.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={container} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {images.map(({ src, alt, label }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
            >
              <div className="relative h-[25vh] w-[25vw] overflow-hidden">
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {label && (
                  <motion.div
                    style={{ opacity: labelOpacity, y: labelY }}
                    className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none"
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(180,30,30,0.55) 0%, rgba(180,30,30,0.18) 50%, transparent 100%)',
                      }}
                    />
                    <span
                      className="relative z-10 text-white text-xs font-semibold tracking-widest uppercase text-center leading-tight px-2 "
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.45)' }}
                    >
                      {label}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
