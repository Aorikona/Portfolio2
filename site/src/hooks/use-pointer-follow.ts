"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const usePointerFollow = () => {
  const frame = useRef<number>();
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      frame.current = requestAnimationFrame(() => {
        const x = clamp(event.clientX / window.innerWidth, 0, 1);
        const y = clamp(event.clientY / window.innerHeight, 0, 1);
        setPointer({ x, y });
      });
    };

    window.addEventListener("pointermove", handler, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handler);
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return pointer;
};

