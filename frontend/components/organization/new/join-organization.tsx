"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import CustomButton from "@/components/common/button";

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/invitations/accept`,
        { token: token },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);

      if (response.status === 201 && response.data.status === "success") {
        alert(`${response.data.organization_name}に参加しました！`);
        router.push(
          `/organization?organization_id=${response.data.membership.organization_id}`
        );
      } else {
        alert(`エラー1: ${response.data.message}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(`エラー2: ${error.response.data.message}`);
      } else {
        alert("通信に失敗しました。");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold m-10">
        招待コードを入力して既存の組織に参加
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
          className="block py-1.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="organization_name"
          className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          招待コード
        </label>
        <CustomButton type="submit" margin="6 0">
          参加
        </CustomButton>
      </form>
    </div>
  );
};

export default JoinOrganizationPage;
