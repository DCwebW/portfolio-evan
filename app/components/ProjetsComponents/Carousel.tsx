"use client"

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CarouselCell } from "./CarouselCell";
import { ImageModal } from "./ImageModal";

export type ImageInfo = {
  src: string;
  title: string;
  description: string;
};

export function Carousel({ images }: { images: ImageInfo[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    const wrapper = wrapperRef.current;
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    if (!wrapper || !r1 || !r2) return;

    tweensRef.current = [
      gsap.to(r1, { x: "-50%", duration: 60, ease: "none", repeat: -1, paused: true }),
      gsap.to(r2, { x: "-50%", duration: 75, ease: "none", repeat: -1, paused: true }),
    ];

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => tweensRef.current.forEach(t => t.play()),
      onLeave: () => tweensRef.current.forEach(t => t.pause()),
      onEnterBack: () => tweensRef.current.forEach(t => t.play()),
      onLeaveBack: () => tweensRef.current.forEach(t => t.pause()),
    });

    wrapper.onmouseenter = () => tweensRef.current.forEach(t => t.pause());
    wrapper.onmouseleave = () => tweensRef.current.forEach(t => t.play());
  }, { scope: wrapperRef });

  const row1WithIdx = images
    .map((item, i) => ({ item, originalIndex: i }))
    .filter(({ originalIndex }) => originalIndex % 2 === 0);
  const row2WithIdx = images
    .map((item, i) => ({ item, originalIndex: i }))
    .filter(({ originalIndex }) => originalIndex % 2 === 1);

  return (
    <>
      <div ref={wrapperRef} className="flex flex-col gap-2 py-6" style={{ overflowX: "clip" }}>
        <div ref={row1Ref} className="flex gap-2" style={{ width: "max-content" }}>
          {[...row1WithIdx, ...row1WithIdx].map(({ item, originalIndex }, i) => (
            <CarouselCell key={i} src={item.src} info={item} onOpen={() => setSelectedIndex(originalIndex)} />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-2" style={{ width: "max-content" }}>
          {[...row2WithIdx, ...row2WithIdx].map(({ item, originalIndex }, i) => (
            <CarouselCell key={i} src={item.src} info={item} onOpen={() => setSelectedIndex(originalIndex)} />
          ))}
        </div>
      </div>

      <ImageModal
        items={images}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </>
  );
}
