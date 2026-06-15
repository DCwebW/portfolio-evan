'use client';

import React from 'react';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Architecture moderne',
  },
  {
    src: '/AnimationParallax/CreationdeContenu.png',
    alt: 'Paysage urbain au coucher du soleil',
    label: 'Création de Contenu',
  },
  {
    src: '/AnimationParallax/GestionReseauxSociaux.jpg',
    alt: 'Motif géométrique abstrait',
    label: 'Gestion Réseaux Sociaux',
  },
  {
    src: '/AnimationParallax/DirectionCreative.jpeg',
    alt: 'Paysage de montagne',
    label: 'Direction Créative',
  },
  {
    src: '/AnimationParallax/StrategieDigitale.jpg',
    alt: 'Design minimaliste',
    label: 'Stratégie Digitale',
  },
  {
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Vagues et plage',
    label: 'Communication',
  },
  {
    src: '/AnimationParallax/VideoEtGraphisme.jpg',
    alt: 'Forêt et lumière',
    label: 'Vidéo et Graphisme',
  },
];

export default function ParallaxSection() {
  return <ZoomParallax images={images} />;
}
