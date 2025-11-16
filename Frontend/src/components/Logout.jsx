import { Loader2Icon, LogOut } from "lucide-react";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { logoutMutation, isLoading, error } = useLogout();

  return (
    <button
      onClick={() => logoutMutation()}
      className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95"
    >
      {isLoading ? (
        <Loader2Icon className="animate-spin h-5 w-5" />
      ) : (
        <LogOut size={18} />
      )}
      <span>Logout</span>
    </button>
  );
};

export default Logout;
