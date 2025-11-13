export type VideoItem = {
  id: string;
  title: string;
  src: string;
  poster: string;
  category: "Prototype" | "Behind the scenes" | "Live";
  tags: string[];
  duration: string;
};

export const VIDEO_FEED: VideoItem[] = [
  {
    id: "meta-waves",
    title: "Meta Waves — Exploration shader en temps réel",
    src: "https://cdn.coverr.co/videos/coverr-neon-lights-6130/1080p.mp4",
    poster: "https://cdn.coverr.co/images/coverr-neon-lights-6130/poster.jpg",
    category: "Prototype",
    tags: ["Shader", "Three.js"],
    duration: "00:32",
  },
  {
    id: "bio-scan",
    title: "Bio Scan — Capture volumétrique du personnage 3D",
    src: "https://cdn.coverr.co/videos/coverr-heart-of-the-jellyfish-6935/1080p.mp4",
    poster:
      "https://cdn.coverr.co/images/coverr-heart-of-the-jellyfish-6935/poster.jpg",
    category: "Behind the scenes",
    tags: ["Capture", "Spline"],
    duration: "00:45",
  },
  {
    id: "ui-burst",
    title: "UI Burst — Prototype micro-interactions dashboard",
    src: "https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-7335/1080p.mp4",
    poster:
      "https://cdn.coverr.co/images/coverr-typing-on-a-laptop-7335/poster.jpg",
    category: "Prototype",
    tags: ["Framer Motion", "Next.js"],
    duration: "00:27",
  },
  {
    id: "bio-loop",
    title: "Bio Loop — Animation finale du personnage",
    src: "https://cdn.coverr.co/videos/coverr-earth-globe-slow-rotation-1161/1080p.mp4",
    poster:
      "https://cdn.coverr.co/images/coverr-earth-globe-slow-rotation-1161/poster.jpg",
    category: "Live",
    tags: ["Spline", "Animation"],
    duration: "00:40",
  },
  {
    id: "motion-feed",
    title: "Motion Feed — Montage rapide mode TikTok",
    src: "https://cdn.coverr.co/videos/coverr-sunrise-timelapse-1554/1080p.mp4",
    poster:
      "https://cdn.coverr.co/images/coverr-sunrise-timelapse-1554/poster.jpg",
    category: "Prototype",
    tags: ["Motion Design", "After Effects"],
    duration: "00:36",
  },
];

