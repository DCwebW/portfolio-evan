import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import ContactButton from './ContactButton'

function Citation() {
    const tlRef = useRef<GSAPTimeline | null>(null)
    const containerTextRef = useRef<HTMLElement>(null)

   useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    tlRef.current = gsap.timeline()
        .from(".redbar", { width: 0, duration: 1, ease: "power1.in" })
        .to(".changetext", { text: "Communication", duration: 1 })
        .to(".changetext", { text: "Stratégie", duration: 1 })
        .to(".changetext", { text: "Marque", duration: 1 })
        .to(".changetext", { text: "Histoire", duration: 1 })
        .fromTo(".contactbutton",
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
        )

    ScrollTrigger.create({
        trigger: containerTextRef.current,
        animation: tlRef.current,
        start: "top 80%",  // 👈 relatif au viewport, plus fiable
        end: "+=1000",
        scrub: 1,
        markers: true,
    })

    // 👇 Force le recalcul après le rendu complet
    ScrollTrigger.refresh()

}, { scope: containerTextRef })

    return (
        <section className='flex gap-15 justify-center  mt-11 h-190  p-5' ref={containerTextRef}>
            {/* <img src={"/PhotoEvan&Felicia.jpeg"} alt=' Citation'  className='rounded-3xl w-130 h-150 photo-citation'/> */}
            <div className='rounded-3xl w-130 h-150 photo-citation bg-[url(/PhotoEvan&Felicia.jpeg)] bg-cover'/>
            <div className="w-2xl ">
                
                <div className='h-80'></div>
                <div className='bg-(--red) w-[580px] h-2 rounded-2xl mb-6 redbar'></div>
                <h1 className=" text-black italic font-bold text-4xl md:text-5xl lg:text-[3rem]" style={{
                    
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" 
                }}>
                    Reprenez le controle de votre
                </h1>
                <h1 className="text-5xl text-red-800 font-bold changetext">Image</h1>
                {/* <a
              className="inline-flex items-center gap-2 bg-[var(--red)] text-white border-none py-3 px-[26px] rounded-full text-sm font-medium cursor-pointer no-underline self-start mt-2 min-h-[44px] transition-[background,transform] duration-200 hover:bg-[var(--red-hover)] hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white
              contactbutton"
              href="#footer"
            >
              Get in touch →
            </a> */}
<div className='mt-3'>
 <ContactButton color={'rouge'}/>
</div>
           
            </div>
        </section>
    )
}

export default Citation