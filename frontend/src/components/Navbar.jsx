// src/components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <h1 className="text-2xl font-bold text-green-600">EcoHub</h1>
        <div className="space-x-4">
          <a href="/" className="text-gray-700 hover:text-green-600 transition">Home</a>
          <a href="/dashboard" className="text-gray-700 hover:text-green-600 transition">Dashboard</a>
          <a href="/report" className="text-gray-700 hover:text-green-600 transition">Report</a>
          <a href="/login" className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Login</a>
          <a href="/register" className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Register</a>
        </div>
      </div>
    </nav>
  );
}
