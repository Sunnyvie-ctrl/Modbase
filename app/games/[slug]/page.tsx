import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameBySlug, getGames, getModsByGameId } from "@/lib/modbase";

export const dynamicParams = false;

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/games/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return {};
  return {
    title: `${game.name} Mods`,
    description: `Browse community modifications for ${game.name} by ${game.developer}.`,
  };
}

export default async function GameDetailPage({
  params,
}: PageProps<"/games/[slug]">) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) notFound();

  const gameMods = await getModsByGameId(game.id);

  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <Link href="/games" className="text-sm underline">
        Back to all games
      </Link>

      <header className="mt-4 rounded border p-6">
        <h1 className="text-3xl font-bold">{game.name}</h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Developer: {game.developer}
        </p>
        <p className="mt-1 font-mono text-xs text-zinc-500">
          Cover asset: {game.coverImageUrl}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">
          Community Mods ({gameMods.length})
        </h2>

        {gameMods.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">
            No mods have been submitted for this game yet.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {gameMods.map((mod) => (
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
                <Link
                  href={`/mods/${mod.id}`}
                  className="mt-3 inline-block text-sm underline"
                >
                  View mod details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}