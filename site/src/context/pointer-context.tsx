"use client";

import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { usePointerFollow } from "@/hooks/use-pointer-follow";

export type PointerPosition = {
  x: number;
  y: number;
};

const PointerContext = createContext<PointerPosition>({ x: 0.5, y: 0.5 });

export const PointerProvider = ({ children }: PropsWithChildren) => {
  const pointer = usePointerFollow();
  const value = useMemo(() => pointer, [pointer]);

  return (
    <PointerContext.Provider value={value}>{children}</PointerContext.Provider>
  );
};

export const usePointer = () => useContext(PointerContext);

