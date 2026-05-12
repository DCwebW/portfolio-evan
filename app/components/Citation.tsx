import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'

function Citation() {
    const tlRef = useRef<GSAPTimeline | null>(null)
    const containerTextRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, TextPlugin)

        tlRef.current = gsap.timeline()
            .to(".changetext", { text: "Communication", duration: 1 })
            .to(".changetext", { text: "Stratégie", duration: 1 })
            .to(".changetext", { text: "Marque", duration: 1 })
            .to(".changetext", { text: "Histoire", duration: 1 })
            .fromTo(".contactbutton",
        { x: 60, opacity:0 },  // état initial explicite
        { x: 0, opacity: 1, duration: 1 ,ease:"power1.inOut"} )
            
        ScrollTrigger.create({
            trigger: containerTextRef.current,
            animation: tlRef.current,
            start: "top top",
            end: "+=800",
            
            pin: true,
            pinSpacing: true,
        })
    }, { scope: containerTextRef })

    return (
        <section className='flex gap-25 justify-center items-center mt-11 h-170' ref={containerTextRef}>
            <div>
                <Image src={'/PhotoPortrait1.jpg'} width={200} height={50} style={{height:50}} alt="" className='photo' />
                <Image src={'/PhotoPortrait2.jpg'} width={200} height={50} style={{height:50, position:'absolute' ,zIndex:1, bottom:295 }} alt="" className='photo' />
                <Image src={'/jungle-morning-fog.jpg'} width={200} height={50} style={{height:50, position:'absolute' ,zIndex:1, bottom:280 }} alt="" className='photo' />
                
            </div>
            <div className="w-2xl">
                <h1 className=" text-black italic font-bold text-6xl md:text-8xl lg:text-[4rem]" style={{
                    
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" 
                }}>
                    Reprenez le controle de votre
                </h1>
                <h1 className="text-7xl text-red-800 font-bold changetext">Image</h1>
                <a
              className="inline-flex items-center gap-2 bg-[var(--red)] text-white border-none py-3 px-[26px] rounded-full text-sm font-medium cursor-pointer no-underline self-start mt-2 min-h-[44px] transition-[background,transform] duration-200 hover:bg-[var(--red-hover)] hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white
              contactbutton"
              href="#footer"
            >
              Get in touch →
            </a>
            </div>
        </section>
    )
}

export default Citation