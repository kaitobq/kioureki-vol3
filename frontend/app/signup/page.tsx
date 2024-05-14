"use client";

import { useRef, useState } from "react";
import { FaUserInjured } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Loading } from "@yamada-ui/loading";
import axios from "axios";
import Link from "next/link";

const SignUpPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name) {
      setError("Please enter your name");
      setLoading(false);
      return;
    }
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

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          user: {
            name: name,
            email: email,
            password: password,
          },
        }
      );
      console.log("Signup success:", response.data);
      login();
    } catch (error: any) {
      setError(
        error.response && error.response.data && error.response.data.errors
          ? error.response.data.errors.body.join(", ")
          : "An unexpected error occurred"
      );
      console.error("Signup error:", error);
    }
    setLoading(false);
  };

  const login = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

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
      const { token } = response.data.user;
      localStorage.setItem("token", token);
      console.log("Logged in and token stored!");
      router.push("/organization");
    } catch (error: any) {
      setError("Login failed.");
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="w-full h-screen flex items-center bg-slate-200">
      <div className="w-2/3 xl:w-1/3 mx-auto px-4 py-5 bg-white rounded-sm shadow-md">
        <div className="flex justify-center">
          <Link href="/" className="flex w-fit gap-2 mt-5">
            <FaUserInjured size={30} />
            <h1 className="text-3xl font-bold">Kioureki</h1>
          </Link>
        </div>
        <h1 className="font-xl font-bold my-5">アカウントの作成</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Name"
            ref={nameRef}
          />
          <input
            type="email"
            className="p-2 border rounded"
            placeholder="someone@example.com"
            ref={emailRef}
          />
          <input
            type="password"
            className="p-2 border rounded"
            placeholder="Password"
            ref={passwordRef}
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
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
