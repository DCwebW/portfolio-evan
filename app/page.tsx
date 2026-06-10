"use client"

import HeroSection from "./components/HeroSection";
import ParallaxSection from "./components/ParallaxSection";
import Projets from "./components/Projets";
import Experiences from "./components/Experiences";
import Citation from "./components/Citation";
import ContactButton from "./components/ContactButton";
import Introduction from "./components/Introduction";
import DemonstrationProcessus from "./components/Demonstration/DemonstrationProcessus";
import ListeDemonstration from "./components/Demonstration/ListeDemonstration";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import OutilsMaitrises from "./components/OutilsMaitrises";


export default function Home() {


  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* PARALLAX */}
      <ParallaxSection />

      {/* ABOUT */}
      {/* <section
        id="about"
        className="bg-[var(--dark)] pt-16 md:pt-20 lg:pt-[120px] px-5 md:px-8 lg:px-[52px] pb-16 md:pb-20 lg:pb-[100px] -mt-8 relative z-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-[1200px] mx-auto lg:mb-16">
          <div>
            <span className="inline-block text-[11px] font-semibold text-[var(--red)] uppercase tracking-[2px] mb-6">
              Entre Vidéo, Design et Marketing Digital
            </span>
            <h2 className="font-display font-black text-[clamp(28px,8vw,68px)] md:text-[clamp(36px,6vw,68px)] leading-[0.95] tracking-[-1px] md:tracking-[-1.5px] text-white">
              Créer<br />des messages <br />qui donnent du sens et de la visibilité 
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pt-14">
            <p className="text-base font-light text-white/60 leading-[1.85]">
              Je suis un chargé de communication diplômé d&apos;un Mastère en Marketing
              Digital et Social Media. Je construis des stratégies qui connectent
              les marques à leurs audiences.
            </p>
            <p className="text-base font-light text-white/60 leading-[1.85]">
              Disponible en poste et en freelance, je combine vision créative et
              approche data-driven pour des résultats mesurables.
            </p>
           
            <ContactButton color={"blanc"}/>
          </div>
        </div>

      </section> */}

      <Introduction/>

      {/* PROJETS */}
      <Projets />

      {/* EXPÉRIENCES */}
      <Experiences />
      <Citation/>
      <ListeDemonstration/>

      {/* CALL TO ACTION */}
      <CallToAction />

      {/* OUTILS MAÎTRISÉS */}
      <OutilsMaitrises />

      {/* FOOTER */}
      <Footer />
    </>
  );
}
