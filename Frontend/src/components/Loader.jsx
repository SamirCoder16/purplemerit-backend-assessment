import { Loader2Icon } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <Loader2Icon className="animate-spin h-10 w-10 text-gray-600" />
        <span className="text-lg">Loading . . .</span>
      </div>
    </div>
  );
};

export default Loader;
