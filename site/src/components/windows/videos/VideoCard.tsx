"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, Volume2, VolumeX } from "lucide-react";
import { clsx } from "clsx";
import type { VideoItem } from "@/data/videos";

type VideoCardProps = {
  video: VideoItem;
  index: number;
};

export const VideoCard = ({ video, index }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting && entry.intersectionRatio > 0.6);
        });
      },
      { threshold: [0.6, 0.8] },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    if (inView) {
      void element.play().catch(() => {});
    } else {
      element.pause();
    }
  }, [inView, video.src]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <motion.article
      className="relative mx-auto mb-8 flex w-full max-w-[22rem] flex-col overflow-hidden rounded-3xl border border-white/8 bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          playsInline
          muted={muted}
          loop
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <motion.div
          animate={{ opacity: inView ? 0 : 1 }}
          className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-950/60"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2 text-xs text-slate-100">
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 uppercase tracking-[0.3em]">
            {video.category}
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-1 text-[10px] uppercase tracking-[0.3em]">
            {video.duration}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="text-base font-semibold text-white">{video.title}</h4>
          <div className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-200">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-2 py-1 text-[10px]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            className={clsx(
              "flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition",
              liked
                ? "border-pink-400/50 bg-pink-500/10 text-pink-200"
                : "hover:border-white/20 hover:bg-white/5",
            )}
          >
            <Heart className="size-4" fill={liked ? "currentColor" : "none"} />
            J’aime
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-white/20 hover:bg-white/5"
          >
            <Share2 className="size-4" />
            Partager
          </button>
        </div>
        <button
          type="button"
          onClick={() => setMuted((prev) => !prev)}
          className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-200"
          aria-label={muted ? "Activer le son" : "Couper le son"}
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
      </div>
    </motion.article>
  );
};

