import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <ThemeToggle />

      <h1 className="text-5xl font-bold mb-6 animate-fade-in">
        Dégust
        <span className="text-indigo-500 dark:text-indigo-400">&</span>
        Moi
      </h1>

      <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-10">
        Découvrez des alcools adaptés à vos goûts, votre humeur ou votre contexte,
        grâce à une approche simple, éducative et responsable.
      </p>

      <Link
        href="/questionnaire"
        className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-lg
                   hover:scale-105 transition-transform"
      >
        Commencer le questionnaire
      </Link>

      <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
        L’abus d’alcool est dangereux pour la santé. À consommer avec modération.
      </p>
    </main>
  );
}
