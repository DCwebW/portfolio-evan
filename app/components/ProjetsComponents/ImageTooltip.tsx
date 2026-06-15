'use client';
import { forwardRef } from 'react'
import type { ImageInfo } from './Carousel'

export const ImageTooltip = forwardRef<HTMLDivElement, { info: ImageInfo }>(
  ({ info }, ref) => {
    return (
      <div
        ref={ref}
        className="tooltip-desktop-only absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 pointer-events-none"
        style={{ opacity: 0, transform: "translateY(12px)" }}
      >
        <h4 className="text-white font-bold text-sm leading-tight mb-1">{info.title}</h4>
        <p className="text-white/70 text-xs leading-relaxed line-clamp-2 mb-2">
          {info.description}
        </p>
        <span className="text-red-500 text-xs font-medium">Voir le projet</span>
      </div>
    );
  }
)

ImageTooltip.displayName = "ImageTooltip"