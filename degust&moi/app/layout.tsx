import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import LanguageToggle from "../src/components/LanguageToggle";
import FavoritesHeaderButton from "../src/components/FavoritesHeaderButton";

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
          <FavoritesHeaderButton />
          <LanguageToggle />
        </header>

        {children}
      </body>
    </html>
  );
}
