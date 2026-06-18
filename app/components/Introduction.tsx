"use client"

import React,{ useRef } from 'react'
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/src/SplitText";
import ContactButton from './ContactButton';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';


function Introduction() {

    const containerText = useRef<HTMLElement>(null)
    const tlRef=useRef<GSAPTimeline>(null)
const h2Ref = useRef<HTMLHeadingElement>(null)

useGSAP(() => {
    gsap.registerPlugin(TextPlugin, ScrollTrigger, SplitText)

    const split = new SplitText(h2Ref.current, { type: "lines" })

    const mm = gsap.matchMedia()

    mm.add("(min-width: 769px)", () => {
        tlRef.current = gsap.timeline({ id: "paragraphe-3d" })
            .from(split.lines, {
                opacity: 0,
                stagger: 0.3,
                y: -90
            })

        ScrollTrigger.create({
            trigger: containerText.current,
            animation: tlRef.current,
            start: "top 100px",
            end: "+=500",
            scrub: 1,
            pin: true,
            pinSpacing: true,
        })
    })

    mm.add("(max-width: 768px)", () => {
        gsap.from(split.lines, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerText.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        })
    })

    return () => {
        split.revert()
        mm.revert()
    }

}, { scope: containerText })
    
    
    
  return (
   <section
        id="about"
        className=" containerText bg-[var(--dark)] pt-16 md:pt-20 lg:pt-[120px] px-5 md:px-8 lg:px-[52px] pb-16 md:pb-20 lg:pb-[100px] -mt-8 relative z-0"
        ref={containerText}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-[1200px] mx-auto lg:mb-16">
          <div>
            <span className="inline-block text-[11px] font-semibold text-[var(--red)] uppercase tracking-[2px] mb-6">
              Entre Vidéo, Design et Marketing Digital
            </span>
            <h2 ref={h2Ref} className="introduction font-display font-black text-[clamp(28px,8vw,68px)] md:text-[clamp(36px,6vw,68px)] leading-[0.95] tracking-[-1px] md:tracking-[-1.5px] text-white">
              Créer<br />des messages <br />qui donnent du sens et de la visibilité 
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pt-14">
            <p className="text-base font-light text-white/60 leading-[1.85]">
              Je suis un chargé de communication diplômé d&apos;un Mastère en Marketing
              Digital et Social Media. Je construis des stratégies qui connectent
              les marques à leurs audiences.
            </p>
            <p className="text-base font-light text-white/60 leading-[1.85]">
              Disponible en poste et en freelance, je combine vision créative et
              approche data-driven pour des résultats mesurables.
            </p>
            {/* <a
              className="inline-flex items-center gap-2 bg-[var(--red)] text-white border-none py-3 px-[26px] rounded-full text-sm font-medium cursor-pointer no-underline self-start mt-2 min-h-[44px] transition-[background,transform] duration-200 hover:bg-[var(--red-hover)] hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              href="#footer"
            >
              Get in touch →
            </a> */}
            <ContactButton color={"blanc"}/>
          </div>
        </div>

      </section>

  )
}

export default Introduction