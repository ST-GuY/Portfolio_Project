import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Dégust&Moi</h1>

      <p className="max-w-xl text-gray-600 mb-6">
        Découvre des alcools adaptés à tes goûts, ton humeur ou ton contexte,
        grâce à une approche simple, éducative et responsable.
      </p>

      <Link
        href="/questionnaire"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Commencer le questionnaire
      </Link>
    </main>
  );
}
