// pages/dashboard/organization/medicalrecords.tsx
"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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

  // if (medicalRecords.length === 0) {
  //   return <div>No medical records found for this organization.</div>;
  // }

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
    <div className="w-full flex flex-col items-center my-5">
      <h2>Medical Records</h2>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Modal
      </button>
      <AddMedicalRecord
        dialogRef={dialogRef}
        closeModal={closeModal}
        organizationId={organizationId}
      />
      <div className="w-11/12 border border-gray-600 px-5 rounded-lg">
        {medicalRecords.map((record) => (
          <Link
            key={record.id}
            className="flex flex-row w-full p-2 bg-gray-100 my-2 rounded-lg border border-black cursor-pointer"
            href={{
              pathname: "/organization",
              query: {
                organization_id: organizationId,
                medical_record_id: record.id,
              },
            }}
            onClick={() => setCurrentMedicalRecordId(record.id)}
          >
            <h1 className="text-xl m-1 px-5">{record.name}</h1>
            <h3 className="text-xl m-1 px-5">{record.part}</h3>
            <h3 className="text-xl m-1 px-5">{record.diagnosis}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
