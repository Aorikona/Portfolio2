"use client";

import dynamic from "next/dynamic";

const DesktopShell = dynamic(() =>
  import("@/components/desktop/DesktopShell").then((mod) => mod.DesktopShell),
  { ssr: false }
);

export default function Home() {
  return <DesktopShell />;
}
