import { Ban } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorPage = ({ message }) => {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-16">
        <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-20 -mt-10 -mb-10 w-full">
          <p className="text-xl font-medium max-w-sm">
            {message}
          </p>
          <Link
          to={'/auth/register'}
           className="flex items-center gap-2 rounded-md py-3 px-5 bg-indigo-600 hover:bg-indigo-700 transition text-white">
            <Ban />
            <span>Register / Login now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;