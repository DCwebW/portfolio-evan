'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CarouselCell } from "./CarouselCell";


export type ImageInfo={
  src:string, 
  title: string;
  description: string 
}


const IMAGE_META=[
  {
title : "Fally Ipupa - Promotion concert",
description: "Réalisation d’un visuel promotionnel autour de l’univers de Fally Ipupa, pensé pour mettre en avant l’élégance, la présence scénique et l’énergie de l’artiste. Le travail graphique s’appuie sur une esthétique moderne et immersive afin de créer un support visuel fort, adapté à la communication événementielle et musicale."
  },
  
  {
    title:"Félicia - Communication artistique",
    description:"Création d’un support visuel destiné à accompagner la communication artistique et médiatique de Félicia."
  },
  {title:"Félicia - Communication artistique",
    description:"Création d’un support visuel destiné à accompagner la communication artistique et médiatique de Félicia."
  },
  {title:"Freddy Conduite",
    description:""
  },
  {title:"Freddy Conduite",
    description:""
  },
  {title:"La Fouine - Héritage & retour à Bercy ",
    description:"Création d’un visuel retraçant le parcours musical de La Fouine à travers les différentes époques de sa carrière et les projets qui ont marqué le rap français. "
  },
  {title:"Lil Durk - Mixtape",
    description:"Cette création s’inspire directement de l’univers visuel de Lil Durk et du collectif OTF (Only The Family)."
  },
  {title:"Mbappé - Signature au Real Madrid",
    description:"Cette affiche a été réalisée à l’occasion de la signature de Kylian Mbappé au Real Madrid."
  },
  {title:"Pierre Feret - Joaillerie",
    description:""
  },
  {title:"Pierre Feret - Joaillerie",
    description:""
  },
  {title:"Pierre Feret - Joaillerie",
    description:""
  },
  {title:"Pierre Feret - Joaillerie",
    description:""
  },
  {title:"S-Pri Noir - La clé du chateau",
    description:"Cette création a été conçue pour accompagner le single La clé du château. Le concept visuel s’articule autour de la symbolique de la clé, utilisée ici comme élément central afin de renforcer l’identité et le sens du titre."
  },
  {title:"Tiakola",
    description:"Pour cette création réalisée autour de Tiakola et de son projet Melo, j’ai imaginé une direction artistique inspirée des codes visuels du documentaire. L’objectif était de concevoir un visuel capable de retranscrire l’univers de l’artiste, son identité et l’atmosphère qui entoure son image."
  },
  
]

export function Carousel({ images }: { images: string[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const imagesWithInfo: ImageInfo[] = images.map((src,i)=>({
    src,
    ...(IMAGE_META[i] ?? {title:`Image ${i+1}`, description:""})
  }))

  const row1 = imagesWithInfo.filter((_, i) => i % 2 === 0);
  const row2 = imagesWithInfo.filter((_, i) => i % 2 === 1);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    const wrapper = wrapperRef.current;
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    if (!wrapper || !r1 || !r2) return;

    tweensRef.current = [
      gsap.to(r1, { x: "-50%", duration: 60, ease: "none", repeat: -1, paused: true }),
      gsap.to(r2, { x: "-50%", duration: 75, ease: "none", repeat: -1, paused: true }),
    ];

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => tweensRef.current.forEach(t => t.play()),
      onLeave: () => tweensRef.current.forEach(t => t.pause()),
      onEnterBack: () => tweensRef.current.forEach(t => t.play()),
      onLeaveBack: () => tweensRef.current.forEach(t => t.pause()),
    });

    wrapper.onmouseenter = () => tweensRef.current.forEach(t => t.pause());
    wrapper.onmouseleave = () => tweensRef.current.forEach(t => t.play());
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} className="flex flex-col gap-2 py-6" style={{ overflowX: "clip" }}>
      <div ref={row1Ref} className="flex gap-2" style={{ width: "max-content" }}>
        {[...row1, ...row1].map((item, i) => <CarouselCell key={i} src={item.src} info={item} />)}
      </div>
      <div ref={row2Ref} className="flex gap-2" style={{ width: "max-content" }}>
        {[...row2, ...row2].map((item, i) => <CarouselCell key={i} src={item.src} info={item}/>)}
      </div>
    </div>
  );
}
