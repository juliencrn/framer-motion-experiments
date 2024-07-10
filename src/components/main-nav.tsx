import { MenuItem } from "@/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function MainNav({ items }: { items: MenuItem[] }) {
  return (
    <nav className="container h-20 flex items-center ">
      {items ? (
        <ul className="flex gap-6">
          {items.map(({ href, title }, i) => (
            <li key={i}>
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "p-0 text-base"
                )}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}
