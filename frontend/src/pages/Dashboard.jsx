import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Navbar from "../components/Navbar";

export default function Dashboard(){
  const [reports, setReports] = useState([]);
  useEffect(()=>{ fetchReports() },[])
  const fetchReports = async ()=>{
    const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await axios.get(`${api}/api/reports`);
    setReports(res.data.reports || []);
  }
  return (
     <div className="bg-gradient-to-br from-green-50 via-green-100 to-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Municipality Dashboard</h2>
        <p className="text-gray-600 mb-4">
          Shows recent reports (mock). In production, require auth and role checks.
        </p>

        {reports.map(r => (
          <div key={r._id} className="bg-white shadow-md rounded-2xl p-4 transition hover:shadow-xl">
            <strong className="text-gray-800">{r.title}</strong>
            <div className="text-gray-700">{r.description}</div>
            <div className="text-gray-500 text-sm mt-1">
              status: {r.status} | created: {new Date(r.createdAt).toLocaleString()}
            </div>
            {r.photoUrl && 
              <img 
                src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${r.photoUrl}`} 
                alt="photo" 
                className="max-w-xs mt-2 rounded-lg shadow-sm" 
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
  
}
