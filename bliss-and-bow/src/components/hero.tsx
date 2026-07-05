"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Defer attaching the video source until after first paint so the
  // poster image is what mobile visitors see immediately.
  useEffect(() => {
    setVideoReady(true);
  }, []);

  // Pause the video whenever the hero scrolls out of view, so it isn't
  // burning battery/bandwidth decoding frames nobody can see.
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !videoReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [videoReady]);

  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/assets/ribbon-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      >
        {videoReady && <source src="/assets/ribbon-hero.mp4" type="video/mp4" />}
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/55 to-cream/80" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={item}
          className="font-serif text-5xl font-semibold text-charcoal sm:text-6xl md:text-7xl"
        >
          Every Gift, Blissfully Told
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base text-charcoal/80 md:text-lg"
        >
          Bespoke gift wrapping for the moments that deserve more than paper
          and tape. Book a slot and let us do the rest.
        </motion.p>
        <motion.div variants={item} className="mt-10">
          <Button href="/book" variant="primary">
            Book Your Wrapping
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
