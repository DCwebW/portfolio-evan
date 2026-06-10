"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import ContactButton from './ContactButton'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const TITLE_TEXT = "Reprenez le contrôle de votre"
const CYCLING_WORDS = ["Communication", "Stratégie", "Marque", "Histoire"]

function Citation() {
    const containerRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)

    useGSAP(() => {
        const section = containerRef.current
        if (!section || !titleRef.current) return

        // Vider le titre avant l'animation
        titleRef.current.textContent = ""

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none",
            },
        })

        // Barre rouge
        tl.from(".redbar", { width: 0, duration: 0.9, ease: "power2.out" })

        // Titre lettre par lettre
        tl.to(
            titleRef.current,
            {
                text: { value: TITLE_TEXT, delimiter: "" },
                duration: TITLE_TEXT.length * 0.038,
                ease: "none",
            },
            "-=0.3"
        )

        // Mot changeant lettre par lettre
        CYCLING_WORDS.forEach((word, i) => {
            tl.to(".changetext", {
                text: { value: word, delimiter: "" },
                duration: word.length * 0.055,
                ease: "none",
            }, i === 0 ? "-=0.2" : "+=0.6")
        })

        // Bouton contact
        tl.fromTo(
            ".contactbutton",
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.4"
        )
    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            className="bg-(--light) relative z-10 mt-8 md:mt-11 min-h-fit h-auto pb-16 md:pb-24 px-5 md:px-8 lg:px-13"
        >
            <div className="max-w-300 mx-auto flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start md:items-center justify-center">

                {/* Photo — masquée sur mobile */}
                <div className="hidden md:block relative shrink-0 w-70 lg:w-95 xl:w-110 aspect-3/4 rounded-3xl overflow-hidden">
                    <Image
                        src="/PhotoEvan&Felicia.jpeg"
                        alt="Evan et Felicia"
                        fill
                        sizes="(max-width: 1024px) 280px, (max-width: 1280px) 380px, 440px"
                        className="object-cover"
                    />
                </div>

                {/* Texte */}
                <div className="flex-1 min-w-0">
                    <div className="bg-(--red) w-full max-w-85 md:max-w-110 lg:max-w-137.5 h-2 rounded-2xl mb-5 md:mb-6 redbar" />
                    <h2
                        ref={titleRef}
                        className="text-black italic font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
                        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", minHeight: "1.2em" }}
                    />
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-red-800 font-bold changetext leading-tight" />
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
