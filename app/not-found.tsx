import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        The requested game, mod, or page does not exist on ModBase.
      </p>
      <Link href="/games" className="mt-6 inline-block underline">
        Browse supported games
      </Link>
    </main>
  );
}