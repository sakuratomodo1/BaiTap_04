import React, { useState } from "react";
import { registerUser } from "../api/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(name, email, password);
      const data = response.data;

      if (data.EC === 0) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all hover:shadow-xl">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-extrabold text-gray-800">
            Tạo tài khoản
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            Bắt đầu hành trình của bạn ngay hôm nay
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Họ Tên */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>

          {/* Input Email */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
            ) : (
              "Đăng Ký Ngay"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Bạn đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Đăng nhập tại đây
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;