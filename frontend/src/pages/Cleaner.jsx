

import Navbar from "../components/Navbar";

export default function Cleaner() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Cleaner Dashboard</h2>
          <p className="text-gray-700">
            Assigned tasks will appear here. Upload completion proof directly to keep everything transparent.
          </p>
          <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
            View Assignments
          </button>
        </div>
      </div>
    </div>
  );
}
