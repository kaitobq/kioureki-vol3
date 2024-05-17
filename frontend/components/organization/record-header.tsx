"use client";

import { MedicalRecord } from "@/types/medical-record";
import { FC, useState } from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

interface RecordHeaderProps {
  setMedicalRecords: any;
  initialRecords: MedicalRecord[];
}

const RecordHeader: FC<RecordHeaderProps> = ({
  setMedicalRecords,
  initialRecords,
}) => {
  const [sortState, setSortState] = useState<{
    column: keyof MedicalRecord | null;
    order: string | null;
  }>({ column: null, order: null });

  const sortRecords = (key: keyof MedicalRecord) => {
    let newOrder = null;
    if (sortState.column === key && sortState.order === "asc") {
      newOrder = "desc";
    } else if (sortState.column === key && sortState.order === "desc") {
      newOrder = null;
    } else {
      newOrder = "asc";
    }

    setSortState({ column: key, order: newOrder });

    if (newOrder === null) {
      setMedicalRecords([...initialRecords]);
    } else {
      setMedicalRecords((prevRecords: MedicalRecord[]) => {
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

  return (
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
  );
};

export default RecordHeader;
