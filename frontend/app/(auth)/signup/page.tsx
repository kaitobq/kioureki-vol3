"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupForm = () => {
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
      router.push("/dashboard");
    } catch (error: any) {
      setError("Login failed.");
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-mono text-xl">新規登録</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          required
          type="text"
          className="w-1/5 border border-black rounded-md"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          required
          type="email"
          className="w-1/5 border-2 rounded-md my-1"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          className="w-1/5 border-2 rounded-md"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
