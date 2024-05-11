"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import { MedicalRecord } from "@/types/medical-record";
import Link from "next/link";
import AddMedicalRecord from "./add-medical-record";

interface MedicalRecordsProps {
  organizationId: number;
  setCurrentMedicalRecordId: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({
  organizationId,
  setCurrentMedicalRecordId,
}) => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/medical_records`,
          {
            params: { organization_id: organizationId },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMedicalRecords(response.data);
      } catch (err) {
        setError("Failed to fetch medical records");
        console.error(err);
      }
      setLoading(false);
    };

    if (organizationId) {
      fetchMedicalRecords();
    }
  }, [organizationId]);

  if (loading) {
    return <div>Loading medical records...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-5 bg-slate-200">
      <div className="w-11/12 flex justify-end">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row my-3"
        >
          追加
          <MdNoteAdd className="size-5" />
        </button>
      </div>
      <AddMedicalRecord
        dialogRef={dialogRef}
        closeModal={closeModal}
        organizationId={organizationId}
      />
      <div className="w-11/12 bg-white shadow-md px-1 sm:px-5 rounded-md">
        <div className="flex flex-row my-2 p-2 *:text-sm *:text-gray-500 *:font-sans *:font-semibold sm:*:w-1/6 border-b border-gray-300">
          <h5 className="w-1/3">名前</h5>
          <h5 className="w-1/3">受傷箇所</h5>
          <h5 className="w-1/2">診断</h5>
          <h5 className="w-1/2 sm:ml-20">受傷日</h5>
          <h5 className="hidden sm:inline">復帰日</h5>
        </div>
        {medicalRecords.map((record) => (
          <Link
            key={record.id}
            className="flex flex-row w-full sm:p-2 my-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 *:font-sans *:text-sm *:font-medium *:text-gray-600"
            href={{
              pathname: "/organization",
              query: {
                organization_id: organizationId,
                medical_record_id: record.id,
              },
            }}
            onClick={() => setCurrentMedicalRecordId(record.id)}
          >
            <h1 className="text-xl w-1/3 sm:w-1/6">{record.name}</h1>
            <h3 className="text-xl w-1/3 sm:w-1/6">{record.part}</h3>
            <h3 className="text-xl w-1/2 sm:w-1/6">{record.diagnosis}</h3>
            <h3 className="text-xl w-1/2 sm:w-1/6 sm:ml-20">
              {record.date_of_injury}
            </h3>
            <h3 className="text-xl w-1/6 hidden sm:inline">
              {record.return_date}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
