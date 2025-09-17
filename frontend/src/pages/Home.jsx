/*import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h1 className="text-5xl font-bold text-green-600 mb-4">🌍 EcoHub</h1>
        <p className="text-gray-700 max-w-xl">
          Smart Waste & Resource Exchange — Report waste, donate food, or request recycling pickup. 
          Together, let’s build a cleaner future!
        </p>
        <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
          Get Started
        </button>
      </div>
    </div>
  ); 
}

*/

import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-green-50 via-green-100 to-white min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow text-center px-6 py-16 space-y-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-green-600 mb-2 animate-fade-in">
          🌍EcoHub
        </h1>

        <p className="text-gray-700 max-w-2xl text-lg md:text-xl leading-relaxed">
          Smart Waste & Resource Exchange — Report waste, donate food, or request recycling pickup.
          Together, let’s build a cleaner and greener future!
        </p>

        <button className="mt-6 px-8 py-4 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
}
