import { useGetAllUsers } from "../hooks/useGetAllUsers";
import Loader from "../components/Loader.jsx";
import UserCard from "../components/UserCard.jsx";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ErrorPage from "./ErrorPage.jsx";

export default function GetAllUsers() {
  const { data, isLoading, isError, error } = useGetAllUsers();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["all-users"] });
  }, []);

  if (isLoading) return <Loader />;
  if (isError) {
    return (
     <ErrorPage message={error?.response?.data?.message || "Unknown error"} />
    );
  }

  return (
    <div className="p-6 bg-linear-to-b from-gray-700 to-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">All Users</h1>
      <Link to={"/"}>
        <button className="cursor-pointer mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Back to Home
        </button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {data?.users?.map((u) => (
          <UserCard key={u._id} user={u} />
        ))}
      </div>
    </div>
  );
}
