import { useState } from "react";
import { registerUser } from "../services/api";
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
        toast.success("Đăng ký thành công!");
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
    <div className="flex min-h-screen w-full bg-white">
      {/* Cột trái: Hình ảnh */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-700 to-pink-600 p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 max-w-md">
          <h1 className="mb-6 text-5xl font-bold leading-tight">Tham gia cùng chúng tôi.</h1>
          <p className="text-lg text-purple-100">
            Tạo tài khoản để khám phá hàng ngàn tính năng hấp dẫn chỉ dành riêng cho thành viên.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-pink-500 opacity-30 blur-3xl transform translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Cột phải: Form Đăng ký */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Tạo tài khoản</h2>
            <p className="mt-2 text-sm text-gray-600">Hoàn toàn miễn phí và chỉ mất 1 phút</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Họ và Tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                placeholder="Ít nhất 6 ký tự"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-purple-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-purple-700 hover:shadow-lg disabled:opacity-70"
            >
              {isLoading ? "Đang xử lý..." : "Đăng Ký Ngay"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-bold text-purple-600 hover:text-purple-500 hover:underline">
              Đăng nhập tại đây
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;