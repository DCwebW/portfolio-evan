"use client"

import { useRef } from 'react'
import DemonstrationProcessus from './DemonstrationProcessus'
import { demonstrationData } from './Demonstrationdata'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/src/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DemonstrationListe = () => {

  const containerRef= useRef<HTMLDivElement>(null)
  const tlRef= useRef<GSAPTimeline>(null)

 useGSAP(() => {
  tlRef.current = gsap.timeline().from(".demo-item", {
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: { amount: 1 },
    ease: "power2.inOut",
  })

  ScrollTrigger.create({
    trigger: containerRef.current,
    animation: tlRef.current,
    start: "top 90%",
    toggleActions: "play none none reverse",
  })
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