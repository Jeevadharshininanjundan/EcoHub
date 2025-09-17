import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "citizen" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered successfully! Please login.");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
   <div className="bg-gradient-to-br from-green-50 via-green-100 to-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-96 transition hover:shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">Register</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <input name="name" type="text" placeholder="Full Name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition" onChange={handleChange} required />
            <select name="role" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 transition" onChange={handleChange}>
              <option value="citizen">Citizen</option>
              <option value="cleaner">Cleaner</option>
              <option value="ngo">NGO</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
