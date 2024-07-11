"use client";

import { arrayOf } from "@/lib/utils";

export default function Page() {
  return (
    <section
      className="flex flex-1 flex-col overscroll-y-contain items-center justify-center"
      style={{
        maxHeight: "calc(100vh - 80px - 4rem)",
      }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden border border-border rounded-xl shadow-xl">
        <div className="z-0 flex-1 overflow-y-scroll">
          <header className="flex h-20">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
              <p className="flex origin-left items-center text-xl font-semibold uppercase">
                <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                  The
                </span>
                <span className="-ml-1 text-2xl tracking-[-.075em]">
                  Daily Bugle
                </span>
              </p>
              <nav className="flex space-x-4 text-xs font-medium">
                <a href="#">News</a>
                <a href="#">Sports</a>
                <a href="#">Culture</a>
              </nav>
            </div>
          </header>

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
      </div>
    </section>
  );
}
