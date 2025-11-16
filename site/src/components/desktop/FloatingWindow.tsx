"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { WINDOW_CONFIGS, type WindowId } from "@/constants/windows";
import { useDesktopStore } from "@/store/desktop-store";

type FloatingWindowProps = {
  windowId: WindowId;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  size?: {
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
  };
};

export const FloatingWindow = ({
  windowId,
  headerSlot,
  footerSlot,
  children,
  className,
  size,
}: FloatingWindowProps) => {
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const focusWindow = useDesktopStore((state) => state.focusWindow);
  const windows = useDesktopStore((state) => state.windows);

  const windowState = windows[windowId];
  const config = WINDOW_CONFIGS[windowId];

  if (!windowState?.isOpen) {
    return null;
  }

  const dimensions: Record<string, string | undefined> = {
    width: size?.width,
    height: size?.height,
    maxWidth: size?.maxWidth,
    maxHeight: size?.maxHeight,
  };

  const overlayStyle = {
    backgroundImage:
      "linear-gradient(160deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.92))",
  };

  const handleClick = () => focusWindow(windowId);

  return (
    <motion.section
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${windowId}-header`}
      key={windowId}
      layout
      onMouseDown={handleClick}
      onTouchStart={handleClick}
      initial={{ opacity: 0, scale: 0.92, y: 32 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 40 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className={clsx(
        "group pointer-events-auto relative flex flex-col rounded-3xl border border-white/10 bg-slate-900/70 shadow-[0_50px_120px_-40px_rgba(15,23,42,0.95)] backdrop-blur-2xl",
        windowState.isActive && "ring-2 ring-cyan-400/35",
        className,
      )}
      style={{
        zIndex: windowState.zIndex,
        ...dimensions,
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-30"
        style={overlayStyle}
      />
      <header
        id={`${windowId}-header`}
        className="relative z-10 flex items-center justify-between rounded-t-3xl border-b border-white/5 px-6 py-4"
      >
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              "flex size-10 items-center justify-center rounded-2xl text-slate-900 shadow-lg",
              "bg-gradient-to-br",
              config.accent,
            )}
          >
            {config.label.slice(0, 1)}
          </span>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">
              {config.label}
            </span>
            <span className="text-sm text-slate-400">
              {windowState.description}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {headerSlot}
          <button
            type="button"
            onClick={() => closeWindow(windowId)}
            className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-100 transition hover:bg-white/20"
            aria-label={`Fermer ${config.label}`}
          >
            <X className="size-5" />
          </button>
        </div>
      </header>
      <div className="relative z-10 flex flex-1 flex-col rounded-b-3xl">
        {children}
      </div>
      {footerSlot && (
        <footer className="relative z-10 border-t border-white/5 px-6 py-4">
          {footerSlot}
        </footer>
      )}
    </motion.section>
  );
};

