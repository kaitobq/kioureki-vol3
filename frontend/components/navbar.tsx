import { FaUserInjured } from "react-icons/fa";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex flex-col justify-center items-center my-3 bg-transparent">
      <header className="bg-gradient-to-r from-gray-800 to-blue-800 text-white w-4/5 sm:w-3/5 rounded-full shadow-md shadow-black">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href={"/"} className="flex items-center">
            <FaUserInjured size={25} />
            <span className="text-xl font-bold">Kioureki</span>
          </Link>
          <Link href="/signin" className="" legacyBehavior>
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105">
              サインイン
            </a>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
