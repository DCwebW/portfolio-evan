"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EXPERIENCES = [
  { initial: "U", name: "Union Internationale Architecte",logo:"/Logos/Union-Architectes-LogoNoir-NoBG.png",alt:"UIA-Image" },
  { initial: "F", name: "Freddy Conduite", logo:"/Logos/Freddy-Conduite-LogoNoir-NoBG.png", alt:"FreddyConduite-Image" },
  { initial: "L", name: "Label Collector Music", logo:"/Logos/Collector-Music-Logo.png", alt:"CM-Image" },
];

export default function Experiences() {
  const trustedRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const personalphotoRef=useRef<HTMLDivElement>(null)
  const tlref=useRef<GSAPTimeline>(null)
  const decorationPhoto=useRef<HTMLDivElement>(null)
  const decorationPhoto2=useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // --- Marquee continu ---
    gsap.to(marqueeTrackRef.current, {
      x: "-50%",
      ease: "none",
      duration: 22,
      repeat: -1,
    });

   const photoanimation= gsap.timeline()
   .from(personalphotoRef.current?.children ?? [],{
      y:-100,
      opacity:0,
      duration:2,
      stagger:{amount:1, from:"edges"},
      ease:"power2.inOut"
    })
   
  
    ScrollTrigger.create({
      trigger:personalphotoRef.current,
      animation:photoanimation,
      start:"top 100px",
      end:"+=200px",
      pin:true,
     scrub:1,

      markers:true
    })
  });

  return (
    <>
      {/* TRUSTED / EXPÉRIENCES — MARQUEE */}
      <section
        id="trusted"
        ref={trustedRef}
        className="bg-[var(--light)] -mt-12 pt-10 md:pt-14 pb-10 md:pb-14 relative z-0 rounded-b-[32px] overflow-hidden"
      >
        <p className="text-[11px] font-semibold text-black/40 uppercase tracking-[2px] text-center mb-6 md:mb-8">
         Ils m&apos;ont fait confiance
        </p>
        <div className="overflow-hidden">
          <div ref={marqueeTrackRef} className="flex items-center" style={{ width: "max-content" }}>
            {[...EXPERIENCES, ...EXPERIENCES].map(({ initial, name,logo,alt }, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 px-6 md:px-10">
                {/* <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-black flex items-center justify-center text-xs md:text-[13px] font-bold text-black flex-shrink-0">
                  {initial}
                </div>
                <span className="font-display font-black text-[clamp(20px,4vw,42px)] tracking-[-1px] text-black whitespace-nowrap">
                  {name}
                </span>
                <span className="text-black/20 text-2xl md:text-[32px] font-light ml-4 md:ml-6">·</span> */}
                <Image src={logo} alt={alt} width={180} height={180}/>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="bg-[var(--light)] , h-auto ">
  <div className="flex  w-full mt-28  personalphoto" >

<div className=" flex p-5 w-full items-center justify-center gap-3 mb-20" ref={personalphotoRef} >
{/* <div className="h-10 w-35 bg-red-100 absolute z-1 top-3.5 left-28" ref={decorationPhoto}></div>
<div className="h-10 w-2xs bg-[var(--red)] absolute z-1 top-60 right-28" ref={decorationPhoto}></div> */}
   <Image src={'/PhotoPortrait3.jpg'} alt="" width={400} height={700} className="rounded-2xl "/>
    <Image src={'/PhotoPortrait2.jpg'} alt="" width={400} height={700} className="rounded-2xl "/>
<Image src={'/PhotoPortrait1.jpg'} alt="" width={400} height={700} className="rounded-2xl "/>
</div>
   
  </div>

</section>
      
    </>
  );
}
