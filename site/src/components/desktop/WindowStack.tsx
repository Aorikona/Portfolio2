"use client";

import { AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import type { WindowId } from "@/constants/windows";
import { useDesktopStore } from "@/store/desktop-store";
import { FloatingWindow } from "@/components/desktop/FloatingWindow";
import { ProjectsWindow } from "@/components/windows/projects/ProjectsWindow";
import { VideosWindow } from "@/components/windows/videos/VideosWindow";
import { BioWindow } from "@/components/windows/bio/BioWindow";
import { ContactWindow } from "@/components/windows/contact/ContactWindow";

const WINDOW_COMPONENTS: Record<WindowId, () => JSX.Element> = {
  projects: ProjectsWindow,
  videos: VideosWindow,
  bio: BioWindow,
  contact: ContactWindow,
};

const WINDOW_PRESETS: Record<
  WindowId,
  { className?: string; size?: { width?: string; height?: string; maxWidth?: string } }
> = {
  projects: {
    className: "md:w-[80vw] md:max-w-[1200px] md:h-[70vh]",
    size: { width: "min(92vw, 1200px)", height: "min(75vh, 680px)" },
  },
  videos: {
    className: "md:w-[28rem]",
    size: { width: "min(30rem, 88vw)", height: "min(70vh, 640px)" },
  },
  bio: {
    className: "md:w-[70vw] md:max-w-[960px]",
    size: { width: "min(80vw, 960px)", height: "min(68vh, 620px)" },
  },
  contact: {
    className: "md:w-[32rem]",
    size: { width: "min(34rem, 88vw)", height: "min(60vh, 520px)" },
  },
};

export const WindowStack = () => {
  const windows = useDesktopStore((state) =>
    Object.values(state.windows)
      .filter((win) => win.isOpen)
      .sort((a, b) => a.zIndex - b.zIndex),
  );

  return (
    <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col items-center justify-center px-6 py-28">
      <AnimatePresence>
        {windows.map((window) => {
          const Renderer = WINDOW_COMPONENTS[window.id];
          const preset = WINDOW_PRESETS[window.id];

          return (
            <div
              key={window.id}
              className={clsx(
                "pointer-events-none absolute inset-x-0 mx-auto flex items-center justify-center",
                preset?.className,
              )}
              style={{ zIndex: window.zIndex }}
            >
              <FloatingWindow
                windowId={window.id}
                className="pointer-events-auto"
                size={preset?.size}
              >
                <Renderer />
              </FloatingWindow>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

