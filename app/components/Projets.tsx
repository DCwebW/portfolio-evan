'use client';
import { Carousel } from "./ProjetsComponents/Carousel";
import { BentoGrid } from "./ProjetsComponents/BentoGrid";
import { Cell } from "./ProjetsComponents/Cell";
import { DomainBlock } from "./ProjetsComponents/DomainBlock";
import { useEffect, useState } from 'react';
import { ListBlobResultBlob } from '@vercel/blob';
import { fetchImages } from '@/lib/fetchImages';
import { fetchVideos } from "@/lib/fetchVideos";

export type VideoInfo ={
  src: string;
  title : string;
  description: string; 
  
}


const VIDEO_META = [
  {
    title:"Chanson Felicia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  
  },
  {
    title:"Session Studio",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  
  },  {
    title:"Session Studio 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  
  },
  {
    title:"Entrainement Foot",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  
  },
  {
    title:"Training Arouna",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  
  },


]



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

  // const graphismewithInfo : ImageInfo[]= images.map((image,i)=>({
  //   src:image.url,
    
  // }))

  // const videosUrls: string[] = videos.map((video: ListBlobResultBlob)=> video.url)

  const videosWithInfo : VideoInfo[]= videos.map((video,i)=>({
    src:video.url,
    ...(VIDEO_META[i] ?? {title: `Vidéo ${i + 1}`, description:""})
  }))

  console.log("videosWithInfo:", videosWithInfo);
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
        <DomainBlock tag="Projets — 02" label="Vidéo" allprojects="Voir tous les projets vidéos">
          <BentoGrid>
            {videosWithInfo.map((video, i) => (
              <Cell key={video.src} featured={i === 0} info={video}>
                <video src={video.src} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              </Cell>
            ))}
          </BentoGrid>
        </DomainBlock>
      </div>
    </section>
  );
}