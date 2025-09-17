import React from 'react'
import ReportForm from '../components/ReportForm'
import Navbar from "../components/Navbar";
export default function ReportPage() {
  return (
     <div className="bg-gradient-to-br from-green-50 via-green-100 to-white min-h-screen">
     <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-[500px] transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-4">📢 Report Waste / List Item</h2>
          <ReportForm />
        </div>
      </div>
    </div>
    </div>
  );
}