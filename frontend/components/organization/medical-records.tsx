"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MdNoteAdd } from "react-icons/md";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import { Loading } from "@yamada-ui/loading";
import axios from "axios";
import Link from "next/link";

import AddMedicalRecord from "@/components/organization/add-medical-record";
import MedicalRecordDetail from "@/components/organization/medical-record-detail";
import { MedicalRecord } from "@/types/medical-record";
import CustomButton from "@/components/common/button";
import RecordHeader from "./record-header";

interface MedicalRecordsProps {
  organizationId: number;
}

const MedicalRecords: React.FC<MedicalRecordsProps> = ({ organizationId }) => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [initialRecords, setInitialRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [currentMedicalRecordId, setCurrentMedicalRecordId] = useState<
    number | null
  >(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/medical_records`,
          {
            params: { organization_id: organizationId },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMedicalRecords(response.data);
        setInitialRecords(response.data);
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
    return (
      <div>
        <Loading variant="oval" size="3xl" color="red.500" />
      </div>
    );
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
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

  if (currentMedicalRecordId) {
    return (
      <MedicalRecordDetail
        recordId={currentMedicalRecordId}
        searchParams={searchParams}
      />
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-5 ">
      <div className="w-11/12 m-2 mr-2 flex justify-end">
        <CustomButton onClick={openModal} display="flex" items="center">
          追加 <MdNoteAdd className="size-5" />
        </CustomButton>
      </div>
      <AddMedicalRecord
        dialogRef={dialogRef}
        closeModal={closeModal}
        organizationId={organizationId}
      />
      <div className="w-11/12 bg-white shadow-md px-1 sm:px-5 rounded-md">
        {medicalRecords.length > 0 ? (
          <>
            <RecordHeader
              setMedicalRecords={setMedicalRecords}
              initialRecords={initialRecords}
            />

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
          </>
        ) : (
          <div>No records found</div>
        )}
      </div>
      {/* <div className="w-full sm:hidden fixed bottom-0 bg-white">
        <CustomButton onClick={openModal} display="flex" items="center">
          追加 <MdNoteAdd className="size-5" />
        </CustomButton>
      </div> */}
    </div>
  );
};

export default MedicalRecords;
