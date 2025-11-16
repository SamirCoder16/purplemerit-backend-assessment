import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-28 w-full  ">
      <footer className="w-full bg-linear-to-b from-[#fbf9ff] to-[#ffffff] text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-6">
            <p className="text-violet-700 text-3xl font-medium">NEVERMORE</p>
          </div>
          <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
            Nevermore is a cutting-edge platform that leverages AI to connect
            job seekers with their ideal career opportunities, streamlining the
            hiring process for both candidates and employers.
          </p>
        </div>
        <div className="border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
            <Link to="/">NEVERMORE</Link> ©2025. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
