// Types d'ID de fenêtres
export type WindowId = "projects" | "videos" | "bio" | "contact";

// Clés valides d'icônes Lucide (type-only, pas d'import runtime)
export type LucideKey = keyof typeof import("lucide-react");

export type WindowConfig = {
  id: WindowId;
  label: string;
  description: string;
  accent: string;
  icon: LucideKey; // important: clé valide d'icône Lucide
};

export const WINDOW_CONFIGS: Record<WindowId, WindowConfig> = {
  projects: {
    id: "projects",
    label: "Projets",
    description: "Sélection de projets visuels et études de cas.",
    accent: "from-cyan-400/60 to-blue-500/60",
    icon: "Monitor",
  },
  videos: {
    id: "videos",
    label: "Vidéothèque",
    description: "Feed vidéo immersif façon TikTok.",
    accent: "from-emerald-400/60 to-lime-400/60",
    icon: "PlaySquare",
  },
  bio: {
    id: "bio",
    label: "Bio",
    description: "Animation 3D et biographie interactive.",
    accent: "from-purple-400/60 to-fuchsia-400/60",
    icon: "Sparkles", // ⚠️ 'Sparkle' n'existe pas, c'est 'Sparkles'
  },
  contact: {
    id: "contact",
    label: "Contact",
    description: "Terminal interactif pour échanger.",
    accent: "from-amber-400/60 to-orange-400/60",
    icon: "MessageCircle",
  },
};

export const DOCK_ORDER: WindowId[] = ["projects", "videos", "bio", "contact"];
