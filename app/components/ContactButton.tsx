"use client"

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function ContactButton({ color }: { color: "blanc" | "rouge" }) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const jiggleRef = useRef<GSAPAnimation | null>(null)
    const resetRef = useRef<GSAPAnimation | null>(null)

 useGSAP(() => {
    jiggleRef.current = gsap.to(buttonRef.current, {
      scale: 1.4,
      paused: true,
      repeat: -1,
      yoyo: true,
      duration:0.2
    });
    resetRef.current = gsap.to(buttonRef.current, {
      scale: 1,
      paused: true,
      duration: 0.2,
    });
}, { scope: buttonRef })



    if (color === "blanc")
        return (
            
               <button
                    className="group flex items-center w-40 bg-white text-[#111] border-none py-[6px] pr-[6px] pl-5 rounded-full text-sm font-semibold cursor-pointer no-underline transition-[transform,box-shadow] duration-200 whitespace-nowrap shadow-[0_2px_16px_rgba(0,0,0,0.15)]  hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    ref={buttonRef}
               onMouseEnter={() => {
        resetRef.current?.pause();
        jiggleRef.current?.restart();
      }}
      onMouseLeave={() => {
        jiggleRef.current?.pause();
        resetRef.current?.restart();
      }}
                >
                    Get in touch
                    <span className="w-[34px] h-[34px] bg-[var(--red)] rounded-full flex items-center justify-center ml-[14px] flex-shrink-0 text-base text-white transition-colors duration-200 group-hover:bg-[var(--red-hover)]">
                        →
                    </span>
                </button>
            
        )

    return (
       
           <button
                className="inline-flex items-center gap-2 bg-(--red) text-white border-none py-3 px-6.5 rounded-full text-sm font-medium cursor-pointer no-underline self-start mt-2 min-h-11 transition-[background,transform] duration-200 hover:bg-(--red-hover)  focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                ref={buttonRef}
            onMouseEnter={() => {
        resetRef.current?.pause();
        jiggleRef.current?.restart();
      }}
      onMouseLeave={() => {
        jiggleRef.current?.pause();
        resetRef.current?.restart();
      }}
            >
                Get in touch →
            </button>
        
    )
}

export default ContactButton