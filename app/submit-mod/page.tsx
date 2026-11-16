import type { Metadata } from "next";
import Link from "next/link";
import { getGames } from "@/lib/modbase";

export const metadata: Metadata = {
  title: "Submit a Mod",
  description: "Share a new PC game modification with the ModBase community.",
};

export default async function SubmitModPage() {
  const games = await getGames();

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Submit a Mod</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Add a new modification entry to one of our supported PC games. Interactive
        submissions will be connected to the API and database in Milestone 2.
      </p>

      <div className="mt-6 space-y-4 rounded border p-6">
        <div>
          <label htmlFor="game" className="block text-sm font-medium">
            Target Game
          </label>
          <select
            id="game"
            disabled
            className="mt-1 w-full rounded border px-3 py-2 text-sm opacity-70"
          >
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Mod Title
          </label>
          <input
            id="title"
            type="text"
            disabled
            placeholder="e.g. Enhanced Lighting Overhaul"
            className="mt-1 w-full rounded border px-3 py-2 text-sm opacity-70"
          />
        </div>

        <div>
          <label htmlFor="version" className="block text-sm font-medium">
            Version
          </label>
          <input
            id="version"
            type="text"
            disabled
            placeholder="e.g. 1.0.0"
            className="mt-1 w-full rounded border px-3 py-2 text-sm opacity-70"
          />
        </div>

        <div>
          <label htmlFor="downloadUrl" className="block text-sm font-medium">
            Download URL
          </label>
          <input
            id="downloadUrl"
            type="url"
            disabled
            placeholder="https://example.com/my-mod"
            className="mt-1 w-full rounded border px-3 py-2 text-sm opacity-70"
          />
        </div>

        <p className="text-xs text-zinc-500">
          Read-only preview for Milestone 1.{" "}
          <Link href="/games" className="underline">
            Browse existing mods
          </Link>
          .
        </p>
      </div>
    </main>
  );
}