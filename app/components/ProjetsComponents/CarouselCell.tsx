'use client';

import { useRef } from "react";
import gsap from "gsap";
import type { ImageInfo } from "./Carousel";
import { ImageTooltip } from "./ImageTooltip";

export function CarouselCell({ src, info, onOpen }: { src: string; info?: ImageInfo; onOpen?: () => void }) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(tooltipRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(tooltipRef.current, { opacity: 0, y: 12, duration: 0.2, ease: "power2.in" });
  };

  const handleClick = () => {
    gsap.to(tooltipRef.current, { opacity: 0, y: 12, duration: 0.15, ease: "power2.in" });
    onOpen?.();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative flex-shrink-0 w-[200px] h-[140px] sm:w-[240px] sm:h-[170px] md:w-[280px] md:h-[200px] overflow-hidden rounded-xl cursor-pointer"
    >
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
      {info && <ImageTooltip ref={tooltipRef} info={info} />}
    </div>
  );
}
