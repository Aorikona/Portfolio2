"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { WindowConfig } from "@/constants/windows";
import { useDesktopStore } from "@/store/desktop-store";

type DockButtonProps = {
  config: WindowConfig;
};

export const DockButton = ({ config }: DockButtonProps) => {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const windows = useDesktopStore((state) => state.windows);
  const activeWindow = useDesktopStore((state) => state.activeWindow);

  const isActive = activeWindow === config.id;
  const isOpen = Boolean(windows[config.id]?.isOpen);

  const handleClick = () => {
    openWindow(config.id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={config.label}
      title={config.label}
      className="relative flex h-16 w-16 items-center justify-center"
    >
      {/* Ensure accessible name for Playwright and screen readers */}
      <span className="sr-only">{config.label}</span>
      <motion.span
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className={clsx(
          "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br shadow-lg shadow-slate-950/60 transition",
          "from-white/10 via-white/10 to-white/5",
          isActive && "ring-2 ring-cyan-400/60",
        )}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(148,163,255,0.15), rgba(59,130,246,0.08))",
        }}
      >
        {/* Icon temporarily removed to fix TypeScript build error */}
        <span className="text-xs font-semibold text-slate-100">
          {config.label.charAt(0)}
        </span>
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
