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
                <Image src={'/PhotoPortrait1.jpg'} width={150} height={80} alt="" className='photo' />
            </div>
            <div className="w-2xl">
                <h1 className="text-7xl text-black italic font-bold">
                    Reprenez le controle de votre
                </h1>
                <h1 className="text-7xl text-red-800 font-bold changetext">Image</h1>
            </div>
        </section>
    )
}

export default Citation