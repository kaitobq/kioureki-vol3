// pages/dashboard/organization/medicalrecorddetail.tsx
"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
  const router = useRouter();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const treatmentStatusInputRef = useRef<HTMLInputElement>(null);
  const partInputRef = useRef<HTMLInputElement>(null);
  const diagnosisInputRef = useRef<HTMLInputElement>(null);
  const dateOfInjuryInputRef = useRef<HTMLInputElement>(null);
  const returnDateInputRef = useRef<HTMLInputElement>(null);
  const memoInputRef = useRef<HTMLTextAreaElement>(null);

  const inputRefs = [
    nameInputRef,
    partInputRef,
    diagnosisInputRef,
    treatmentStatusInputRef,
    dateOfInjuryInputRef,
    returnDateInputRef,
    memoInputRef,
  ];

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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextInput = inputRefs[index + 1];
      if (nextInput) {
        nextInput.current?.focus();
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const record = {
      name: nameInputRef.current?.value,
      treatment_status: treatmentStatusInputRef.current?.value,
      part: partInputRef.current?.value,
      diagnosis: diagnosisInputRef.current?.value,
      date_of_injury: dateOfInjuryInputRef.current?.value,
      return_date: returnDateInputRef.current?.value,
      memo: memoInputRef.current?.value,
    };

    try {
      const response = await axios.put(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/medical_records/${recordId}?organization_id=${searchParams.get(
          "organization_id"
        )}`,
        {
          name: record.name,
          part: record.part,
          diagnosis: record.diagnosis,
          treatment_status: record.treatment_status,
          date_of_injury: record.date_of_injury,
          return_date: record.return_date,
          memo: record.memo,
        },
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
                ref={nameInputRef}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                readOnly={!isEditing}
                defaultValue={medicalRecord.name}
                className={`${recordClass} pl-5 w-36 sm:w-72`}
              />
            </div>
            <div>
              <h3>治療状況:</h3>
              <input
                ref={treatmentStatusInputRef}
                onKeyDown={(e) => handleKeyDown(e, 1)} //なぜか2が先になる
                readOnly={!isEditing}
                defaultValue={medicalRecord.treatment_status}
                className={`${recordClass} text-center w-36 sm:w-52`}
              />
            </div>
          </div>
          <div className="flex justify-end my-1 sm:my-5">
            <div>
              <h3>受傷箇所:</h3>
              <input
                ref={partInputRef}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                readOnly={!isEditing}
                defaultValue={medicalRecord.part}
                className={`${recordClass} text-center w-24 sm:w-36`}
              />
            </div>
            <div>
              <h3>診断:</h3>
              <input
                ref={diagnosisInputRef}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                readOnly={!isEditing}
                defaultValue={medicalRecord.diagnosis}
                className={`${recordClass} text-center w-36 sm:w-72`}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div>
              <h3>受傷日:</h3>
              <input
                ref={dateOfInjuryInputRef}
                onKeyDown={(e) => handleKeyDown(e, 4)}
                readOnly={!isEditing}
                defaultValue={medicalRecord.date_of_injury}
                className={`${recordClass} text-center w-32 sm:w-56`}
              />
            </div>
            <div>
              <h3>復帰日:</h3>
              <input
                ref={returnDateInputRef}
                onKeyDown={(e) => handleKeyDown(e, 5)}
                readOnly={!isEditing}
                defaultValue={medicalRecord.return_date}
                className={`${recordClass} text-center w-32 sm:w-56`}
              />
            </div>
          </div>
          <div className="flex flex-col my-5">
            <h3>メモ:</h3>
            <textarea
              ref={memoInputRef}
              onKeyDown={(e) => handleKeyDown(e, 6)}
              readOnly={!isEditing}
              defaultValue={medicalRecord.memo}
              className={`${recordClass} whitespace-pre-wrap h-32`}
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
