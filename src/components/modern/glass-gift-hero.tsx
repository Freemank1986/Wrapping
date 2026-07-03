"use client";

import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const GlassGiftScene = dynamic(
  () => import("./glass-gift-scene").then((m) => m.GlassGiftScene),
  { ssr: false, loading: () => null },
);

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function StaticGlow() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="bb-glass h-56 w-56 rounded-[2.5rem] border shadow-2xl sm:h-64 sm:w-64" />
      <div
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-accent/40 blur-3xl"
        aria-hidden
      />
    </div>
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function GlassGiftHero() {
  const [renderScene, setRenderScene] = useState<boolean | null>(null);

  useEffect(() => {
    // Client-only capability detection (matchMedia/WebGL/viewport) can't be
    // computed during render without crashing SSR and causing a hydration
    // mismatch, so this genuinely needs to run post-mount.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // The transmission material + bloom is several render passes per frame —
    // skip it on small/likely low-end devices rather than ship a stutter.
    const isSmallViewport = window.innerWidth < 640;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRenderScene(!prefersReducedMotion && !isSmallViewport && hasWebGL());
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {renderScene ? (
        <WebGLErrorBoundary fallback={<StaticGlow />}>
          <Suspense fallback={<StaticGlow />}>
            <GlassGiftScene />
          </Suspense>
        </WebGLErrorBoundary>
      ) : (
        <StaticGlow />
      )}
    </div>
  );
}
