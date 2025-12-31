import React, { useState } from "react";
import toast from "react-hot-toast";

const Deactivate = () => {
  const [isLoading, setisLoading] = useState(false);
  const handleReqForActivate = () => {
    // Logic to handle request for account activation
    setisLoading(true);
    // Simulate an fake API call
    setTimeout(() => {
      setisLoading(false);
      toast.success("Your request has been sent to support.");
    }, 2000);
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-7 bg-black text-white">
      <h1 className="text-xl text-red-500 font-medium">
        Your Account has been Deactivated
      </h1>
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-gray-400">
          Contact Support for more information.
        </p>
        {isLoading ? (
          <button
            disabled
            className=" mt-4 px-4 py-2 bg-gray-600 rounded cursor-not-allowed"
          >
            Sending Request...
          </button>
        ) : (
          <button
            onClick={handleReqForActivate}
            className="cursor-pointer mt-4 px-4 py-2 bg-linear-to-tr from-green-500 via-green-600 to-green-700 transition-colors rounded hover:from-green-600 hover:via-green-700 hover:to-green-800"
          >
            Request for Activation
          </button>
        )}
      </div>
    </div>
  );
};

export default Deactivate;
