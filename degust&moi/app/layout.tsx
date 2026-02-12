import "./globals.css";
import type { Metadata } from "next";
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
          <LanguageToggle />
          <ThemeToggle />
        </header>

        {children}
      </body>
    </html>
  );
}
