"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

let images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
];

export default function Page() {
  const [index, setIndex] = useState(0);

  return (
    <section className="flex bg-black overflow-hidden fixed top-20 inset-0">
      <div className="mx-auto flex-1 flex max-w-5xl flex-col justify-center p-8">
        <div className="relative w-full aspect-[3/2] bg-muted">
          <Image
            src={images[index]}
            alt={index.toString()}
            className="object-cover"
            fill
          />

          {index > 0 && (
            <button
              className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-accent transition hover:bg-accent/80"
              onClick={() => setIndex(index - 1)}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          )}

          {index + 1 < images.length && (
            <button
              className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-accent transition hover:bg-accent/80"
              onClick={() => setIndex(index + 1)}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
