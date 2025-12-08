import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword as apiResetPassword } from "../api/api";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("Đường dẫn không hợp lệ.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!token) {
      toast.error("Token lỗi. Vui lòng thử lại.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiResetPassword(token, password);
      const data = response.data;

      if (data.EC === 0) {
        toast.success(data.EM);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">Liên kết không hợp lệ</h2>
          <p className="mb-6 text-gray-500">Token reset mật khẩu không tìm thấy hoặc đã hết hạn.</p>
          <Link to="/forgot-password" class="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white hover:bg-indigo-700">
            Yêu cầu link mới
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-teal-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800">Đặt Mật Khẩu Mới</h2>
          <p className="mt-2 text-sm text-gray-500">Vui lòng nhập mật khẩu mới của bạn bên dưới.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mật khẩu mới */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mật khẩu mới</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-teal-600 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Đang cập nhật..." : "Xác nhận đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;