export default function GamesLayout({ children }: LayoutProps<"/games">) {
  return (
    <>
      <aside
        aria-label="Directory notice"
        className="mx-auto w-full max-w-4xl px-8 pt-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 rounded border px-4 py-3 text-sm">
          <span>
            Supported PC Game Catalog · Verified community mod listings
          </span>
          <label className="flex items-center gap-2">
            <span>Quick note</span>
            <input
              type="text"
              placeholder="Track mods to test..."
              className="rounded border px-2 py-1 text-xs"
            />
          </label>
        </div>
      </aside>
      {children}
    </>
  );
}