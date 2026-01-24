import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className="min-h-screen"
        style={{
          backgroundColor: "var(--bg-main)",
          color: "var(--text-main)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
