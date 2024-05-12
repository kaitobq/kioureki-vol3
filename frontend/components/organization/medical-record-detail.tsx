// pages/dashboard/organization/medicalrecorddetail.tsx
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MedicalRecord } from "@/types/medical-record";
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
  const [isEditing, setIsEditing] = useState(false);
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
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/medical_records/${recordId}?organization_id=${searchParams.get(
            "organization_id"
          )}`,
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
    setIsEditing(!isEditing);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/medical_records/${recordId}?organization_id=${searchParams.get(
          "organization_id"
        )}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Updated Record:", response.data);
      setMedicalRecord(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update record:", error);
      alert("Failed to update record.");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this medical record?")
    ) {
      try {
        const response = await axios.delete(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/api/medical_records/${recordId}?organization_id=${searchParams.get(
            "organization_id"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        alert("Medical record deleted successfully");
        setMedicalRecord(null);
        setIsEditing(false);
        router.push(
          `/organization?organization_id=${searchParams.get("organization_id")}`
        );
        console.log(response.data);
      } catch (error) {
        alert("Failed to delete medical record");
        console.error("Failed to delete record:", error);
      }
    }
  };

  if (loading) return <div>Loading medical record details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!medicalRecord) return <div>No medical record found.</div>;

  return (
    <div className="w-full h-screen flex flex-col items-center bg-slate-200">
      <div className="w-11/12 bg-white shadow-sm rounded-lg my-10">
        <div className="flex justify-between h-15 px-5 py-2">
          <a
            href={`/organization?organization_id=${medicalRecord.organization_id}`}
          >
            <TbArrowBackUp className="size-8 text-gray-600 hover:text-blue-600 duration-75" />
          </a>
          <h3
            className={` font-bold text-xl ${isEditing ? "inline" : "hidden"}`}
          >
            Editing
          </h3>
          <div className="flex gap-2">
            <button onClick={handleDelete}>
              <RiDeleteBin6Line
                className={`size-6 text-gray-600 hover:text-blue-600 duration-75 ${
                  isEditing ? "hidden" : "inline"
                }`}
              />
            </button>
            <button onClick={handleEdit} className="flex items-end">
              <CiEdit className="size-8 text-gray-600 hover:text-blue-600 duration-75" />
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSave}
          className="font-serif *:text-sm px-3 sm:px-20"
        >
          <div className="flex my-1 sm:my-5">
            <div>
              <h3>名前:</h3>
              <input
                readOnly={!isEditing}
                defaultValue={medicalRecord.name}
                className={`${recordClass} pl-5 w-36 sm:w-72`}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>
            <div>
              <h3>治療状況:</h3>
              <input
                readOnly={!isEditing}
                defaultValue={medicalRecord.treatment_status}
                className={`${recordClass} text-center w-36 sm:w-52`}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end my-1 sm:my-5">
            <div>
              <h3>受傷箇所:</h3>
              <input
                readOnly={!isEditing}
                defaultValue={medicalRecord.part}
                className={`${recordClass} text-center w-24 sm:w-36`}
                onChange={(e) =>
                  setEditData({ ...editData, part: e.target.value })
                }
              />
            </div>
            <div>
              <h3>診断:</h3>
              <input
                readOnly={!isEditing}
                defaultValue={medicalRecord.diagnosis}
                className={`${recordClass} text-center w-36 sm:w-72`}
                onChange={(e) =>
                  setEditData({ ...editData, diagnosis: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div>
              <h3>受傷日:</h3>
              <input
                readOnly={!isEditing}
                defaultValue={medicalRecord.date_of_injury}
                className={`${recordClass} text-center w-32 sm:w-56`}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    date_of_injury: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <h3>復帰日:</h3>
              <input
                readOnly={!isEditing}
                defaultValue={medicalRecord.return_date}
                className={`${recordClass} text-center w-32 sm:w-56`}
                onChange={(e) =>
                  setEditData({ ...editData, return_date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col my-5">
            <h3>メモ:</h3>
            <textarea
              readOnly={!isEditing}
              defaultValue={medicalRecord.memo}
              className={`${recordClass} whitespace-pre-wrap h-32`}
              onChange={(e) =>
                setEditData({ ...editData, memo: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end mb-5">
            <button
              type="submit"
              className={`px-3 py-1 font-bold rounded-md text-white bg-gray-500 shadow-md hover:bg-blue-700 hover:scale-105 duration-75 ${
                isEditing ? "inline" : "hidden"
              }`}
            >
              保存する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordDetail;

const recordClass =
  "font-bold text-lg mx-2 py-0.5 shadow-sm text-gray-700 rounded-md border border-gray-200";
