"use client"

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ContactModal from './ContactModal'

function ContactButton({ color }: { color: "blanc" | "rouge" }) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const jiggleRef = useRef<GSAPAnimation | null>(null)
    const resetRef = useRef<GSAPAnimation | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useGSAP(() => {
        jiggleRef.current = gsap.to(buttonRef.current, {
            scale: 1.4,
            paused: true,
            repeat: -1,
            yoyo: true,
            duration: 0.2,
        })
        resetRef.current = gsap.to(buttonRef.current, {
            scale: 1,
            paused: true,
            duration: 0.2,
        })
    }, { scope: buttonRef })

    const handleMouseEnter = () => {
        resetRef.current?.pause()
        jiggleRef.current?.restart()
    }

    const handleMouseLeave = () => {
        jiggleRef.current?.pause()
        resetRef.current?.restart()
    }

    const handleClick = () => {
        jiggleRef.current?.pause()
        resetRef.current?.restart()
        setIsModalOpen(true)
    }

    return (
        <>
            {color === "blanc" ? (
                <button
                    className="group flex items-center w-40 bg-white text-[#111] border-none py-1.5 pr-1.5 pl-5 rounded-full text-[12px] font-semibold cursor-pointer no-underline transition-[transform,box-shadow] duration-200 whitespace-nowrap shadow-[0_2px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    ref={buttonRef}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Contactez-moi
                    <span className="w-8.5 h-8.5 bg-(--red) rounded-full flex items-center justify-center ml-3.5 shrink-0 text-base text-white transition-colors duration-200 group-hover:bg-(--red-hover)">
                        →
                    </span>
                </button>
            ) : (
                <button
                    className="inline-flex items-center gap-2 bg-(--red) text-white border-none py-3 px-6.5 rounded-full text-sm font-medium cursor-pointer no-underline self-start mt-2 min-h-11 transition-[background,transform] duration-200 hover:bg-(--red-hover) focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    ref={buttonRef}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Contactez-moi →
                </button>
            )}

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default ContactButton
