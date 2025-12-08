import React, { useState } from "react";
import { forgotPassword } from "../api/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email của bạn.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      const data = response.data;

      if (data.EC === 0) {
        toast.success(data.EM);
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      console.error("Lỗi quên mật khẩu:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-indigo-100 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Quên Mật Khẩu?
        </h2>
        <p className="mb-8 text-center text-sm text-gray-500">
          Đừng lo lắng! Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email đăng ký
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Đang gửi..." : "Gửi link khôi phục"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;