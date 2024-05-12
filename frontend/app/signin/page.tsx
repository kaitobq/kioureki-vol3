"use client";

// pages/signin.js
import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar";
import { FaUserInjured } from "react-icons/fa";
import Link from "next/link";

const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    console.log(email, password);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        {
          user: {
            email: email,
            password: password,
          },
        }
      );

      console.log("Login successful", response.data.user);
      localStorage.setItem("token", response.data.user.token); // Assume the token is returned in response.data.token
      router.push("/organization"); // Redirect to dashboard upon successful login
    } catch (err: any) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Login error:", err.response ? err.response.data : err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center bg-slate-200">
      <div className="w-2/3 xl:w-1/3 mx-auto px-4 py-5 bg-white rounded-sm shadow-md">
        <div className="flex justify-center">
          <Link href="/" className="flex w-fit gap-2 my-5">
            <FaUserInjured size={30} />
            <h1 className="text-3xl font-bold">Kioureki</h1>
          </Link>
        </div>
        <h1 className="text-xl font-bold my-5">サインイン</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            ref={emailRef}
            placeholder="someone@example.com"
            className="p-2 border rounded"
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            次へ
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
