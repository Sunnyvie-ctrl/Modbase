import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameById, getModById, getMods } from "@/lib/modbase";

export const dynamicParams = false;

export async function generateStaticParams() {
  const mods = await getMods();
  return mods.map((mod) => ({ id: String(mod.id) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/mods/[id]">): Promise<Metadata> {
  const { id } = await params;
  const mod = await getModById(id);
  if (!mod) return {};
  return {
    title: mod.title,
    description: mod.description,
  };
}

export default async function ModDetailPage({
  params,
}: PageProps<"/mods/[id]">) {
  const { id } = await params;
  const mod = await getModById(id);
  if (!mod) notFound();

  const game = await getGameById(mod.gameId);

  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/" className="underline">
          Home
        </Link>
        {game && (
          <Link href={`/games/${game.slug}`} className="underline">
            Back to {game.name}
          </Link>
        )}
      </div>

      <article className="mt-6 rounded border p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-3xl font-bold">{mod.title}</h1>
          <span className="rounded border px-3 py-1 text-sm font-medium">
            Version {mod.version}
          </span>
        </div>

        {game && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            For{" "}
            <Link
              href={`/games/${game.slug}`}
              className="font-medium underline"
            >
              {game.name}
            </Link>{" "}
            ({game.developer})
          </p>
        )}

        <p className="mt-6 leading-relaxed">{mod.description}</p>

        <div className="mt-6 rounded border p-4 text-sm">
          <p className="font-medium">Download URL</p>
          <p className="mt-1 break-all font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {mod.downloadUrl}
          </p>
        </div>
      </article>
    </main>
  );
}