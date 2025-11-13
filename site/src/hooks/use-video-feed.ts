"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { VIDEO_FEED } from "@/data/videos";

const PAGE_SIZE = 3;

const fetchVideos = async ({ pageParam = 0 }) => {
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = VIDEO_FEED.slice(start, end);
  const hasMore = end < VIDEO_FEED.length;

  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    items: slice,
    nextPage: hasMore ? pageParam + 1 : undefined,
  };
};

export const useVideoFeed = () => {
  return useInfiniteQuery({
    queryKey: ["videos-feed"],
    queryFn: fetchVideos,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

