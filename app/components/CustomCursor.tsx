"use client"
import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function CustomCursor() {
    const cursorRef = useRef(null)
    const [isPointerFine, setIsPointerFine] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia("(pointer: fine)")
        setIsPointerFine(mq.matches)
        const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches)
        mq.addEventListener("change", handler)
        return () => mq.removeEventListener("change", handler)
    }, [])

    useGSAP(() => {
        if (!isPointerFine) return

        globalThis.addEventListener("mousemove", (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power3.out"
            })
        })

        document.querySelectorAll("a, button").forEach((el) => {
            el.addEventListener("mouseenter", () =>
                gsap.to(cursorRef.current, { scale: 2.5, duration: 0.3 })
            )
            el.addEventListener("mouseleave", () =>
                gsap.to(cursorRef.current, { scale: 1, duration: 0.3 })
            )
        })
    }, [isPointerFine])

    if (!isPointerFine) return null

    return (
        <div ref={cursorRef} style={{
            position: "fixed",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#910000",
            pointerEvents: "none",
            zIndex: 99999,
            transform: "translate(-50%, -50%)"
        }} />
    )
}