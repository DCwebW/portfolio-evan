import React from 'react'
import Image from 'next/image'

export type Demonstration = {
  nombre: number,
  titre: string,
  explication: string
  image: string,
  alt: string
}

// Le composant retourne uniquement la carte, sans section wrapper
const DemonstrationProcessus = ({ nombre, titre, explication, image, alt }: Demonstration) => {
  return (
    <div className="demo-item rounded-xl sm:rounded-2xl border border-solid border-[#fea9a9] p-2 sm:pt-3 sm:pl-3 sm:pr-1 sm:pb-2.5 flex flex-col gap-1.5 sm:gap-2.5 items-start justify-start bg-white overflow-hidden w-[calc(50%-6px)] sm:w-full sm:max-w-60 min-h-0 sm:min-h-100">
      {/* Numéro */}
      <div className="text-[#d40d0d] text-left font-['InriaSerif-Bold',sans-serif] text-2xl sm:text-4xl font-bold shrink-0">
        {String(nombre).padStart(2, '0')}
      </div>

      {/* Image */}
      <div className="self-stretch shrink-0 relative overflow-hidden aspect-255/200 rounded-lg">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 170px, 240px"
          className="object-cover"
        />
      </div>

      {/* Titre + explication */}
      <div className="flex flex-col gap-[3px] items-start justify-start self-stretch shrink-0">
        <div className="text-[#000000] text-left font-['InriaSerif-Bold',sans-serif] text-sm sm:text-xl font-bold leading-tight">
          {titre}
        </div>
        <div className="text-[#b49c9c] text-left font-['Inter-Regular',_sans-serif] text-[9px] sm:text-[10px] font-normal leading-relaxed self-stretch line-clamp-3">
          {explication}
        </div>
      </div>
    </div>
  )
}

export default DemonstrationProcessus