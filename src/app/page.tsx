import { config } from "@/config";
import Link from "next/link";

export default function Home() {
  return (
    <section className="container grid gap-6 max-w-4xl py-12 sm:py-16 lg:py-24">
      <div className="grid gap-2">
        <h1 className="font-bold text-2xl">Hello, world!</h1>
        <p>
          Welcome to my experiments with the{" "}
          <a
            href="https://www.framer.com/motion/"
            target="_blank"
            className="underline underline-offset-4 font-medium"
          >
            framer-motion
          </a>{" "}
          animation library.
        </p>
        <p>
          Most examples come from this{" "}
          <a
            href="https://www.youtube.com/watch?v=He1_AH6kC8Y"
            target="_blank"
            className="underline underline-offset-4 font-medium"
          >
            video
          </a>
          .
        </p>
      </div>

      <div className="grid gap-2">
        <h2 className="text-lg font-semibold">Pages:</h2>

        <ul className="list-none space-y-2 list-inside">
          {config.mainNav.map((nav) => (
            <li key={nav.href}>
              <Link
                className="text-primary font-medium underline underline-offset-4"
                href={nav.href}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-2">
        <p>
          Code source could be found on{" "}
          <a
            href={config.links.github}
            target="_blank"
            className="underline underline-offset-4 font-medium"
          >
            Github
          </a>
          .
        </p>
      </div>
    </section>
  );
}
