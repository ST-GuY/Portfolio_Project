import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";

export const metadata: Metadata = {
  title: "Dégust&Moi",
  description: "Découvre des alcools adaptés à tes goûts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-cover
          bg-center
          bg-fixed
          text-neutral-900
          dark:text-white
          transition-colors
        "
        style={{
          backgroundImage: "url('/images/background.png')",
        }}
      >
        {/* HEADER GLOBAL */}
        <header className="fixed top-4 right-4 z-50 flex items-center gap-4">

          {/* ❤️ Bouton Favoris */}
          <Link
            href="/favoris"
            className="
              px-4 py-2
              rounded-xl
              bg-white/80
              dark:bg-white/10
              backdrop-blur-md
              border border-white/20 dark:border-white/10
              shadow
              hover:scale-105
              transition
            "
          >
            ❤️
          </Link>

          <LanguageToggle />
          <ThemeToggle />
        </header>

        {children}
      </body>
    </html>
  );
}
