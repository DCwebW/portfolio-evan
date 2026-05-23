'use client';
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { VideoTooltip } from "./VideoTooltip";
import type { VideoInfo } from "../Projets";

export function Cell({ featured, children, info }: {
  featured?: boolean;
  children: React.ReactNode;
  info?: VideoInfo;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(cellRef.current, { scale: 1, zIndex: 1 });
  }, { scope: cellRef });

  const handleMouseEnter = () => {
    gsap.to(cellRef.current, { scale: 1.05, zIndex: 10, duration: 0.4, ease: "power2.out" });
    gsap.to(tooltipRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cellRef.current, { scale: 1, zIndex: 1, duration: 0.35, ease: "power2.inOut" });
    gsap.to(tooltipRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={cellRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        js-cell relative rounded-xl bg-white/5 cursor-pointer
        ${featured
          ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 aspect-[9/16] sm:aspect-[16/7] lg:aspect-auto lg:h-full"
          : "aspect-video lg:aspect-auto lg:h-full"
        }
      `}
      style={{ overflow: "hidden" }}
    >
      {children}
      {info && <VideoTooltip ref={tooltipRef} info={info} />}
    </div>
  );
}