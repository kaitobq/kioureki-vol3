"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserInjured } from "react-icons/fa";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        user: formData,
      });
      console.log("Signup success:", response.data);
      // サインアップ後、自動でログイン
      login();
    } catch (error: any) {
      setError(
        error.response && error.response.data && error.response.data.errors
          ? error.response.data.errors.body.join(", ") // エラーが配列の場合、文字列に変換
          : "An unexpected error occurred" // エラーメッセージが不明な場合のデフォルトメッセージ
      );
      console.error("Signup error:", error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        user: {
          email: formData.email,
          password: formData.password,
        },
      });
      const { token } = response.data.user;
      // console.log("ff", response);
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
            required
            type="text"
            className="p-2 border rounded"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            required
            type="email"
            className="p-2 border rounded"
            name="email"
            placeholder="someone@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            required
            type="password"
            className="p-2 border rounded"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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

export default SignUpPage;
