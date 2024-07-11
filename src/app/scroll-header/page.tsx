"use client";

import { arrayOf } from "@/lib/utils";
import { useScroll, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

// TODO
// - [x] Update header dimension on scroll, wherever it is, from 50 to 80
// - [x] Delay the animation after x scroll, I mean, the first 500px should not animate the header
// - [x] Blur the header when it's 50px
// - [x] Progressively hide the menu items when the header is 50px

/** Start the animation after this */
const GAP = 500;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Page() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: scrollAreaRef,
  });

  const height = useMotionValue(80);
  const heightProgress = useTransform(height, [50, 80], [0, 1]);
  const heightInvertedProgress = useTransform(heightProgress, (v) => 1 - v);
  const blur = useTransform(heightInvertedProgress, (v) => `blur(${v * 4}px)`);
  const backgroundProgress = useTransform(heightProgress, [0, 1], [0.5, 1]);
  const backgroundColor = useTransform(
    backgroundProgress,
    (v) => `hsl(var(--background) / ${v})`
  );

  useEffect(() => {
    function updateScrollYBounded(current: number) {
      if (current < GAP) {
        return;
      }
      let previous = scrollY.getPrevious() ?? 0;
      let diff = current - previous;
      let newScrollYBounded = height.get() - diff;

      height.set(clamp(newScrollYBounded, 50, 80));
    }

    const unsubscribe = scrollY.on("change", updateScrollYBounded);
    return unsubscribe;
  }, [scrollY, height]);

  return (
    <section
      className="flex flex-1 flex-col overscroll-y-contain items-center justify-center"
      style={{
        maxHeight: "calc(100vh - 80px - 4rem)",
      }}
    >
      <section className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden border border-border rounded-xl shadow-xl relative">
        <div ref={scrollAreaRef} className="z-0 flex-1 overflow-y-scroll">
          <motion.header
            style={
              {
                height,
                backgroundColor,
                "--tw-backdrop-blur": blur,
              } as unknown as React.CSSProperties
            }
            className="flex sticky top-0 left-0 right-0 w-full border-b border-border backdrop-blur-0 shadow-lg"
          >
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
              <p className="flex origin-left items-center text-xl font-semibold uppercase">
                <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                  The
                </span>
                <span className="-ml-1 text-2xl tracking-[-.075em]">
                  Daily Bugle
                </span>
              </p>
              <motion.nav
                style={{ opacity: heightProgress }}
                className="flex space-x-4 text-xs font-medium"
              >
                <a href="#">News</a>
                <a href="#">Sports</a>
                <a href="#">Culture</a>
              </motion.nav>
            </div>
          </motion.header>

          <main className="px-8 pt-8">
            <h1 className="h-10 w-4/5 rounded bg-muted text-2xl font-bold" />
            <div className="mt-8 space-y-6">
              {arrayOf(2).map((i) => (
                <div key={i} className="space-y-2 text-sm">
                  <p className="h-4 w-5/6 rounded bg-muted" />
                  <p className="h-4 rounded bg-muted" />
                  <p className="h-4 w-4/6 rounded bg-muted" />
                </div>
              ))}
              <div className="h-64 rounded bg-muted"></div>
              {arrayOf(90).map((i) => (
                <div key={i} className="space-y-2 text-sm">
                  <p className="h-4 w-5/6 rounded bg-muted" />
                  <p className="h-4 rounded bg-muted" />
                  <p className="h-4 w-4/6 rounded bg-muted" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </section>
  );
}
