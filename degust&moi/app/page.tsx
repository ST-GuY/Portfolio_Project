import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <ThemeToggle />

      <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
        Dégust&Moi
      </h1>

      <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-10">
        Découvrez des alcools adaptés à vos goûts, votre humeur ou votre contexte,
        grâce à une approche simple, éducative et responsable.
      </p>

      <Link
        href="/questionnaire"
        className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg hover:scale-105 transition"
      >
        Commencer le questionnaire
      </Link>
    </main>
  );
}
