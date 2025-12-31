import { useState } from "react";
import { Video, Menu, X, User2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { triggerConfetti } from "../utils/triggerConfetti";
import Loader from "./Loader";
import Logout from "./Logout";

const Hero = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logo = ["N", "E", "V", "E", "R", "M", "O", "R", "E"];
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  if (loading) return <Loader />;

  return (
    <div>
      <section>
        {/* ✅ Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur text-slate-800 text-sm">
          {/* Logo */}
          <Link
            to="/"
            className="hidden sm:block font-bold text-indigo-600 text-2xl"
          >
            {logo.map((letter, index) => (
              <span className="mr-1" key={index}>
                {letter}
              </span>
            ))}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 transition duration-500">
            <Link to="/" className="hover:text-slate-500 text-lg transition">
              Home
            </Link>

            {isAuthenticated &&
              (user?.role === "user" ? (
                <Link
                  to="/all/users"
                  className="hover:text-slate-500 text-lg transition"
                >
                  User
                </Link>
              ) : (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-slate-500 text-lg transition"
                >
                  Dashboard
                </Link>
              ))}
          </div>

          {/* Desktop Button */}
          {!loading &&
            (user ? (
              <div className="flex w-100 gap-6 items-center justify-between px-3 relative">
                {/* User Info + Role */}
                <div className="relative flex flex-col items-center">
                  <div
                    onClick={() => triggerConfetti()}
                    className="h-10 cursor-pointer w-40 bg-linear-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-purple-300/40 animate-pulse"></div>
                    <div className="relative z-10 h-8 w-36 bg-purple-100/90 rounded-lg flex items-center justify-center text-purple-800 font-medium shadow-sm">
                      {user?.userName || "Loading..."}
                    </div>
                  </div>

                  <div className="w-0.5 h-8 bg-purple-400"></div>

                  <div
                    onClick={() => {
                      navigate("/profile/edit");
                    }}
                    className="h-8 w-22 bg-purple-200 text-purple-800 text-sm font-semibold flex items-center justify-center rounded-md shadow-md cursor-pointer animate-swing"
                  >
                    Edit Profile
                  </div>
                </div>

                {/* 🟢 Desktop Logout */}
                <div className="hidden absolute top-0 right-0 md:flex items-center">
                  <Logout onClick={() => console.log("desktop logout")} />
                </div>
              </div>
            ) : (
              <Link
                to={"/auth/register"}
                className="hidden cursor-pointer md:block px-6 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all rounded-full"
              >
                Register / login
              </Link>
            ))}

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={toggleModal}
            id="open-menu"
            className="md:hidden active:scale-90 transition"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>

        {/* ✅ Mobile Nav */}
        <div
          className={`fixed inset-0 z-50 bg-white/80 text-slate-800 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/" onClick={toggleModal}>
            Home
          </Link>
          <Link to="/all/users" onClick={toggleModal}>
            Users
          </Link>

          {/* 🔥 Mobile logout inside menu */}
          {user && <Logout onClick={() => console.log("mobile logout")} />}

          {/* Close button */}
          <button
            onClick={toggleModal}
            className="active:ring-2 cursor-pointer active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
          >
            <X size={24} />
          </button>
        </div>

        {/* ✅ Hero Section */}
        <main className="flex flex-col max-md:gap-20 md:flex-row pb-20 items-center justify-between mt-20 px-4 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-center md:text-left text-4xl leading-[46px] md:text-5xl md:leading-[68px] font-semibold max-w-xl text-slate-900">
              Auth System <br /> made simple for you.
            </h1>
            <p className="text-center md:text-left text-sm text-slate-700 max-w-lg mt-2">
              Auth System that helps you to manage your users easily.
            </p>
            <div className="flex items-center gap-4 mt-8 text-sm">
              {user ? (
                <button className="flex items-center gap-2 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white active:scale-95 transition rounded-md px-4 py-2">
                  <User2Icon className="h-6 w-6" />
                  <span>{user.userName}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/auth/register");
                  }}
                  className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white active:scale-95 transition rounded-md px-7 h-11"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>

          <img
            loading="lazy"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-5.png"
            alt="hero"
            className="max-w-sm sm:max-w-md lg:max-w-lg 2xl:max-w-xl transition-all duration-300"
          />
        </main>
      </section>
    </div>
  );
};

export default Hero;
