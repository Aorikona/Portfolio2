"use client";

import Image from "next/image";
import { useDesktopStore } from "@/store/desktop-store";

export const BackgroundImage = () => {
  const hasOpenWindow = useDesktopStore((state) =>
    Object.values(state.windows).some((win) => win.isOpen),
  );

  return (
    <Image
      src="/desk-backdrop.png"
      alt="Fond du bureau"
      fill
      priority
      className={`object-cover transition-opacity duration-500 ${
        hasOpenWindow ? "opacity-0" : "opacity-35"
      }`}
    />
  );
};
