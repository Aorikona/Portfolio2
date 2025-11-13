export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
  highlights: string[];
};

export const TIMELINE: TimelineEvent[] = [
  {
    id: "now",
    year: "2025",
    title: "Lead Creative Developer freelance",
    description:
      "Accompagnement de studios et startups sur des expériences immersives 3D/2D à haute performance.",
    highlights: [
      "Conception de pipelines temps réel Spline ↔️ Next.js",
      "Optimisation Lighthouse 95+ sur projets grands comptes",
      "Animation d’ateliers motion & creative coding",
    ],
  },
  {
    id: "2023",
    year: "2023 - 2024",
    title: "Senior Frontend Engineer @ XR Collective",
    description:
      "Création d’une suite d’outils internes pour expériences VR/AR web, intégrant WebXR et WebGPU.",
    highlights: [
      "Mise en place architecture micro-frontends",
      "Pilotage d’une équipe de 4 développeurs",
      "Déploiement CI/CD multi régions",
    ],
  },
  {
    id: "2021",
    year: "2021 - 2022",
    title: "Creative Technologist @ MotionLab",
    description:
      "Exploration d’interfaces génératives et prototypes R&D mêlant machine learning et motion design.",
    highlights: [
      "Prix CSS Design Awards 2021",
      "Partenariats avec agences internationales",
      "Conférences autour de WebGL et UX sonore",
    ],
  },
  {
    id: "2018",
    year: "2018 - 2020",
    title: "UI Engineer @ Digital Factory",
    description:
      "Conception d’applications web robustes pour scale-ups, avec un focus design system et accessibilité.",
    highlights: [
      "Création d’un design system multi-marques",
      "Formateur interne TypeScript & tests E2E",
      "Taux d’engagement utilisateur +35%",
    ],
  },
];

