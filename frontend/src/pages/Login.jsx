import { useState, useContext } from "react";
import { loginUser } from "../services/api";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valueLogin || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(valueLogin, password);
      const data = response.data;

      if (data && data.EC === 0) {
        login(data.DT.user, data.DT.access_token);
        toast.success(data.EM);
        navigate("/");
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Cột trái: Hình ảnh Branding */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-md">
          <h1 className="mb-6 text-5xl font-bold leading-tight">Chào mừng trở lại.</h1>
          <p className="text-lg text-indigo-100">
            Kết nối, quản lý và phát triển công việc của bạn ngay hôm nay với nền tảng Big Boss E-commerce.
          </p>
        </div>
        {/* Hình tròn trang trí */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500 opacity-30 blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-500 opacity-30 blur-3xl"></div>
      </div>

      {/* Cột phải: Form Đăng nhập */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Đăng Nhập</h2>
            <p className="mt-2 text-sm text-gray-600">
              Nhập thông tin chi tiết để truy cập tài khoản
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 rounded-md shadow-sm">
              {/* Input Email */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={valueLogin}
                    onChange={(e) => setValueLogin(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-all"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Mật khẩu</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Đăng Nhập"
                )}
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline">
                Tạo tài khoản mới
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;