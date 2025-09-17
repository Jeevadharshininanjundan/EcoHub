import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from "./pages/Login";
import Register from "./pages/Register";

import ReportPage from './pages/Report'
import Dashboard from './pages/Dashboard'
import Cleaner from './pages/Cleaner'
import './styles.css'

function App(){
   const handleLogin = (role, name) => {
    alert(`Welcome ${name}! You are logged in as ${role}`);
    // Here you can redirect based on role
  };
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ReportPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/cleaner" element={<Cleaner/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
