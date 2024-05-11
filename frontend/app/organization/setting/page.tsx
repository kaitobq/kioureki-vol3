"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const OrganizationSettingPage = () => {
  const searchParams = useSearchParams();
  const [invitationToken, setInvitationToken] = useState<string | null>();

  const hancleClick = async () => {
    const organizationId = searchParams.get("organization_id");
    if (!organizationId) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/organizations/${organizationId}/invitations`,
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
    <div className="w-full h-screen">
      <div>
        <h5>招待コードの作成</h5>
        <button onClick={hancleClick}>作成</button>
        <p>招待コード：{invitationToken && invitationToken}</p>
        <button onClick={handleCopy}>コピー</button>
      </div>
    </div>
  );
};

export default OrganizationSettingPage;
