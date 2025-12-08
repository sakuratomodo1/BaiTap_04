import React, { useState } from "react";
import { loginUser } from "../api/api";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      const data = response.data;

      // Giả sử backend trả về EC = 0 là thành công
      if (data.EC === 0) {
        toast.success("Đăng nhập thành công!");
        // Lưu token nếu có (ví dụ: localStorage.setItem('token', data.DT.access_token))

        // Chuyển hướng về trang chủ hoặc dashboard sau 1.5s
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.EM); // Hiển thị lỗi từ backend trả về
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all hover:shadow-xl">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Chào mừng trở lại!</h2>
          <p className="mt-2 text-sm text-gray-500">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <Link to="/forgot-password" class="text-xs font-semibold text-blue-600 hover:text-blue-500 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;