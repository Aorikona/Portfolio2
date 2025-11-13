"use client";

import { useEffect } from "react";
import { DesktopBackground } from "@/components/desktop/DesktopBackground";
import { DesktopDock } from "@/components/desktop/DesktopDock";
import { WindowStack } from "@/components/desktop/WindowStack";
import { useDesktopStore } from "@/store/desktop-store";
import { useWindowHotkeys } from "@/hooks/use-window-hotkeys";

export const DesktopShell = () => {
  const openWindow = useDesktopStore((state) => state.openWindow);

  useWindowHotkeys();

  useEffect(() => {
    openWindow("projects");
  }, [openWindow]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-200">
      <DesktopBackground />
      <WindowStack />
      <DesktopDock />
    </div>
  );
};

