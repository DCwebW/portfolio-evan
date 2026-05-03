'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    content: <img src="/evan-photo.jpg" alt="Communication" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "1rem" }} />,
    label: "Communication",
  },
  {
    content: <div className="placeholder-img" style={{ width: "100%", height: "100%", borderRadius: "1rem" }}>music<br />production</div>,
    label: "Music Production",
  },
  {
    content: <div className="placeholder-img" style={{ width: "100%", height: "100%", borderRadius: "1rem" }}>direction<br />créative</div>,
    label: "Direction Créative",
  },
];

export default function Projets() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const ctx = gsap.context(() => {
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${strip.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <h2
        className="projets-title"
        style={{ position: "absolute", top: "2rem", left: "2rem", zIndex: 10 }}
      >
        Projets
      </h2>

      <div
        ref={stripRef}
        style={{ display: "flex", width: `${CARDS.length * 100}vw`, height: "100vh" }}
      >
        {CARDS.map(({ content, label }) => (
          <div
            key={label}
            style={{
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 12vw",
            }}
          >
            <div style={{ width: "100%", height: "70vh", position: "relative" }}>
              {content}
              <div className="img-label">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
