'use client';
import { Carousel } from "./ProjetsComponents/Carousel";
import { BentoGrid } from "./ProjetsComponents/BentoGrid";
import { Cell } from "./ProjetsComponents/Cell";
import { DomainBlock } from "./ProjetsComponents/DomainBlock";
import { useEffect, useState } from 'react';
import { ListBlobResultBlob } from '@vercel/blob';
import { fetchImages } from '@/lib/fetchImages';
import { fetchVideos } from "@/lib/fetchVideos";

const VIDEOS = [
  "/Vidéo/v24044gl0000d6o0fmfog65rn7j39g60.mp4",
  "/Vidéo/v24044gl0000d7hjrnnog65mmrg32fn0.mp4",
  "/Vidéo/v24044gl0000d67hfv7og65qe65qako0.mp4",
  "/Vidéo/sequence - (9x16).mp4",
  "/Vidéo/3378febdf43243e5acb4d9583bb6354b.mov",
];

export default function Projets() {
  const [images, setImages] = useState<ListBlobResultBlob[]>([]);
  const [videos, setVideos] = useState<ListBlobResultBlob[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages()
      .then(setImages)
      .catch((err: Error) => setError(err.message));

    fetchVideos()
    .then(setVideos)
    .catch((err: Error) => setError(err.message));
  }, []);

  const graphismeUrls: string[] = images.map((img: ListBlobResultBlob) => img.url);
  const videosUrls: string[] = videos.map((video: ListBlobResultBlob)=> video.url)

  return (
    <section
      id="projets"
      className="bg-(--dark) pt-16 md:pt-20 lg:pt-[100px] pb-16 md:pb-20 lg:pb-[120px] relative z-0"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 md:gap-16 lg:gap-24 px-5 md:px-8 lg:px-[52px]">
        <DomainBlock tag="Projets — 01" label="Graphisme" allprojects="Voir tous les projets graphisme">
          {error && <p className="text-red-500">Erreur : {error}</p>}
          <Carousel images={graphismeUrls} />
        </DomainBlock>
        <DomainBlock tag="Projets — 02" label="Vidéo" allprojects="Voir tous ls projets vidéos">
          <BentoGrid>
            {videosUrls.map((src, i) => (
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