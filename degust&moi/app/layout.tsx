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
          transition-colors
        "
        style={{
          backgroundImage: "url('/images/background.png')",
        }}
      >
        {/* OVERLAY LÉGER (pas de blur ici) */}
        <div
          className="
            min-h-screen
            bg-gradient-to-br
            from-white/50 via-white/30 to-white/50
            dark:from-black/40 dark:via-black/20 dark:to-black/40
            transition-colors
          "
        >
          {/* HEADER GLOBAL */}
          <header className="fixed top-4 right-4 z-50 flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
