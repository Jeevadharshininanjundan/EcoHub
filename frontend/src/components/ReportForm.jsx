import React, {useState} from 'react'
import axios from 'axios'

export default function ReportForm(){
  const [title,setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [file,setFile]=useState(null);
  const [status,setStatus]=useState('');

  async function submit(e){
    e.preventDefault();
    setStatus('Submitting...');
    try{
      // geolocation
      const pos = await new Promise((res, rej)=> navigator.geolocation.getCurrentPosition(res, rej));
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      const fd = new FormData();
      fd.append('title', title);
      fd.append('description', desc);
      fd.append('lat', lat);
      fd.append('lng', lng);
      if(file) fd.append('photo', file);
      const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${api}/api/report`, fd, { headers: {'Content-Type': 'multipart/form-data'} });
      setStatus('Report submitted');
      setTitle(''); setDesc(''); setFile(null);
    }catch(err){ console.error(err); setStatus('Error sending report'); }
  }

  return (
   <form onSubmit={submit} className="bg-gray-50 p-4 rounded-2xl shadow-md flex flex-col gap-4">
      <input className="px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-400 transition" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-400 transition" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} rows={4} />
      <input type="file" className="px-2 py-1 border rounded-lg border-gray-300" onChange={e=>setFile(e.target.files[0])} />
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md transition">Submit Report</button>
      <div className="text-gray-600">{status}</div>
    </form>
  );
}
