@AGENTS.md

# Stack d'animation et de scroll

Ce projet utilise **Lenis** pour le smooth scroll et **Framer Motion** pour les animations. Ces deux librairies travaillent ensemble : Lenis normalise le scroll natif du navigateur, Framer Motion exploite `scrollYProgress` (via `useScroll`) pour déclencher des transformations au fil du défilement.

## Conventions établies

- Le scroll est initialisé via Lenis dans les composants `'use client'` avec une boucle `requestAnimationFrame`. Il doit être détruit (`lenis.destroy()`) dans le cleanup du `useEffect`.
- Les animations scroll-driven utilisent `useScroll({ target, offset: ['start start', 'end end'] })` combiné à `useTransform` pour mapper `scrollYProgress` (0→1) vers des valeurs CSS (scale, opacity, translateY, etc.).
- Le range d'entrée de `useTransform` commence à `0.2` (pas `0`) pour laisser une phase de repos avant que l'animation démarre.
- Les conteneurs scroll-driven font `400vh` minimum pour que l'effet soit lisible.
- Sur mobile (≤ 768px), les effets scroll-driven sont désactivés ou remplacés par une version statique simplifiée.

## Intention narrative du projet

Le scroll raconte l'histoire et les compétences de la personne concernée par le portfolio de manière ludique et progressive. Chaque section doit s'enchaîner comme un récit visuel : on découvre qui est la personne, ce qu'elle sait faire, et ce qu'elle a réalisé, au rythme du défilement. Les animations ne sont pas décoratives — elles sont au service de cette narration.
