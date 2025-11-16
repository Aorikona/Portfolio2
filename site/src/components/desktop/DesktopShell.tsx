"use client";

import { DesktopBackground } from "@/components/desktop/DesktopBackground";
import { DesktopDock } from "@/components/desktop/DesktopDock";
import { WindowStack } from "@/components/desktop/WindowStack";
import { useWindowHotkeys } from "@/hooks/use-window-hotkeys";

export const DesktopShell = () => {
  useWindowHotkeys();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-200 pb-28 md:pb-32 lg:pb-0">
      <DesktopBackground />
      <WindowStack />
      <DesktopDock />
    </div>
  );
};

