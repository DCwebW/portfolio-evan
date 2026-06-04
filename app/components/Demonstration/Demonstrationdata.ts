import { Demonstration } from "./DemonstrationProcessus";



export const demonstrationData: Demonstration[] = [
  {
    nombre: 1,
    titre: "Analyse",
    explication:
      "Analyser le projet, le marché , voir les forces et faiblesses",
    image: "/AnalyseProcessus.png", 
    alt:"Illustration de l'étape d'analyse",
  },
  {
    nombre: 2,
    titre: "Diagnostic",
    explication:
      "Etat des lieux , et constat de la position du projet dans son secteur ou environnement ",
    image: "/DiagnosticProcessus.png", 
    alt:"Illustration de l'étape de diagnostic"
  },
  {
    nombre: 3,
    titre: "Plan Stratégique",
    explication:
      "Etablissement d'une stratégie afin de définir les objectifs, et les actions à mettre en place",
    image: "/StratégieProcessus.png", 
    alt:"Illustration de l'étape du plan stratégique",
  },
  {
    nombre: 4,
    titre: "Pratique",
    explication:
      "Action sur le terrain en fonction de la stratégie mise en place",
    image: "/PratiqueProcessus.png",
    alt: "Illustration de l'étape de mise en pratique",
  },
  {
    nombre: 5,
    titre: "Bilan",
    explication:
      "Bilan pour voir les résultats à différentes periodes que ca soit sur du court-terme ou du long-terme",
    image: "/BilanProcessus.png",
    alt: "Illustration de l'étape de bilan",
  },
];