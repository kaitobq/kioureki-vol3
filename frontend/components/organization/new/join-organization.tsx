"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const JoinOrganizationPage = () => {
  const tokenRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = tokenRef.current?.value;
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/invitations/accept",
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);

      if (response.data.status === "success") {
        alert(`${response.data.organization_name}に参加しました！`);
        router.push(
          `/organization?organization_id=${response.data.membership.organization_id}`
        );
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold m-10">
        招待コードを入力して既存の団体に参加
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full my-2 max-w-md relative z-0"
      >
        <input
          id="organization_name"
          type="text"
          ref={tokenRef}
          placeholder=" "
          className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="organization_name"
          className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          招待コード
        </label>
        <button
          type="submit"
          className="mt-6 bg-gray-500 focus:bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105 focus:scale-105"
        >
          {/* {loading === true ? <p>loading</p> : <>作成</>} */}参加
        </button>
      </form>
    </div>
  );
};

export default JoinOrganizationPage;
