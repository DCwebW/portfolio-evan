import HeroSection from "./components/HeroSection";
import ParallaxSection from "./components/ParallaxSection";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroSection />

      {/* PARALLAX */}
      <ParallaxSection />

      {/* TRUSTED / EXPÉRIENCES */}
      <section id="trusted">
        <div className="trusted-inner">
          <p className="trusted-label">Expériences<br />professionnelles</p>
          <div className="trusted-logos">
            <div className="trusted-logo">
              <div className="t-icon">U</div>
              Union Internationale Architecte
            </div>
            <div className="trusted-logo">
              <div className="t-icon">F</div>
              Freddy Conduite
            </div>
            <div className="trusted-logo">
              <div className="t-icon">L</div>
              Label Collector Music
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-top">
          <div>
            <span className="tag-red">Behind the Designs</span>
            <h2 className="section-title">
              Shaping<br />Experiences That<br />Make Life Simpler
            </h2>
          </div>
          <div className="about-right">
            <p>
              Je suis un chargé de communication diplômé d&apos;un Mastère en Marketing
              Digital et Social Media. Je construis des stratégies qui connectent
              les marques à leurs audiences.
            </p>
            <p>
              Disponible en poste et en freelance, je combine vision créative et
              approche data-driven pour des résultats mesurables.
            </p>
            <a className="btn-pill" href="#footer">Get in touch →</a>
          </div>
        </div>

        <div className="about-images">
          <div className="about-img-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/evan-photo.jpg" alt="Communication" />
            <div className="img-label">Communication</div>
          </div>
          <div className="about-img-card">
            <div className="placeholder-img">music<br />production</div>
            <div className="img-label">Music Production</div>
          </div>
          <div className="about-img-card">
            <div className="placeholder-img">direction<br />créative</div>
            <div className="img-label">Direction Créative</div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="projects-header">
          <h2>Projects</h2>
        </div>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-num">01</div>
            <div className="project-name">UIA</div>
            <div className="project-role">
              Assistant Communication — gestion des relations médias, stratégie
              digitale, rédaction de contenus et newsletters.
            </div>
            <div className="project-period">
              <span className="project-tag">2023 — 2025</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-num">02</div>
            <div className="project-name">Freddy Conduite</div>
            <div className="project-role">
              Chargé de Communication — développement de la présence digitale,
              community management, campagnes social media.
            </div>
            <div className="project-period">
              <span className="project-tag">2022 — 2023</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-num">03</div>
            <div className="project-name">Collector Music</div>
            <div className="project-role">
              Producteur d&apos;Artiste — production musicale, développement d&apos;image
              artistique, promotion digitale et management.
            </div>
            <div className="project-period">
              <span className="project-tag">Personnel</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer">
        <div className="footer-inner">
          <span className="footer-logo">Evan Mukendi</span>
          <div className="footer-contact">
            <a href="mailto:evanmuks@gmail.com">evanmuks@gmail.com</a>
            <a href="tel:0688019050">06-88-01-90-50</a>
          </div>
          <span className="footer-copy">© 2026 Evan Mukendi</span>
        </div>
      </footer>
    </>
  );
}
