import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import useResetPassword from "../hooks/useresetPassword";

const ResetPasswordPage = () => {
  const { user } = useAuth();
  const { resetPasswordMutation } = useResetPassword();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const savedExpireTime = localStorage.getItem("otpExpireTime");

    if (!savedExpireTime) {
      // FIRST TIME -> SET 15 MIN
      const expireTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem("otpExpireTime", expireTime);
      setTimeLeft(15 * 60);
    } else {
      // AFTER REFRESH
      const remaining = Math.floor((savedExpireTime - Date.now()) / 1000);

      setTimeLeft(remaining > 0 ? remaining : 0);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otpExpireTime");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      toast.error("OTP expired! Please request a new one.");
      return;
    }

    resetPasswordMutation({ email: user.email, otp, newPassword });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Forgot Password</h2>
        <p className="text-slate-300 mt-1">Enter OTP and New Password.</p>

        {/* TIMER */}
        <div className="mt-4 text-center text-lg font-semibold text-indigo-400">
          OTP Expires In: {formatTime(timeLeft)}
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          <label
            htmlFor="otp"
            className="block mb-1 font-medium text-slate-300"
          >
            <span className="text-red-700 text-lg">*</span> Enter OTP
          </label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            id="otp"
            name="otp"
            required
            placeholder="Enter OTP"
            className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
          />

          <label
            htmlFor="newpassword"
            className="block mb-1 font-medium text-slate-300"
          >
            <span className="text-red-700 text-lg">*</span> New Password
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            id="newpassword"
            name="newpassword"
            required
            placeholder="Enter new password"
            className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
          />

          <p className="text-sm text-slate-300">
            Your password should be at least 6 characters long
          </p>

          <button
            type="submit"
            disabled={timeLeft <= 0}
            className={`w-full cursor-pointer active:scale-90 mt-6 px-4 py-2.5 font-medium text-white rounded-md transition 
              ${
                timeLeft <= 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
