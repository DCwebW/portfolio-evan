"use client"

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import ContactButton from './ContactButton'

function Citation() {
    const tlRef = useRef<GSAPTimeline | null>(null)
    const containerTextRef = useRef<HTMLElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)')
        setIsMobile(mq.matches)
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    tlRef.current = gsap.timeline({ paused: true })
        .from(".redbar", { width: 0, duration: 1, ease: "power1.in" })
        .to(".changetext", { text: "Communication", duration: 1 })
        .to(".changetext", { text: "Stratégie", duration: 1 })
        .to(".changetext", { text: "Marque", duration: 1 })
        .to(".changetext", { text: "Histoire", duration: 1 })
        .fromTo(".contactbutton",
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power1.inOut" }
        )

    const createTrigger = () => {
        ScrollTrigger.create({
            trigger: containerTextRef.current,
            animation: tlRef.current!,
            start: "top 10%",
            end: "+=1000",
            pinSpacing: false
        })
        ScrollTrigger.refresh()
    }

    if (document.readyState === 'complete') {
        createTrigger()
        return
    }

    window.addEventListener('load', createTrigger, { once: true })
    return () => window.removeEventListener('load', createTrigger)

}, { scope: containerTextRef })

    return (
        <section
            className="bg-(--light) relative z-10 mt-8 md:mt-11 min-h-fit h-auto pb-16 md:pb-24 px-5 md:px-8 lg:px-13"
            ref={containerTextRef}
        >
            <div className="max-w-300 mx-auto flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start md:items-center justify-center">

                {/* Photo — hidden on mobile to save vertical space, shown md+ */}
                <div className="hidden md:block relative shrink-0 w-70 lg:w-95 xl:w-110 aspect-3/4 rounded-3xl overflow-hidden">
                    <Image
                        src="/PhotoEvan&Felicia.jpeg"
                        alt="Evan et Felicia"
                        fill
                        sizes="(max-width: 1024px) 280px, (max-width: 1280px) 380px, 440px"
                        className="object-cover"
                    />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-(--red) w-full max-w-85 md:max-w-110 lg:max-w-137.5 h-2 rounded-2xl mb-5 md:mb-6 redbar" />
                    <h2
                        className="text-black italic font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    >
                        Reprenez le controle de votre
                    </h2>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-red-800 font-bold changetext leading-tight">
                        Image
                    </h2>
                    <p className="text-black/70 text-sm md:text-base w-full max-w-95 mt-5 md:mt-6 leading-relaxed">
                        Je développe une communication moderne, fluide et impactante, pensée pour capter l&apos;attention et créer un vrai lien avec les audiences.
                    </p>
                    <div className="mt-4 md:mt-5">
                        <ContactButton color="rouge" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Citation