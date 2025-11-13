"use client";

import dynamic from "next/dynamic";
import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { PointerPosition } from "@/context/pointer-context";
import { isWebGLSupported } from "@/lib/is-webgl-supported";
import { AvatarFallback } from "./AvatarFallback";
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
  const bioAnimationPending = useDesktopStore(
    (state) => state.bioAnimationPending,
  );

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
    <div className="pointer-events-none relative flex aspect-[3/4] w-[28vw] min-w-[280px] max-w-[420px] items-center justify-center">
      <Spline
        scene={SCENE_URL}
        onLoad={() => setReady(true)}
        className={`transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        onPointerMove={(event) => {
          if (!event?.target?.setPointer) return;
          event.target.setPointer(pointerVector);
        }}
      />
      {!ready && (
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