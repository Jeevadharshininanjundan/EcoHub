import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.role, res.data.name);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
     <div className="bg-gradient-to-br from-green-50 via-green-100 to-white min-h-screen">
   <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-96 transition hover:shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">EcoHub Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" placeholder="Email" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition" 
              value={email} onChange={(e) => setEmail(e.target.value)} required 
            />
            <input 
              type="password" placeholder="Password" 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition" 
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div> 
    </div>
  ); 
}
