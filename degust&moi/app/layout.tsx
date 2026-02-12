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
      <body className="bg-neutral-100 dark:bg-black text-neutral-900 dark:text-white transition-colors">
        
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
