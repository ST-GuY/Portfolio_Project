import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
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
    <html lang="fr" className="dark">
      <body
        className="
          min-h-screen
          bg-cover
          bg-center
          bg-fixed
          text-white
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
              bg-white/10
              backdrop-blur-md
              border border-white/10
              shadow
              hover:scale-105
              transition
            "
          >
            ❤️
          </Link>

          <LanguageToggle />
        </header>

        {children}
      </body>
    </html>
  );
}
