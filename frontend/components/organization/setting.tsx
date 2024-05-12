"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoMdCopy } from "react-icons/io";

const Setting = () => {
  const searchParams = useSearchParams();
  const [invitationToken, setInvitationToken] = useState<string | null>();

  const hancleClick = async () => {
    const organizationId = searchParams.get("organization_id");
    if (!organizationId) {
      return;
    }

    try {
      const response = await axios.post(
        `https://kioureki-vol3.onrender.com/api/organizations/${organizationId}/invitations`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setInvitationToken(response.data.token);
    } catch (error) {}
  };

  const handleCopy = async () => {
    if (!invitationToken) {
      return;
    }
    try {
      await navigator.clipboard.writeText(invitationToken);
      alert("クリップボードに保存しました。");
    } catch (error) {
      alert("失敗しました。");
    }
  };

  return (
    <div className="w-full h-3/5 flex justify-center my-10">
      <div className="w-3/4 h-full">
        <h5 className="text-2xl font-bold m-10">招待コードの作成</h5>
        <p className="m-5">
          ユーザ一人に対して一つの招待コードが利用できます。
        </p>
        <div>
          <p className="font-semibold">招待コード：</p>
          <input
            readOnly
            value={invitationToken ? invitationToken : ""}
            className=" w-full border-b-2 border-blue-700 flex-grow px-2 py-1 mb-2"
          />
          <button onClick={handleCopy} className="-ml-8">
            <IoMdCopy className="size-6" />
          </button>
        </div>
        <div className="text-end">
          <button
            onClick={hancleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
