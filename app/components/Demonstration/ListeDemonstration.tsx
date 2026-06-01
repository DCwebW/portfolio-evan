"use client"

import { useRef } from 'react'
import DemonstrationProcessus from './DemonstrationProcessus'
import { demonstrationData } from './Demonstrationdata'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/src/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DemonstrationListe = () => {

  const containerRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<GSAPTimeline>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      tlRef.current = gsap.timeline().from(".demo-item", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: { amount: 1 },
        ease: "power2.inOut",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        animation: tlRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.from(".demo-item", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: { amount: 0.4 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef })


  return (
    <section className='bg-white flex flex-wrap items-center justify-center gap-3 sm:gap-5 p-3 sm:p-7' ref={containerRef}>
      {demonstrationData.map((item) => (
        <DemonstrationProcessus
          key={item.nombre}
          nombre={item.nombre}
          titre={item.titre}
          explication={item.explication}
          image={item.image}
          alt={item.alt}
        />
      ))}
    </section>
  )
}

export default DemonstrationListe
