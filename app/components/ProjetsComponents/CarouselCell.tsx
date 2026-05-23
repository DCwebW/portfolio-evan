'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ImageInfo } from "./Carousel";
import { ImageTooltip } from "./ImageTooltip";

export function CarouselCell({ src, info }: { src: string; info?:ImageInfo }) {
  const cellRef = useRef<HTMLDivElement>(null);
 const tooltipRef= useRef<HTMLDivElement>(null)
  
 const handleMouseenter = ()=>{
  gsap.to(tooltipRef.current,{
    opacity:1,
    scale:1,
    duration:0.25,
    ease:"power2.out"
  })
 }

 const handleMouseMove =(e: React.MouseEvent)=>{

  gsap.set(tooltipRef.current,{
    x: e.clientX + 16,
    y: e.clientY + 16
  })
 }

 const handleMouseLeave=()=>{
  gsap.to(tooltipRef.current, {
    opacity:0,
    scale:0.9,
    duration:0.2,
    ease:"power2.in"
  })
 }

  return (
    <div 
    onMouseEnter={handleMouseenter}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    ref={cellRef} className="relative flex-shrink-0 w-[200px] h-[140px] sm:w-[240px] sm:h-[170px] md:w-[280px] md:h-[200px] overflow-hidden rounded-xl cursor-pointer">
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
      {info && <ImageTooltip ref={tooltipRef} info={info} />}
    </div>
  );
}
