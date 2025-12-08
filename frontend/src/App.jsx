import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword.jsx";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">BaiTap_04 - 22110177 - Bùi Đức Lộc</Link>
          <ul className="flex space-x-6 text-white">
            <li>
              <Link to="/login" className="hover:text-blue-300 transition-colors">Đăng Nhập</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-300 transition-colors">Đăng Ký</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;