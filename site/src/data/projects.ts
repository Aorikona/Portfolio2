export type ProjectCategory = "Branding" | "3D" | "Web" | "Motion";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  excerpt: string;
  cover?: string | null;
  coverGradient: string;
  tags: string[];
  year: string;
};

export const PROJECTS: Project[] = [
  {
    id: "neon-cosmos",
    title: "Neon Cosmos",
    category: "3D",
    excerpt:
      "Expérience spatiale interactive avec particules réactives au mouvement.",
    cover: null,
    coverGradient:
      "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(45,212,191,0.35))",
    tags: ["Three.js", "Spline", "Shader"],
    year: "2024",
  },
  {
    id: "aura-dashboard",
    title: "Aura Dashboard",
    category: "Web",
    excerpt:
      "Dashboard SaaS orienté data design pour startups deep-tech et fintech.",
    cover: null,
    coverGradient:
      "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(14,165,233,0.35))",
    tags: ["Next.js", "Design System", "Framer Motion"],
    year: "2025",
  },
  {
    id: "kinetic-brand",
    title: "Kinetic Brand System",
    category: "Branding",
    excerpt:
      "Identité modulaire temps réel pour un studio de danse contemporaine.",
    cover: null,
    coverGradient:
      "linear-gradient(135deg, rgba(236,72,153,0.30), rgba(244,114,182,0.35))",
    tags: ["After Effects", "Motion", "Creative Coding"],
    year: "2023",
  },
  {
    id: "luma-portfolio",
    title: "Luma Portfolio",
    category: "Web",
    excerpt:
      "Portfolio immersif multi-langue optimisé SEO avec micro-interactions.",
    cover: null,
    coverGradient:
      "linear-gradient(135deg, rgba(56,189,248,0.32), rgba(129,140,248,0.35))",
    tags: ["Next.js", "i18n", "Accessibility"],
    year: "2025",
  },
  {
    id: "void-runner",
    title: "Void Runner",
    category: "Motion",
    excerpt:
      "Trailer animé 3D temps réel pour jeu vidéo futuriste, pipeline Unreal.",
    cover: null,
    coverGradient:
      "linear-gradient(135deg, rgba(251,191,36,0.30), rgba(244,114,182,0.35))",
    tags: ["Unreal Engine", "Cinematics", "Sound Design"],
    year: "2024",
  },
];

export const PROJECT_FILTERS: ProjectCategory[] = [
  "Web",
  "3D",
  "Branding",
  "Motion",
];

