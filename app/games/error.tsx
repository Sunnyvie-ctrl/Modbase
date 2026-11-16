"use client";

export default function GamesError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-4xl p-8">
      <div role="alert">
        <h1 className="text-2xl font-bold">Unable to load games</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-4 rounded border px-4 py-2 text-sm"
      >
        Try again
      </button>
    </main>
  );
}