import Link from "next/link";
import { FaUserInjured } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="flex flex-col justify-center items-center my-3 bg-transparent">
      <header className="bg-gradient-to-r from-gray-800 to-blue-800 text-white w-3/5 rounded-full shadow-md shadow-black">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href={"/"} className="flex items-center">
            <FaUserInjured size={30} />
            <span className="text-lg font-bold">Kioureki</span>
          </Link>

          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105">
            Sign Up
          </button> */}
          <Link href="signin" className="" legacyBehavior>
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105">
              Sign In
            </a>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
