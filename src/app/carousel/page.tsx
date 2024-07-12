/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useEventListener } from "usehooks-ts";

let images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
];

const collapsedAspectRatio = 1 / 2;
const fullAspectRatio = 3 / 2;
const margin = 12;
const gap = 2;

export default function Page() {
  const [index, setIndex] = useState(0);
  const canPrev = index > 0;
  const canNext = index + 1 < images.length;

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));
  const next = () => setIndex((i) => (i + 1 < images.length ? i + 1 : i));

  useEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      prev();
    }

    if (event.key === "ArrowRight") {
      next();
    }
  });

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <section className="flex bg-black overflow-hidden fixed inset-0">
        <div className="mx-auto flex-1 flex max-w-5xl flex-col justify-center p-8 gap-6">
          <div className="relative w-full aspect-[3/2] bg-muted overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image, i) => (
                <motion.img
                  animate={{ opacity: index === i ? 1 : 0.3 }}
                  key={image}
                  src={image}
                  alt={image}
                  className="object-cover aspect-[3/2]"
                />
              ))}
            </motion.div>

            <AnimatePresence>
              {canPrev && (
                <motion.button
                  key="prev"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-accent transition hover:bg-accent/80"
                  onClick={prev}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}

              {canNext && (
                <motion.button
                  key="next"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-accent transition hover:bg-accent/80"
                  onClick={next}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex h-20 w-full overflow-hidden justify-center">
            <motion.div
              className="flex"
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  margin +
                  index * gap
                }%`,
              }}
              style={{
                aspectRatio: fullAspectRatio,
                gap: `${gap}%`,
              }}
            >
              {images.map((image, i) => (
                <motion.button
                  key={`small-${image}`}
                  animate={i === index ? "active" : "inactive"}
                  variants={{
                    active: {
                      opacity: 1,
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                    },
                    inactive: {
                      opacity: 0.5,
                      aspectRatio: collapsedAspectRatio,
                    },
                  }}
                  onClick={() => setIndex(i)}
                >
                  <img
                    src={image}
                    alt={image}
                    className="object-cover aspect-[3/2] h-full"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
