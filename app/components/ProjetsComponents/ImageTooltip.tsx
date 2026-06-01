'use client';
import React, { forwardRef, useEffect, useState } from 'react'
import type { ImageInfo } from './Carousel'
import { createPortal } from 'react-dom'

export const  ImageTooltip= forwardRef<HTMLDivElement,{info:ImageInfo}>(
  
({info},ref)=> {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(
    <div
    ref={ref}
    className='fixed top-0 left-0 z-50 pointer-events-none'
    style={{
      opacity:0,
      transform:"translate(0px, 0px) scale(0.9)",
      width: "220px"
    }}>
     <div className="bg-black/85 backdrop-blur-sm rounded-xl p-4">
  <h4 className="text-white font-bold text-sm leading-tight mb-2">{info.title}</h4>
  <p className="text-white/70 text-xs leading-relaxed mb-3">
    {info.description.length > 60
      ? info.description.slice(0, 60) + "..."
      : info.description
    }
  </p>
  <span className="text-red-500 text-xs font-medium">
    Cliquez sur l'image pour voir le projet
  </span>
</div>
      
      </div>,
      document.body
  )
}
)

ImageTooltip.displayName="ImageTooltip"