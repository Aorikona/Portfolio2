"use client";

import { useEffect } from "react";
import { useDesktopStore } from "@/store/desktop-store";

export const StoreHydration = () => {
  useEffect(() => {
    // Hydrate the store on mount
    useDesktopStore.persist.rehydrate();
  }, []);

  return null;
};
