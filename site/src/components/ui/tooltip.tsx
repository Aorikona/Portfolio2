"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({
  className,
  sideOffset = 8,
  ...props
}: TooltipPrimitive.TooltipContentProps) => {
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={clsx(
        "rounded-xl border border-white/10 bg-slate-900/95 px-4 py-3 text-sm text-slate-100 shadow-2xl backdrop-blur-2xl",
        className,
      )}
      {...props}
    />
  );
};

