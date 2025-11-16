"use client";

import { useEffect } from "react";
import { useDesktopStore } from "@/store/desktop-store";
import type { WindowId } from "@/constants/windows";

const dockHotkeys: WindowId[] = ["projects", "videos", "bio", "contact"];

export const useWindowHotkeys = () => {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const closeWindow = useDesktopStore((state) => state.closeWindow);
  const activeWindow = useDesktopStore((state) => state.activeWindow);
  const dockItems = useDesktopStore((state) => state.dockItems);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeWindow) {
        closeWindow(activeWindow);
      }

      if (event.ctrlKey && event.key.toLowerCase() === "tab") {
        event.preventDefault();
        const currentIndex = activeWindow
          ? dockItems.indexOf(activeWindow)
          : 0;
        const nextIndex = (currentIndex + 1) % dockItems.length;
        openWindow(dockItems[nextIndex]);
      }

      if (event.altKey) {
        const index = dockHotkeys.findIndex(
          (id) => event.key === String(dockHotkeys.indexOf(id) + 1),
        );
        if (index >= 0 && dockItems[index]) {
          event.preventDefault();
          openWindow(dockItems[index]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWindow, closeWindow, dockItems, openWindow]);
};

