import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-gray-100 dark:bg-gray-900">
      <body className="min-h-screen text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
