"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { WINDOW_CONFIGS } from "@/constants/windows";
import { useDesktopStore } from "@/store/desktop-store";
import { DockButton } from "@/components/desktop/DockButton";

export const DesktopDock = () => {
  const dockItems = useDesktopStore((state) => state.dockItems);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 z-[2147483647] flex items-center justify-center">
      <motion.div
        className="pointer-events-auto flex items-center gap-4 rounded-3xl border border-white/10 bg-white/8 px-6 py-4 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.65)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <TooltipProvider delayDuration={150}>
          {dockItems.map((id) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <DockButton config={WINDOW_CONFIGS[id]} />
              </TooltipTrigger>
              <TooltipContent side="top" className="border border-white/10 bg-slate-900/90 text-slate-100 shadow-xl">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{WINDOW_CONFIGS[id].label}</span>
                  <span className="text-xs text-slate-400">{WINDOW_CONFIGS[id].description}</span>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </motion.div>
    </div>
  );
};

