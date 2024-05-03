// pages/dashboard/organization/medicalrecords.tsx
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { MedicalRecord } from "@/types/medicalrecord"; // 医療記録の型定義をインポート

interface MedicalRecordsProps {
  organizationId: number;
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ organizationId }) => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/medical_records`,
          {
            params: { organization_id: organizationId }, // クエリパラメータを追加
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

  if (medicalRecords.length === 0) {
    return <div>No medical records found for this organization.</div>;
  }

  console.log(medicalRecords);

  return (
    <div>
      <h2>Medical Records</h2>
      <ul>
        {medicalRecords.map((record) => (
          <li key={record.id}>
            {record.name} - {record.part} - {record.diagnosis}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;
