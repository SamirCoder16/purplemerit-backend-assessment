import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useResetPassword from "../hooks/useresetPassword";

const ResetPasswordPage = () => {
  const { user } = useAuth();
  const { resetPasswordMutation } = useResetPassword();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    resetPasswordMutation({ email: user.email, otp, newPassword });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Forgot Password</h2>
        <p className="text-slate-300 mt-1">Enter OTP and New Password.</p>

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
            className="w-full cursor-pointer active:scale-90 mt-6 px-4 py-2.5 font-medium text-white rounded-md transition 
             bg-indigo-600 hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
