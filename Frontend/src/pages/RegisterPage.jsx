import {
  Loader,
  LockIcon,
  MailIcon,
  ShieldCheck,
  User2Icon,
} from "lucide-react";
import { useState } from "react";
import useRegister from "../hooks/useSignup.js";
import useLogin from "../hooks/useLogin.js";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [state, setState] = useState("login");

  const { registerMutation, isLoading, error } = useRegister();
  const { loginMutation, loginError } = useLogin();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "login") {
        // login logic
        await loginMutation({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // register logic
        await registerMutation({
          userName: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        e.target.reset();
      }
    } catch (error) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black p-8">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Register"}
        </h1>
        {state === "login" ? (
          <p className="text-gray-500 text-sm mt-2">Please login to continue</p>
        ) : (
          <p className="text-gray-500 text-sm mt-2">
            Please register to continue
          </p>
        )}

        {(error || loginError) && (
          <div className="bg-red-100 items-center text-red-500 w-full text-sm p-2 rounded-md mt-4">
            <p className="text-sm">{error || loginError}</p>
          </div>
        )}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={13} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <MailIcon size={13} />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <LockIcon size={13} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state !== "login" && (
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <ShieldCheck size={13} />
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <div className="mt-4 text-left text-indigo-500">
          <Link to={'/forgot/password'} className="text-sm cursor-pointer" type="reset">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="mt-2 w-full h-11 cursor-pointer rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {state === "login" ? "Login" : "Register"}
          {isLoading && <Loader className="animate-spin h-6 w-6" />}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            click here
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
