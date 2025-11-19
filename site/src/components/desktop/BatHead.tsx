"use client";

import { usePointer } from "@/context/pointer-context";
import { useMemo, memo } from "react";

const BatHeadComponent = () => {
  const pointer = usePointer();

  const eyeStyle = useMemo(() => {
    const eyeX = (pointer.x - 0.5) * 30;
    const eyeY = (pointer.y - 0.5) * 20;
    return {
      transform: `translate(${eyeX}px, ${eyeY}px)`,
    };
  }, [pointer]);

  return (
    <div
      style={{
        position: "relative",
        width: "150px",
        height: "100px",
        backgroundColor: "#2c2c2c",
        borderRadius: "50% 50% 30% 30%",
        boxShadow: "inset 0 0 20px #000",
      }}
    >
      {/* Ears */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "15px",
          width: "0",
          height: "0",
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: "50px solid #1a1a1a",
          transform: "rotate(-15deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "15px",
          width: "0",
          height: "0",
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: "50px solid #1a1a1a",
          transform: "rotate(15deg)",
        }}
      />

      {/* Eyes container */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "40px",
        }}
      >
        {/* Left Eye */}
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#000",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              transition: "transform 0.1s ease-out",
              ...eyeStyle,
            }}
          />
        </div>
        {/* Right Eye */}
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "#000",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              transition: "transform 0.1s ease-out",
              ...eyeStyle,
            }}
          />
        </div>
      </div>
    </div>
  );
};

BatHeadComponent.displayName = "BatHead";

export default memo(BatHeadComponent);