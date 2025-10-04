import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
      {/* Welcome Section */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Hello students
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to your Next.js application!
          </p>
        </div>
      </div>

      {/* Berlin Café Images Section */}
      <div className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Berlin Café Culture
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Café Image 1 */}
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-amber-200 to-orange-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-700">
                <div className="text-6xl mb-2">☕</div>
                <div className="text-sm font-semibold">Café Terrace</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
              <p className="text-white p-4 font-semibold">Café Terrace in Mitte</p>
            </div>
          </div>

          {/* Café Image 2 */}
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-yellow-200 to-amber-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-700">
                <div className="text-6xl mb-2">🌞</div>
                <div className="text-sm font-semibold">Sunny Café</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
              <p className="text-white p-4 font-semibold">Sunny Café in Kreuzberg</p>
            </div>
          </div>

          {/* Café Image 3 */}
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-green-200 to-emerald-300">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-700">
                <div className="text-6xl mb-2">🌿</div>
                <div className="text-sm font-semibold">Garden Café</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
              <p className="text-white p-4 font-semibold">Garden Café in Prenzlauer Berg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
