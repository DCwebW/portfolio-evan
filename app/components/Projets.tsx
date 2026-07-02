'use client';
import { Carousel } from "./ProjetsComponents/Carousel";
import { BentoGrid } from "./ProjetsComponents/BentoGrid";
import { Cell } from "./ProjetsComponents/Cell";
import { DomainBlock } from "./ProjetsComponents/DomainBlock";
import { useEffect, useState } from 'react';
import { fetchVideos, type R2Video } from "@/lib/fetchVideos";
import { fetchPrisesDeVue } from "@/lib/fetchPrisesDeVue";
import { GRAPHISME_IMAGES } from "@/lib/graphisme";
import { VideoCarousel } from "./ProjetsComponents/VideoCarousel";
import { VideoModal } from "./ProjetsComponents/VideoModal";

export type VideoInfo ={
  src: string;
  title : string;
  description: string;
}


const VIDEO_META = [
  {
    title:" Felicia (interprétation d’un extrait inédit)",
    description: "Cette vidéo a été réalisée pour l’artiste Felicia à l’occasion de l’interprétation d’un extrait de son prochain single.L’objectif était de créer une ambiance immersive et artistique mettant en valeur son univers musical, son expression scénique et l’émotion transmise à travers sa performance.",
  },
  {
    title: "Nemours Basket Club - Gala Game",
    description:"Vidéo réalisée pour un match de Gala organisé par le Nemours Basket Club au Gymnase Roux"
  },
  {
    title:"Mitcho - Session Studio",
    description: "Cette vidéo a été tournée pendant une séance studio de la chanteuse Michou afin de montrer les coulisses de l’enregistrement et son immersion dans le processus créatif.À travers des images spontanées et une ambiance intimiste, cette réalisation met en lumière le travail artistique, l’énergie du studio et l’authenticité du moment."
  },
  {
    title:"Félicia - Session Studio",
    description: "Cette vidéo plonge au cœur d’une séance studio de l’artiste Felicia pendant l’enregistrement de ses morceaux.L’objectif était de montrer les coulisses de la création musicale en mettant en avant l’ambiance du studio, le travail artistique et l’authenticité du processus d’enregistrement.",
  },
  {
    title:" Amewoui (préparation physique)",
    description: "Cette vidéo met en avant la préparation physique du joueur de football Amewoui à travers une réalisation dynamique centrée sur l’effort, la discipline et la performance sportive.L’objectif était de retranscrire l’intensité de ses entraînements tout en valorisant son engagement et son rythme de préparation.",
  },
  {
    title:"Training Arouna",
    description: "Cette vidéo a été réalisée lors d’un entraînement du joueur Harouna du Nemours Basketball Club.L’objectif était de capturer l’intensité des exercices, la concentration du joueur et l’énergie propre à la pratique du basketball.",
  },
];

export default function Projets() {
  const [videos, setVideos] = useState<R2Video[]>([]);
  const [prisesDeVue, setPrisesDeVue] = useState<R2Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchVideos()
      .then(setVideos)
      .catch((err: Error) => setError(err.message));

    fetchPrisesDeVue()
      .then(setPrisesDeVue)
      .catch((err: Error) => setError(err.message));
  }, []);

  const videosWithInfo: VideoInfo[] = videos.map((video, i) => ({
    src: video.url,
    ...(VIDEO_META[i] ?? { title: video.key, description: "" })
  }));
  return (
    <section
      id="projets"
      className="bg-(--dark) pt-16 md:pt-20 lg:pt-[100px] pb-16 md:pb-20 lg:pb-[120px] relative z-0"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12 md:gap-16 lg:gap-24 px-5 md:px-8 lg:px-[52px]">
        <DomainBlock tag="Projets — 01" label="Graphisme" >
          {error && <p className="text-red-500">Erreur : {error}</p>}
          <Carousel images={GRAPHISME_IMAGES} />
        </DomainBlock>
        <DomainBlock tag="Projets — 02" label="Vidéo" >
          <BentoGrid>
            {videosWithInfo.map((video, i) => (
              <Cell key={video.src} featured={i === 0} info={video} onOpen={() => setSelectedVideoIndex(i)}>
                <video src={video.src} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              </Cell>
            ))}
          </BentoGrid>
          <VideoModal
            items={videosWithInfo}
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