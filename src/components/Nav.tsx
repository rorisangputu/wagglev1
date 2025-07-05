"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-transparent text-primary-foreground flex flex-col w-[90%] xl:w-[70%] mx-auto py-2">
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "classname">) {
  const pathname = usePathname;
  return (
    <Link
      {...props}
      className={cn(
        "text-primary text-sm",
        pathname === props.href && "bg-background "
      )}
    />
  );
}
export function HeadLink(
  props: Omit<ComponentProps<typeof Link>, "classname">
) {
  const pathname = usePathname;
  return (
    <Link
      {...props}
      className={cn(
        "py-3 text-primary text-xs hover:text-green-700",
        pathname === props.href && "bg-background "
      )}
    />
  );
}
