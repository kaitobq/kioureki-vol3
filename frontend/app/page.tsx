import Link from "next/link";
import NavBar from "../components/navbar";

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-cyan-500 h-screen flex flex-col  text-white">
      <NavBar />

      <div className="w-full px-40 py-16 flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Kioureki</h1>
        <p className="text-xl mb-8">
          Discover the Future of Digital Experience
        </p>
        <Link href="/signup" className="" legacyBehavior>
          <a className="inline-block w-2/5 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-110">
            Get Started →
          </a>
        </Link>
      </div>
    </div>
  );
}
