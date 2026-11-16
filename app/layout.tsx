import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { NavLink } from "@/components/nav-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ModBase",
    default: "ModBase - Community Mod Directory",
  },
  description:
    "Discover, share, and track community-created modifications for your favorite PC games.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <nav
            aria-label="Main"
            className="mx-auto flex w-full max-w-4xl items-center justify-between p-4"
          >
            <Link href="/" className="text-lg font-bold tracking-tight">
              ModBase
            </Link>
            <div className="flex items-center gap-6">
              <NavLink href="/games">Games</NavLink>
              <NavLink href="/submit-mod">Submit a Mod</NavLink>
            </div>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t py-6 text-center text-xs text-zinc-500">
          ModBase · Community Mod Directory
        </footer>
      </body>
    </html>
  );
}