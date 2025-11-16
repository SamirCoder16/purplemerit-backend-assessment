import React, { useState } from "react";
import useForgotPassword from "../hooks/useForgotPassword";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { forgotPasswordMutation, isLoading, error } = useForgotPassword();
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            forgotPasswordMutation({ email });
        } catch (error) {
            toast.error("Error submitting forgot password request");
        }
    }
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Forgot Password</h2>
        <p className="text-slate-300 mt-1">Enter your email to reset your password</p>
        <form className="mt-8" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-slate-300"
          >
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="w-full cursor-pointer active:scale-90 mt-6 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
