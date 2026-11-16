import type { Metadata } from "next";
import Link from "next/link";
import { getGames, getMods } from "@/lib/modbase";

export const metadata: Metadata = {
  title: "Supported Games",
  description: "Browse all PC games supported on ModBase.",
};

export default async function GamesPage() {
  const [games, mods] = await Promise.all([getGames(), getMods()]);

  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Supported Games</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Select a game to inspect its community-submitted modifications.
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {games.map((game) => {
          const modCount = mods.filter((m) => m.gameId === game.id).length;
          return (
            <li key={game.id} className="rounded border p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  <Link
                    href={`/games/${game.slug}`}
                    className="hover:underline"
                  >
                    {game.name}
                  </Link>
                </h2>
                <span className="rounded border px-2 py-0.5 text-xs">
                  {modCount} {modCount === 1 ? "mod" : "mods"}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Developer: {game.developer}
              </p>
              <p className="mt-1 font-mono text-xs text-zinc-500">
                Slug: {game.slug}
              </p>
              <Link
                href={`/games/${game.slug}`}
                className="mt-4 inline-block text-sm underline"
              >
                Explore mods
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}