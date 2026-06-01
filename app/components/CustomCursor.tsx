"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

// Cacher le curseur natif
// Dans ton CSS global :
// * { cursor: none; }

export default function CustomCursor() {
    const cursorRef = useRef(null)

    useGSAP(() => {
        globalThis.addEventListener("mousemove", (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power3.out"
            })
        })

        // Grossir au hover d'un lien
        document.querySelectorAll("a, button").forEach((el) => {
            el.addEventListener("mouseenter", () =>
                gsap.to(cursorRef.current, { scale: 2.5, duration: 0.3 })
            )
            el.addEventListener("mouseleave", () =>
                gsap.to(cursorRef.current, { scale: 1, duration: 0.3 })
            )
        })
    })

    return (
        <div ref={cursorRef} style={{
            position: "fixed",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#910000",
            pointerEvents: "none",   // ← important, sinon il bloque les clics
            zIndex: 99999,
            transform: "translate(-50%, -50%)"
        }} />
    )
}