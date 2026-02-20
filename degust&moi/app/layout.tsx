import "./globals.css";
import type { Metadata } from "next";
import Header from "@/src/components/Header";

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
          relative
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
        {/* 🔥 Voile premium léger */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />

        <Header />

        {/* Contenu */}
        <div className="relative pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}