"use client";
import CreateOrganization from "@/components/organization/new/create-organization";
import JoinOrganization from "@/components/organization/new/join-organization";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

type Parameter = "create" | "join";

const NewOrganizationPage = () => {
  const [active, setActive] = useState<Parameter>("create");

  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col items-center justify-start pt-10">
      <a
        href="/"
        className="flex items-center bg-gray-200 w-fit rounded-md mb-4 p-2 shadow-md hover:bg-gray-300 transition duration-200"
      >
        <IoChevronBackOutline className="text-xl mr-2" />
        ホームへ戻る
      </a>
      <h3 className="mb-4">
        ご利用のために団体を作成または参加する必要があります。
      </h3>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          id="create"
          onClick={() => setActive("create")}
          className={`${
            active === "create"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black hover:bg-blue-100"
          } px-6 py-2 rounded shadow-md transition duration-200`}
        >
          作成
        </button>
        <button
          id="join"
          onClick={() => setActive("join")}
          className={`${
            active === "join"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black hover:bg-blue-100"
          } px-6 py-2 rounded shadow-md transition duration-200`}
        >
          参加
        </button>
      </div>
      <div className="w-2/3 max-w-4xl p-4 shadow-lg rounded-lg bg-white">
        {active === "create" ? <CreateOrganization /> : <JoinOrganization />}
      </div>
    </div>
  );
};

export default NewOrganizationPage;
