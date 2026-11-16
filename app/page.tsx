import Link from "next/link";
import { getGames, getMods } from "@/lib/modbase";

export default async function HomePage() {
  const [games, mods] = await Promise.all([getGames(), getMods()]);
  const recentMods = mods.slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <section className="rounded-lg border p-6">
        <h1 className="text-3xl font-bold">ModBase</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          A community-driven directory where PC gamers discover, share, and
          track game modifications.
        </p>
        <div className="mt-4 flex gap-4">
          <Link
            href="/games"
            className="rounded border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Browse Supported Games
          </Link>
          <Link
            href="/submit-mod"
            className="rounded border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Submit a Mod
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Popular Games</h2>
          <Link href="/games" className="text-sm underline">
            View all ({games.length})
          </Link>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {games.map((game) => (
            <li key={game.id} className="rounded border p-4">
              <h3 className="font-semibold">
                <Link href={`/games/${game.slug}`} className="hover:underline">
                  {game.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {game.developer}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Recently Added Mods</h2>
        <ul className="mt-4 space-y-3">
          {recentMods.map((mod) => {
            const parentGame = games.find((g) => g.id === mod.gameId);
            return (
              <li key={mod.id} className="rounded border p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">
                    <Link href={`/mods/${mod.id}`} className="hover:underline">
                      {mod.title}
                    </Link>
                  </h3>
                  <span className="rounded border px-2 py-0.5 text-xs">
                    v{mod.version}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {mod.description}
                </p>
                {parentGame && (
                  <p className="mt-2 text-xs text-zinc-500">
                    Game:{" "}
                    <Link
                      href={`/games/${parentGame.slug}`}
                      className="underline"
                    >
                      {parentGame.name}
                    </Link>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}