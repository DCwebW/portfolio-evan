"use client"

import React from 'react'
import ContactButton from './ContactButton'

function CallToAction() {
  return (
    <section className=" px-5 md:px-8 lg:px-13 pb-16 md:pb-20 lg:pb-24 mt-20 pt-3">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col  sm:flex-row gap-4 md:gap-5 items-stretch">

          {/* Grande carte — image de fond à remplacer */}
          <div
            className="rounded-[20px] relative overflow-hidden h-[240px] sm:h-[280px] md:h-[500px] flex-1"
            style={{
              backgroundImage: 'url(/ImageVille.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" /> */}
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 md:px-6 md:pb-6 flex flex-col gap-3">
              <div className="w-full h-[4px] bg-(--red)/80" />
              <p className="text-white text-center font-['GildaDisplay-Regular',_sans-serif] text-xl sm:text-2xl md:text-[32px] font-normal leading-snug">
                Prenez l&apos;avantage grâce à une communication efficace
              </p>
            </div>
          </div>

          {/* Petite carte — image de fond à remplacer */}
          <div
            className="rounded-[20px]  relative overflow-hidden h-[200px] sm:h-[280px] md:h-[500px] sm:w-50 md:w-70 sm:shrink-0"
            style={{
              backgroundImage: 'url(/ImageDaryl.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
            <div className="absolute bottom-4 left-12 justify-center flex ">
              <ContactButton color="rouge" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CallToAction
