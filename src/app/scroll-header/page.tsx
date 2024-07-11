"use client";

import { arrayOf } from "@/lib/utils";
import {
  useScroll,
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import React, { useEffect, useRef } from "react";

// TODO
// - [x] Update header dimension on scroll, wherever it is, from 50 to 80
// - [x] Delay the animation after x scroll, I mean, the first 500px should not animate the header
// - [x] Blur the header when it's 50px
// - [x] Progressively hide the menu items when the header is 50px

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useBoundedScroll({ gap, bound }: { gap: number; bound: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bound],
    [0, 1]
  );

  useEffect(() => {
    function updateScrollYBounded(current: number) {
      if (current < gap) {
        return;
      }
      const previous = scrollY.getPrevious() ?? 0;
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bound));
    }

    return scrollY.on("change", updateScrollYBounded);
  }, [scrollY, scrollYBounded, bound, gap]);

  return { progress: scrollYBoundedProgress, containerRef };
}

export default function Page() {
  const { progress, containerRef } = useBoundedScroll({
    gap: 500,
    bound: 50,
  });

  return (
    <section
      className="flex flex-1 flex-col overscroll-y-contain items-center justify-center"
      style={{
        maxHeight: "calc(100vh - 80px - 4rem)",
      }}
    >
      <section className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden border border-border rounded-xl shadow-xl relative">
        <div ref={containerRef} className="z-0 flex-1 overflow-y-scroll">
          <motion.header
            style={{
              height: useTransform(progress, [0, 1], [80, 50]),
              backgroundColor: useMotionTemplate`hsl(var(--background) / ${useTransform(
                progress,
                [0, 1],
                [1, 0.5]
              )})`,
            }}
            className="flex sticky top-0 left-0 right-0 w-full border-b border-border backdrop-blur-sm shadow-lg"
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
                style={{
                  opacity: useTransform(progress, [0, 1], [1, 0]),
                }}
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
