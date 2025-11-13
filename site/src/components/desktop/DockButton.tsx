"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import * as Icons from "lucide-react";
import type { WindowConfig } from "@/constants/windows";
import { useDesktopStore } from "@/store/desktop-store";

type DockButtonProps = {
  config: WindowConfig;
};

export const DockButton = ({ config }: DockButtonProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openWindow, windows, activeWindow, setBioAnimationPending } =
    useDesktopStore((state) => ({
      openWindow: state.openWindow,
      windows: state.windows,
      activeWindow: state.activeWindow,
      setBioAnimationPending: state.setBioAnimationPending,
    }));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const Icon = (Icons[config.icon as keyof typeof Icons] ?? Icons.Monitor) as React.ElementType;
  const isActive = activeWindow === config.id;
  const isOpen = windows[config.id]?.isOpen;

  const handleClick = () => {
    if (config.id === "bio") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setBioAnimationPending(true);
      timeoutRef.current = setTimeout(() => {
        openWindow(config.id);
        setBioAnimationPending(false);
      }, 1600);
      return;
    }

    openWindow(config.id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative flex h-16 w-16 items-center justify-center"
    >
      <motion.span
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br shadow-lg shadow-slate-950/60 transition",
          `from-white/10 via-white/10 to-white/5`,
          isActive && "ring-2 ring-cyan-400/60",
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(148, 163, 255, 0.15), rgba(59, 130, 246, 0.08))`,
        }}
      >
        <Icon
          className={clsx(
            "h-7 w-7 text-slate-100 drop-shadow-[0_10px_20px_rgba(15,23,42,0.55)]",
            isActive ? "text-cyan-300" : "text-slate-100",
          )}
        />
      </motion.span>
      <motion.span
        layoutId={`${config.id}-indicator`}
        className={clsx(
          "absolute inset-x-8 bottom-3 h-1 rounded-full bg-cyan-300/80 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
    </button>
  );
};