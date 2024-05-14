"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdCopy } from "react-icons/io";

const Setting = () => {
  const searchParams = useSearchParams();
  const [invitationToken, setInvitationToken] = useState<string | null>();
  const router = useRouter();
  const [error, setError] = useState<string | null>();

  const handleClick = async () => {
    const organizationId = searchParams.get("organization_id");
    if (!organizationId) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/organizations/${organizationId}/invitations`,
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
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          `エラー: ${
            error.response.data.message || "不明なエラーが発生しました。"
          }`
        );
      } else {
        setError("通信に失敗しました。");
      }
    }
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
    <div className="w-full h-3/5 flex flex-col items-center my-5">
      <div className="w-3/4 h-full">
        <h5 className="text-2xl font-bold m-10">招待コードの作成</h5>
        {error && <div className="text-red-500">{error}</div>}
        <p className="m-5">
          ユーザ一人に対して一つの招待コードが利用できます。
        </p>
        <div>
          <p className="font-semibold">招待コード：</p>
          <div className="flex">
            <input
              readOnly
              value={invitationToken ? invitationToken : ""}
              className=" w-full border-b-2 border-blue-700 flex-grow px-2 py-1 mb-2"
            />
            <button onClick={handleCopy} className="-ml-8 pb-3">
              <IoMdCopy className="size-7" />
            </button>
          </div>
        </div>
        <div className="text-end">
          <button
            onClick={handleClick}
            onTouchStart={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            作成
          </button>
        </div>
      </div>
      <div className="w-3/4">
        <h5 className="text-2xl font-bold m-10">組織の新規作成</h5>
        <div className="flex ">
          <p className="mx-5">新しい組織を作成、参加する。</p>
          <button
            onClick={() => router.push("/organization/new")}
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
