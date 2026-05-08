'use client';

import { Carousel } from "./ProjetsComponents/Carousel";
import { BentoGrid } from "./ProjetsComponents/BentoGrid";
import { Cell } from "./ProjetsComponents/Cell";
import { DomainBlock } from "./ProjetsComponents/DomainBlock";

const GRAPHISME = [
  "/Graphisme/IMG_6033.jpeg",
  "/Graphisme/IMG_6034.jpeg",
  "/Graphisme/IMG_6035.jpeg",
  "/Graphisme/IMG_6036.jpeg",
  "/Graphisme/IMG_6037.jpeg",
  "/Graphisme/IMG_6038.jpeg",
  "/Graphisme/IMG_6039.jpeg",
  "/Graphisme/IMG_6040.png",
  "/Graphisme/IMG_6095.jpeg",
  "/Graphisme/IMG_6096.jpeg",
  "/Graphisme/IMG_6097.jpeg",
  "/Graphisme/IMG_6098.jpeg",
  "/Graphisme/IMG_6099.jpeg",
  "/Graphisme/IMG_6101.jpeg",
];

const VIDEOS = [
  "/Vidéo/v24044gl0000d6o0fmfog65rn7j39g60.mp4",
  "/Vidéo/v24044gl0000d7hjrnnog65mmrg32fn0.mp4",
  "/Vidéo/v24044gl0000d67hfv7og65qe65qako0.mp4",
  "/Vidéo/sequence - (9x16).mp4",
  "/Vidéo/3378febdf43243e5acb4d9583bb6354b.mov",
];

export default function Projets() {
  return (
    <section
      id="projets"
      className="bg-(--dark) pt-16 md:pt-20 lg:pt-[100px] pb-16 md:pb-20 lg:pb-[120px] relative z-0"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 md:gap-16 lg:gap-24 px-5 md:px-8 lg:px-[52px]">

        <DomainBlock tag="Projets — 01" label="Graphisme">
          <Carousel images={GRAPHISME} />
        </DomainBlock>

        <DomainBlock tag="Projets — 02" label="Vidéo">
          <BentoGrid>
            {VIDEOS.map((src, i) => (
              <Cell key={src} featured={i === 0}>
                <video src={src} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              </Cell>
            ))}
          </BentoGrid>
        </DomainBlock>

      </div>
    </section>
  );
}
