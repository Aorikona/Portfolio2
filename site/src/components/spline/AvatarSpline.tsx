"use client";

import dynamic from "next/dynamic";
import { memo, useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { PointerPosition } from "@/context/pointer-context";
import { isWebGLSupported } from "@/lib/is-webgl-supported";
import { AvatarFallback } from "./AvatarFallback";
import SplineErrorBoundary from "./SplineErrorBoundary";
import { useDesktopStore } from "@/store/desktop-store";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

type AvatarSplineProps = {
  pointer: PointerPosition;
};

const SCENE_URL =
  "https://prod.spline.design/mE0cmyysGVknIPC3/scene.splinecode";

const AvatarSplineComponent = ({ pointer }: AvatarSplineProps) => {
  const [ready, setReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const bioAnimationPending = useDesktopStore(
    (state) => state.bioAnimationPending,
  );
  // Primitive selectors for stability
  const isBioActive = useDesktopStore((state) => state.activeWindow === "bio");
  const isBioOpen = useDesktopStore((state) => Boolean(state.windows.bio?.isOpen));
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Suppress known Spline console errors
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const message = args[0]?.toString() || '';
      // Suppress benign Spline buffer warning
      if (message.includes('Data read, but end of buffer not reached')) {
        return;
      }
      originalError.apply(console, args);
    };
    
    return () => {
      console.error = originalError;
    };
  }, []);

  // Lazy-load heuristics:
  // - When Bio window is active/open
  // - On first user interaction (pointer/keyboard)
  // - When the component enters the viewport
  // - Idle fallback
  useEffect(() => {
    if (isBioActive || isBioOpen) setShouldLoad(true);
  }, [isBioActive, isBioOpen]);

  useEffect(() => {
    if (shouldLoad) return;
    const onFirstInteract = () => setShouldLoad(true);
    window.addEventListener("pointermove", onFirstInteract, { once: true } as any);
    window.addEventListener("keydown", onFirstInteract, { once: true } as any);

    let idleId: number | undefined;
    // @ts-ignore
    if (window.requestIdleCallback) {
      // @ts-ignore
      idleId = window.requestIdleCallback(() => setShouldLoad(true), { timeout: 3000 });
    } else {
      const t = setTimeout(() => setShouldLoad(true), 3000);
      // @ts-ignore
      idleId = t as any;
    }

    return () => {
      window.removeEventListener("pointermove", onFirstInteract as any);
      window.removeEventListener("keydown", onFirstInteract as any);
      // @ts-ignore
      if (window.cancelIdleCallback && idleId) window.cancelIdleCallback(idleId);
      else if (idleId) clearTimeout(idleId as any);
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (shouldLoad || !containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldLoad(true);
          }
        });
      },
      { root: null, threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shouldLoad]);

  const webgl = useMemo(() => isWebGLSupported(), []);

  const pointerVector = useMemo(
    () => ({
      x: pointer.x * 2 - 1,
      y: pointer.y * 2 - 1,
    }),
    [pointer.x, pointer.y],
  );

  if (!webgl) {
    return <AvatarFallback variant="static" />;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative flex aspect-[3/4] w-[28vw] min-w-[280px] max-w-[420px] items-center justify-center"
    >
      {webgl && shouldLoad ? (
        <SplineErrorBoundary fallback={<AvatarFallback />}>
          <Spline
            scene={SCENE_URL}
            onLoad={() => setReady(true)}
            className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            onPointerMove={(event) => {
              // @ts-ignore - react-spline exposes setPointer on target
              if (!event?.target?.setPointer) return;
              // @ts-ignore
              event.target.setPointer(pointerVector);
            }}
          />
        </SplineErrorBoundary>
      ) : (
        <AvatarFallback variant="static" />
      )}
      {webgl && shouldLoad && !ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <AvatarFallback />
        </div>
      )}
      {bioAnimationPending && (
        <motion.div
          className="absolute inset-0 rounded-[32px] border-2 border-cyan-400/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 0], scale: [0.9, 1.05, 1] }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 rounded-[32px] bg-cyan-400/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default memo(AvatarSplineComponent);
