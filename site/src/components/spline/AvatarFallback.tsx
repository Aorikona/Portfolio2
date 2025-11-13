"use client";

import { clsx } from "clsx";

type AvatarFallbackProps = {
  variant?: "pulse" | "static";
};

export const AvatarFallback = ({ variant = "pulse" }: AvatarFallbackProps) => (
  <div
    className={clsx(
      "pointer-events-none aspect-[3/4] w-[26vw] min-w-[260px] max-w-[360px] rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-700/30 via-slate-900/70 to-black/80 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.8)]",
      variant === "pulse" && "animate-pulse",
    )}
  >
    <div className="h-full w-full rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(148,163,255,0.25),transparent_60%)]" />
  </div>
);

