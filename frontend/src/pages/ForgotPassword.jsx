import { useState } from "react";
import { forgotPassword } from "../services/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      const data = response.data;
      if (data.EC === 0) toast.success(data.EM);
      else toast.error(data.EM);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5">
        <div className="bg-indigo-600 p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 19l-1 1-1-1-2-2-2-2m-2.257-2.257a6 6 0 117.743-7.743z" />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">Quên Mật Khẩu?</h2>
          <p className="mt-2 text-indigo-100">Đừng lo, chúng tôi sẽ giúp bạn lấy lại.</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nhập email đăng ký</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border"
                placeholder="email@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg disabled:opacity-70"
            >
              {isLoading ? "Đang gửi..." : "Gửi Link Reset"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 flex items-center justify-center gap-2">
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;