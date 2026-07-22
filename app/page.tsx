'use client';

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 pt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Profile Card */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-transform hover:scale-[1.01]">
          <div className="md:w-1/3 bg-blue-600 p-8 flex flex-col items-center justify-center text-white relative">
            <div className="w-40 h-40 rounded-full bg-white/20 border-4 border-white overflow-hidden shadow-inner mb-6 relative">
              <Image 
                src="/images/s.jpg" 
                alt="Profile Photo"
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Shogun&background=fff&color=2563eb&size=200";
                }}
              />
            </div>
            <h1 className="text-3xl font-bold text-center">Sakkarin</h1>
            <h1 className="text-3xl font-bold text-center mb-2">Seangarthit</h1>
            <span className="bg-blue-800 text-blue-100 py-1 px-4 rounded-full text-sm font-semibold tracking-wider">
              NICKNAME: SHOGUN
            </span>
          </div>
          <div className="md:w-2/3 p-8 flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-gray-500 font-semibold tracking-wider text-sm uppercase mb-1">Student ID</h2>
              <p className="text-2xl font-bold text-gray-800">6720210080</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <h2 className="text-gray-500 font-semibold tracking-wider text-sm uppercase mb-1">Life Goal</h2>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "To become an expert full-stack developer and create applications that positively impact people's lives while continuously learning and growing."
              </p>
            </div>
            <div>
              <h2 className="text-gray-500 font-semibold tracking-wider text-sm uppercase mb-1">Hobbies & Interests</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">🎮 Gaming (Fate, Dark Souls)</span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">🦸‍♂️ Comics (DC Universe)</span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">💻 Coding</span>
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">🎬 Movies</span>
              </div>
            </div>

            {/* SPA Navigation Shortcut Button */}
            <div className="pt-2">
              <a
                href="/blog-spa"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105"
              >
                🧩 ไปยังหน้า Blog SPA (http://localhost:3000/blog-spa) ➔
              </a>
            </div>
          </div>
        </section>

        {/* Idols / Inspirations Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Idols & Inspirations</h2>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image 
                src="/images/fc.jpg" 
                alt="Archer (Fate)" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542644265-f483fc1de06f?auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-1">Archer</h3>
                <p className="text-gray-300 text-sm">Resilience and unyielding determination.</p>
              </div>
            </div>

            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image 
                src="/images/idol3.jpg" 
                alt="DC Trinity" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-1">DC Trinity</h3>
                <p className="text-gray-300 text-sm">Justice, truth, and serving the greater good.</p>
              </div>
            </div>

            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              <Image 
                src="/images/fe1.jpg" 
                alt="Dark Knight" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-1">The Dark Knight</h3>
                <p className="text-gray-300 text-sm">Finding light even in the darkest of places.</p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
