import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Dégust&Moi</h1>

        <p className="text-lg text-gray-600 mb-8">
          Découvrez des alcools adaptés à vos goûts, votre humeur ou votre
          contexte, grâce à une approche simple, éducative et responsable.
        </p>

        <a
          href="/questionnaire"
          className="inline-block bg-black text-white px-8 py-4 rounded-xl text-lg hover:bg-gray-800 transition"
        >
          Commencer le questionnaire
        </a>
      </div>
    </main>
  );
}
