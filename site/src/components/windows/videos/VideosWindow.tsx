"use client";

import { useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useVideoFeed } from "@/hooks/use-video-feed";
import type { VideoItem } from "@/data/videos";
import { VideoCard } from "@/components/windows/videos/VideoCard";

export const VideosWindow = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useVideoFeed();

  const videos = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <div>
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Vidéothèque
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Scroll infini, auto-play intelligent et tags explorables.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-200"
        >
          <Sparkles className="size-4" />
          Mode immersif
        </motion.div>
      </header>
      <div className="flex-1 overflow-hidden">
        <Virtuoso
          style={{ height: "100%" }}
          data={videos}
          overscan={300}
          endReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          itemContent={(index, video) => (
            <VideoCard key={video.id} video={video as VideoItem} index={index} />
          )}
          components={{
            Footer: () => (
              <div className="py-6 text-center text-sm text-slate-400">
                {isFetchingNextPage
                  ? "Chargement des clips..."
                  : hasNextPage
                    ? "Faites défiler pour en voir plus"
                    : "Fin de la sélection pour le moment"}
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

