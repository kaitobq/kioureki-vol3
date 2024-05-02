"use client";
// pages/dashboard.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("有効なトークンが存在しません。ログインしてください。");

        router.push("/signin");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/validate",
          {}, // POST リクエストのボディ部分（空のオブジェクト）
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user && !loading) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>

      <div>
        <h3>ご利用方法を選んでください</h3>
        <Link href="" legacyBehavior>
          <a className="inline-block w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-110">
            個人で利用する
          </a>
        </Link>
        <Link href="/dashoboard/organization" legacyBehavior>
          <a className="inline-block w-1/5 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-110">
            団体で利用する
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
