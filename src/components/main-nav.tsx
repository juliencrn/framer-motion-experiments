import { MenuItem } from "@/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function MainNav({ items }: { items: MenuItem[] }) {
  return (
    <nav className="container h-20 flex items-center border-b border-foreground overflow-x-auto no-scrollbar">
      {items ? (
        <ul className="flex gap-3">
          {items.map(({ href, title }, i) => (
            <li key={i}>
              <Link
                href={href}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  })
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
