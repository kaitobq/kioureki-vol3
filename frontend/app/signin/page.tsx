"use client";

import { useState, useRef } from "react";
import { FaUserInjured } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Loading } from "@yamada-ui/loading";
import Link from "next/link";
import axios from "axios";

const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    console.log("sign in with ", email);

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

      console.log("Login success:", response.data.user);
      localStorage.setItem("token", response.data.user.token);
      router.push("/organization");
    } catch (error: any) {
      setError("Failed to log in. Please check your credentials.");
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
    }
    setLoading(false);
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
            {loading ? (
              <Loading variant="oval" size="3xl" color="white" />
            ) : (
              "次へ"
            )}
          </button>
          <div className="flex justify-center">
            <Link href="/signup" className="underline text-blue-700">
              アカウント作成はこちらから
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
