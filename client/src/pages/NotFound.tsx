import { Link } from "react-router-dom";
import { IoWarning } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="w-full grow bg-white h-full flex flex-col items-center gap-10 py-24">
      {/* <img src="/vite.svg" alt="Logo" className="w-32" /> */}
      <IoWarning className="w-32 h-32 text-yellow-400" />
      <div className=" flex flex-col items-center gap-4 mb-4">
        <h1 className="text-5xl text-black font-bold">404 Not Found</h1>
        <h1 className="text-xl text-black/70">This page does not exist</h1>
      </div>
      <Link to={"/"}>
        <button className="w-24 h-12 py-2 rounded-lg bg-blue-800 text-white font-bold hover:bg-blue-600 cursor-pointer">
          {"<  "} Go Back
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
