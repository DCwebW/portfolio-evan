'use client';
import { Carousel } from "./ProjetsComponents/Carousel";
import { BentoGrid } from "./ProjetsComponents/BentoGrid";
import { Cell } from "./ProjetsComponents/Cell";
import { DomainBlock } from "./ProjetsComponents/DomainBlock";
import { useState } from 'react';
import type { Project } from "@/lib/projects";
import { VideoCarousel } from "./ProjetsComponents/VideoCarousel";
import { VideoModal } from "./ProjetsComponents/VideoModal";

export type VideoInfo = {
  src: string;
  title: string;
  description: string;
};

type ProjetsProps = {
  graphisme: Project[];
  videos: Project[];
  prisesDeVue: Project[];
};

export default function Projets({ graphisme, videos, prisesDeVue }: ProjetsProps) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  const graphismeImages = graphisme.map((p) => ({
    src: p.media_url,
    title: p.title,
    description: p.description,
  }));

  return (
    <section
      id="projets"
      className="bg-(--dark) pt-16 md:pt-20 lg:pt-[100px] pb-16 md:pb-20 lg:pb-[120px] relative z-0"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 md:gap-16 lg:gap-24 px-5 md:px-8 lg:px-[52px]">
        <DomainBlock tag="Projets — 01" label="Graphisme" >
          <Carousel images={graphismeImages} />
        </DomainBlock>
        <DomainBlock tag="Projets — 02" label="Vidéo" >
          <BentoGrid>
            {videos.map((video, i) => (
              <Cell
                key={video.id}
                featured={video.featured}
                info={{ src: video.media_url, title: video.title, description: video.description }}
                onOpen={() => setSelectedVideoIndex(i)}
              >
                <video src={video.media_url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              </Cell>
            ))}
          </BentoGrid>
          <VideoModal
            items={videos.map((v) => ({ src: v.media_url, title: v.title, description: v.description }))}
            currentIndex={selectedVideoIndex}
            onClose={() => setSelectedVideoIndex(null)}
            onNavigate={setSelectedVideoIndex}
          />
        </DomainBlock>
        <DomainBlock tag="Projets — 03" label="Prises de vue" >
          <VideoCarousel videos={prisesDeVue} />
        </DomainBlock>
      </div>
    </section>
  );
}
