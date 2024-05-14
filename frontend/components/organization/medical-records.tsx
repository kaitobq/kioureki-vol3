"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import { MedicalRecord } from "@/types/medical-record";
import Link from "next/link";
import AddMedicalRecord from "./add-medical-record";
import MedicalRecordDetail from "./medical-record-detail";
import { useSearchParams } from "next/navigation";
import { Loading } from "@yamada-ui/loading";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

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
  // const [sortOrder, setSortOrder] = useState<string | null>("asc");
  const [sortState, setSortState] = useState<{
    column: keyof MedicalRecord | null;
    order: string | null;
  }>({ column: null, order: null });

  const sortRecords = (key: keyof MedicalRecord) => {
    let newOrder = null;
    if (sortState.column === key && sortState.order === "asc") {
      newOrder = "desc";
    } else if (sortState.column === key && sortState.order === "desc") {
      newOrder = null; // ソート解除
    } else {
      newOrder = "asc";
    }

    setSortState({ column: key, order: newOrder });

    if (newOrder === null) {
      setMedicalRecords([...initialRecords]);
    } else {
      setMedicalRecords((prevRecords) => {
        return [...prevRecords].sort((a, b) => {
          if (newOrder === "asc") {
            return a[key] > b[key] ? 1 : -1;
          } else {
            return a[key] < b[key] ? 1 : -1;
          }
        });
      });
    }
  };

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
    <div className="w-full flex flex-col items-center py-5 bg-slate-200">
      <div className="w-11/12 flex justify-end">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row my-3"
        >
          追加 <MdNoteAdd className="size-5" />
        </button>
      </div>
      <AddMedicalRecord
        dialogRef={dialogRef}
        closeModal={closeModal}
        organizationId={organizationId}
      />
      <div className="w-11/12 bg-white shadow-md px-1 sm:px-5 rounded-md">
        {medicalRecords.length > 0 ? (
          <>
            <div className="flex flex-row my-2 p-2 bg-gray-200 rounded-t-md *:text-sm *:text-gray-500 *:font-sans *:font-semibold sm:*:w-1/6 border-b border-gray-300">
              <h5
                onClick={() => sortRecords("name")}
                className="w-1/3 flex items-center cursor-pointer"
              >
                名前
                {sortState.column === "name" ? (
                  sortState.order === "asc" ? (
                    <TiArrowSortedUp />
                  ) : sortState.order === "desc" ? (
                    <TiArrowSortedDown />
                  ) : (
                    <TiArrowUnsorted />
                  )
                ) : (
                  <TiArrowUnsorted />
                )}
              </h5>
              <h5
                onClick={() => sortRecords("part")}
                className="w-1/3 flex items-center cursor-pointer"
              >
                受傷箇所
                {sortState.column === "part" ? (
                  sortState.order === "asc" ? (
                    <TiArrowSortedUp />
                  ) : sortState.order === "desc" ? (
                    <TiArrowSortedDown />
                  ) : (
                    <TiArrowUnsorted />
                  )
                ) : (
                  <TiArrowUnsorted />
                )}
              </h5>
              <h5
                onClick={() => sortRecords("diagnosis")}
                className="w-1/2 flex items-center cursor-pointer"
              >
                診断
                {sortState.column === "diagnosis" ? (
                  sortState.order === "asc" ? (
                    <TiArrowSortedUp />
                  ) : sortState.order === "desc" ? (
                    <TiArrowSortedDown />
                  ) : (
                    <TiArrowUnsorted />
                  )
                ) : (
                  <TiArrowUnsorted />
                )}
              </h5>
              <h5
                onClick={() => sortRecords("date_of_injury")}
                className="w-1/2 flex items-center sm:ml-20 cursor-pointer"
              >
                受傷日
                {sortState.column === "date_of_injury" ? (
                  sortState.order === "asc" ? (
                    <TiArrowSortedUp />
                  ) : sortState.order === "desc" ? (
                    <TiArrowSortedDown />
                  ) : (
                    <TiArrowUnsorted />
                  )
                ) : (
                  <TiArrowUnsorted />
                )}
              </h5>
              <h5
                onClick={() => sortRecords("return_date")}
                className="hidden sm:flex items-center cursor-pointer"
              >
                復帰日
                {sortState.column === "return_date" ? (
                  sortState.order === "asc" ? (
                    <TiArrowSortedUp />
                  ) : sortState.order === "desc" ? (
                    <TiArrowSortedDown />
                  ) : (
                    <TiArrowUnsorted />
                  )
                ) : (
                  <TiArrowUnsorted />
                )}
              </h5>
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
          </>
        ) : (
          <div>No records found</div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
