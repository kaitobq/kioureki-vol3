// pages/dashboard/organization/medicalrecorddetail.tsx
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { MedicalRecord } from "@/types/medical-record"; // 医療記録の型定義をインポート
import { useRouter } from "next/navigation";

interface MedicalRecordDetailProps {
  recordId: number;
  searchParams: any;
}

const MedicalRecordDetail: React.FC<MedicalRecordDetailProps> = ({
  recordId,
  searchParams,
}) => {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 編集モードの状態

  const [editData, setEditData] = useState({
    name: "",
    part: "",
    diagnosis: "",
    treatment_status: "",
    date_of_injury: "",
    return_date: "",
    memo: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/medical_records/${recordId}?organization_id=${searchParams.get("organization_id")}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setMedicalRecord(response.data);
      } catch (err) {
        setError("Failed to fetch medical record details");
        console.error(err);
      }
      setLoading(false);
    };

    fetchMedicalRecord();
  }, [recordId, searchParams]);

  useEffect(() => {
    if (medicalRecord) {
      // 現在のmedicalRecordのデータで編集用のstateを初期化
      setEditData({
        name: medicalRecord.name,
        part: medicalRecord.part,
        diagnosis: medicalRecord.diagnosis,
        treatment_status: medicalRecord.treatment_status,
        date_of_injury: medicalRecord.date_of_injury,
        return_date: medicalRecord.return_date || "",
        memo: medicalRecord.memo || "",
      });
    }
  }, [medicalRecord, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/medical_records/${recordId}?organization_id=${searchParams.get("organization_id")}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Updated Record:", response.data);
      setMedicalRecord(response.data); // 編集後のデータでmedicalRecordを更新
      setIsEditing(false); // 編集モードを終了
    } catch (error) {
      console.error("Failed to update record:", error);
      alert("Failed to update record.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/medical_records/${recordId}?organization_id=${searchParams.get("organization_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Medical record deleted successfully");
      setMedicalRecord(null);
      setIsEditing(false);
      router.replace(
        `http://localhost:3001/dashboard/organization?organization_id=${searchParams.get("organization_id")}`
      );
      console.log(response.data);
    } catch (error) {
      alert("Failed to delete medical record");
      console.error("Failed to delete record:", error);
    }
  };

  if (loading) return <div>Loading medical record details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!medicalRecord) return <div>No medical record found.</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <h2>Medical Record Detail</h2>
      <div className="w-11/12 border border-gray-600 px-5 py-3 rounded-lg">
        {isEditing ? (
          // 編集フォームを表示
          <form onSubmit={handleSave}>
            {/* 各フィールドの初期値を現在のデータで設定 */}
            <input
              defaultValue={medicalRecord.name}
              className="input input-bordered w-full"
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <input
              defaultValue={medicalRecord.part}
              className="input input-bordered w-full"
              onChange={(e) =>
                setEditData({ ...editData, part: e.target.value })
              }
            />
            <input
              defaultValue={medicalRecord.diagnosis}
              className="input input-bordered w-full"
              onChange={(e) =>
                setEditData({ ...editData, diagnosis: e.target.value })
              }
            />
            <input
              defaultValue={medicalRecord.treatment_status}
              className="input input-bordered w-full"
              onChange={(e) =>
                setEditData({ ...editData, treatment_status: e.target.value })
              }
            />
            <input
              defaultValue={medicalRecord.date_of_injury}
              className="input input-bordered w-full"
              onChange={(e) =>
                setEditData({ ...editData, date_of_injury: e.target.value })
              }
            />
            <input
              defaultValue={medicalRecord.return_date}
              className="input input-bordered w-full"
              onChange={(e) =>
                setEditData({ ...editData, return_date: e.target.value })
              }
            />
            <textarea
              defaultValue={medicalRecord.memo}
              className="textarea textarea-bordered w-full"
              onChange={(e) =>
                setEditData({ ...editData, memo: e.target.value })
              }
            />
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        ) : (
          <>
            <h3>Name: {medicalRecord.name}</h3>
            <p>Part Affected: {medicalRecord.part}</p>
            <p>Treatment Status: {medicalRecord.treatment_status}</p>
            <p>Diagnosis: {medicalRecord.diagnosis}</p>
            <p>Memo: {medicalRecord.memo || "No additional notes"}</p>
            <p>Date of Injury: {medicalRecord.date_of_injury}</p>
            <p>Return Date: {medicalRecord.return_date}</p>
            <a
              href={`/organization?organization_id=${medicalRecord.organization_id}`}
              className="btn btn-secondary"
            >
              Back
            </a>
            <button onClick={handleEdit} className="btn btn-info">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicalRecordDetail;
