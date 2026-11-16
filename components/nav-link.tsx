"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPage = pathname === href;
  const isInSection = pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isPage ? "page" : isInSection ? "true" : undefined}
      className="text-sm text-zinc-600 hover:text-zinc-950 hover:underline aria-[current=page]:font-bold aria-[current=page]:text-zinc-950 aria-[current=true]:font-bold aria-[current=true]:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 dark:aria-[current=page]:text-zinc-50 dark:aria-[current=true]:text-zinc-50"
    >
      {children}
    </Link>
  );
}