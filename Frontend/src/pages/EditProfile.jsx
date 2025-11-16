import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useUpdateName from "../hooks/useUpdateName";
import { Loader } from "lucide-react";

const EditProfile = () => {
  const [updatedName, setUpdatedName] = useState("");
  const { user } = useAuth();
  const { updateProfileMutation, isLoading, error } = useUpdateName();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call API to update profile
    updateProfileMutation({ userId: user._id, userName: updatedName });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>
        <p className="text-slate-300 mt-1">Update your profile information</p>
        <div className="mt-3 flex gap-2 items-center">
          <h2>Present Name : </h2>
          <p className="text-indigo-500 font-medium">{user?.userName}</p>
        </div>
        <form className="mt-8" onSubmit={handleFormSubmit}>
          <label className="block mb-1 font-medium text-slate-300">
            Edit Name
          </label>
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            type="text"
            id="userName"
            name="userName"
            required
            placeholder="Enter Name"
            className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="text-right">
            <Link
              to="/forgot/password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer mt-10 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
