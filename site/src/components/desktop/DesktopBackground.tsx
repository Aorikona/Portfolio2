"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { memo } from "react";
import { usePointer } from "@/context/pointer-context";
import { useDesktopStore } from "@/store/desktop-store";
import { AvatarFallback } from "@/components/spline/AvatarFallback";

const AvatarSpline = dynamic(() => import("../spline/AvatarSpline"), {
  ssr: false,
  loading: () => <AvatarFallback />,
});

export const DesktopBackground = memo(() => {
  const pointer = usePointer();
  const hasOpenWindow = useDesktopStore((state) =>
    Object.values(state.windows).some((win) => win.isOpen),
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
      <Image
        src="/desk-backdrop.png"
        alt="Fond du bureau"
        fill
        priority
        className={`object-cover opacity-35 transition-opacity duration-500 ${
          hasOpenWindow ? "opacity-0" : "opacity-35"
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-end pr-[10vw]">
        <AvatarSpline pointer={pointer} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
    </div>
  );
});

DesktopBackground.displayName = "DesktopBackground";

