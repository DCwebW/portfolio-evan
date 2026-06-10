"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const TITLE_PARTS = ["Une ", "maîtrise", " des outils à votre service"] as const;

const TOOLS = [
  { id: "wordpress", src: "/Logos/Outils/WordpressLogo.png", alt: "WordPress" },
  { id: "canva", src: "/Logos/Outils/CanvaLogo.png", alt: "Canva" },
  { id: "premiere", src: "/Logos/Outils/PremiereProLogo.png", alt: "Premiere Pro" },
  { id: "photoshop", src: "/Logos/Outils/PhotoshopLogo.png", alt: "Photoshop" },
] as const;

export default function OutilsMaitrises() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const part1Ref = useRef<HTMLSpanElement>(null);
  const part2Ref = useRef<HTMLSpanElement>(null);
  const part3Ref = useRef<HTMLSpanElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatTweens = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const p1 = part1Ref.current;
      const p2 = part2Ref.current;
      const p3 = part3Ref.current;
      const titleEl = titleRef.current;
      if (!p1 || !p2 || !p3 || !titleEl) return;

      const mm = gsap.matchMedia();

      // ── Desktop : lettre par lettre ──────────────────────────
      mm.add("(min-width: 1024px)", () => {
        p1.textContent = "";
        p2.textContent = "";
        p3.textContent = "";

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })
          .to(p1, {
            text: { value: TITLE_PARTS[0], delimiter: "" },
            duration: TITLE_PARTS[0].length * 0.04,
            ease: "none",
          })
          .to(p2, {
            text: { value: TITLE_PARTS[1], delimiter: "" },
            duration: TITLE_PARTS[1].length * 0.05,
            ease: "none",
          })
          .to(p3, {
            text: { value: TITLE_PARTS[2], delimiter: "" },
            duration: TITLE_PARTS[2].length * 0.035,
            ease: "none",
          });
      });

      // ── Mobile / Tablette : fade-in simple ───────────────────
      mm.add("(max-width: 1023px)", () => {
        p1.textContent = TITLE_PARTS[0];
        p2.textContent = TITLE_PARTS[1];
        p3.textContent = TITLE_PARTS[2];

        gsap.fromTo(
          titleEl,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const items = section.querySelectorAll<HTMLElement>(".tool-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.11,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const tween = gsap.to(el, {
          y: -9,
          duration: 2.5 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
        floatTweens.current.push(tween);
      });
    },
    { scope: sectionRef }
  );

  const handleMouseEnter = (iconWrap: HTMLDivElement | null) => {
    if (!iconWrap) return;
    const idx = iconsRef.current.indexOf(iconWrap);
    floatTweens.current[idx]?.pause();
    gsap.to(iconWrap, { y: -14, duration: 0.45, ease: "power2.out" });
  };

  const handleMouseLeave = (iconWrap: HTMLDivElement | null) => {
    if (!iconWrap) return;
    const idx = iconsRef.current.indexOf(iconWrap);
    gsap.to(iconWrap, {
      y: 0,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => floatTweens.current[idx]?.resume(),
    });
  };

  return (
    <section ref={sectionRef} className="outils-section">
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          maxWidth: 760,
          maxHeight: 760,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(216,27,27,0.10), transparent 68%)",
          filter: "blur(40px)",
          top: "-18%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />

      <div className="outils-inner">
        {/* Header */}
        <div className="outils-header">
          <h2 ref={titleRef} className="outils-title">
            <span ref={part1Ref} />
            <em style={{ color: "#D81B1B", fontStyle: "normal" }}>
              <span ref={part2Ref} />
            </em>
            <span ref={part3Ref} />
          </h2>
          <p className="outils-subtitle">
            Des outils que j&apos;utilise au quotidien pour donner vie aux
            marques — du site web au montage vidéo, en passant par le design et
            la retouche.
          </p>
        </div>

        {/* Grid */}
        <div className="tools-grid">
          {TOOLS.map((tool, i) => (
            <div
              key={tool.id}
              className="tool-item"
              style={{ opacity: 0 }}
            >
              <div
                ref={(el) => {
                  iconsRef.current[i] = el;
                }}
                className="tool-icon-wrap"
                onMouseEnter={() => handleMouseEnter(iconsRef.current[i])}
                onMouseLeave={() => handleMouseLeave(iconsRef.current[i])}
              >
                <Image
                  src={tool.src}
                  alt={tool.alt}
                  width={96}
                  height={96}
                  className="tool-logo"
                  style={{ objectFit: "contain", display: "block" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .outils-section {
          background: #F7F5F2;
          position: relative;
          overflow: hidden;
          padding: 100px 24px;
        }

        .outils-inner {
          max-width: 1180px;
          margin: 0 auto;
          position: relative;
        }

        .outils-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .outils-title {
          font-family: 'Manrope', sans-serif;
          font-weight: 900;
          font-size: 34px;
          line-height: 0.96;
          letter-spacing: -1.2px;
          color: #1A1A1A;
          margin: 0 auto 16px;
        }

        .outils-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(26, 26, 26, 0.58);
          max-width: 44ch;
          margin: 0 auto;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 36px 20px;
          justify-items: center;
        }

        .tool-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tool-icon-wrap {
          will-change: transform;
        }

        .tool-logo {
          width: 72px !important;
          height: 72px !important;
        }

        /* ── Tablette (≥ 640px) ── */
        @media (min-width: 640px) {
          .outils-section {
            padding: 120px 40px;
          }

          .outils-header {
            margin-bottom: 56px;
          }

          .outils-title {
            font-size: 44px;
            letter-spacing: -1.4px;
          }

          .outils-subtitle {
            font-size: 15px;
            max-width: 50ch;
          }

          .tools-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
          }

          .tool-logo {
            width: 88px !important;
            height: 88px !important;
          }
        }

        /* ── Desktop (≥ 1024px) ── */
        @media (min-width: 1024px) {
          .outils-section {
            padding: 160px 96px;
          }

          .outils-header {
            margin-bottom: 72px;
          }

          .outils-title {
            font-size: clamp(48px, 5.2vw, 66px);
            letter-spacing: -1.6px;
          }

          .outils-subtitle {
            font-size: 16px;
            max-width: 52ch;
          }

          .tools-grid {
            gap: 44px;
          }

          .tool-logo {
            width: 96px !important;
            height: 96px !important;
          }
        }
      `}</style>
    </section>
  );
}
