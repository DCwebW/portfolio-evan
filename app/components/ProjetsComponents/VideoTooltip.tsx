'use client'
import type { VideoInfo } from "../Projets"
import { forwardRef } from "react"


export const VideoTooltip= forwardRef<HTMLDivElement,{info: VideoInfo}>(
    ({info}, ref)=> {
    return (
        <div
        ref={ref}
        className="
        tooltip-desktop-only
        absolute bottom-4 left-4 right-4
        bg-black/80 backdrop-blur-sm
        rounded-xl p-4
        "
        style={{opacity:0, transform: "translateY(12px"}}>
            <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-white font-bold text-sm leading-tight">
{info.title}
                </h4>
<p className="text-white/70 text-xs leading-relaxed line-clamp-2">{info.description}</p>


            </div>
            <div className="flex items-center justify-center">
                <span className="text-red-700 hover:underline" > Voir projet</span>
            </div>

        </div>
    )
    }
)

VideoTooltip.displayName="VideoTooltip"
