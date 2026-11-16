import games from "@/data/games.json";
import mods from "@/data/mods.json";

export type Game = {
  id: number;
  name: string;
  slug: string;
  developer: string;
  coverImageUrl: string;
};

export type Mod = {
  id: number;
  title: string;
  description: string;
  version: string;
  downloadUrl: string;
  gameId: number;
};

async function simulateLatency() {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

export async function getGames(): Promise<Game[]> {
  await simulateLatency();
  return games;
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  const all = await getGames();
  return all.find((game) => game.slug === slug);
}

export async function getGameById(id: number): Promise<Game | undefined> {
  const all = await getGames();
  return all.find((game) => game.id === id);
}

export async function getMods(): Promise<Mod[]> {
  await simulateLatency();
  return mods;
}

export async function getModsByGameId(gameId: number): Promise<Mod[]> {
  const all = await getMods();
  return all.filter((mod) => mod.gameId === gameId);
}

export async function getModById(id: string): Promise<Mod | undefined> {
  const all = await getMods();
  return all.find((mod) => String(mod.id) === id);
}