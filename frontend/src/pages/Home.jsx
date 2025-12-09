import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      {/* Navbar: Glassmorphism Effect */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div
            className="cursor-pointer text-2xl font-extrabold tracking-tight text-indigo-600"
            onClick={() => navigate("/")}
          >
            Big Boss E-commerce<span className="text-gray-900">.</span>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2 transition-all hover:bg-gray-200 focus:outline-none"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{user.name}</span>
                  <svg className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl border border-gray-100 bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Đăng nhập với</p>
                      <p className="truncate text-sm font-medium text-gray-900">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="mt-2 flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/register" className="px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600">
                  Đăng ký
                </Link>
                <Link to="/login" className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/50 hover:-translate-y-0.5">
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-300 opacity-30 blur-3xl mix-blend-multiply filter animate-blob"></div>
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-yellow-300 opacity-30 blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 opacity-30 blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000"></div>

        <div className="relative">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            <span className="block xl:inline">Chào mừng đến với</span>{' '}
            <span className="block text-indigo-600 xl:inline bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              MyShop
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-500">
            {user
              ? `Xin chào, ${user.name}! Bạn đã sẵn sàng khám phá các tính năng mới chưa?`
              : "Nền tảng mua sắm hiện đại, nhanh chóng và bảo mật nhất dành cho bạn."}
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {user ? (
              <button className="rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-700">
                Vào trang quản lý
              </button>
            ) : (
              <button onClick={() => navigate('/register')} className="rounded-full bg-gray-900 px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-800">
                Bắt đầu ngay
              </button>
            )}
            <button className="rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-transform hover:bg-gray-50 hover:scale-105">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;