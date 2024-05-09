import axios from "axios";
import { FormEventHandler, useRef } from "react";

interface AddMedicalRecordProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeModal: () => void;
  organizationId: number;
}

const AddMedicalRecord: React.FC<AddMedicalRecordProps> = ({
  dialogRef,
  closeModal,
  organizationId,
}) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const partRef = useRef<HTMLInputElement | null>(null);
  const diagnosisRef = useRef<HTMLInputElement | null>(null);
  const treatmentStatusRef = useRef<HTMLInputElement | null>(null);
  const dateOfInjuryRef = useRef<HTMLInputElement | null>(null);
  const returnDateRef = useRef<HTMLInputElement | null>(null);
  const memoRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    const record = {
      name: nameRef.current?.value,
      part: partRef.current?.value,
      treatment_status: treatmentStatusRef.current?.value,
      memo: memoRef.current?.value,
      diagnosis: diagnosisRef.current?.value,
      date_of_injury: dateOfInjuryRef.current?.value,
      return_date: returnDateRef.current?.value,
      organization_id: organizationId,
    };

    try {
      if (Object.values(record).some((value) => !value)) {
        e.preventDefault();
        alert("Please fill out all fields.");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/medical_records?organization_id=${organizationId}`,
        record,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Record added:", response.data);
      closeModal();
    } catch (error) {
      console.error("Failed to add record:", error);
      alert("Failed to add record.");
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="p-3 w-2/3 rounded-lg border border-black"
    >
      <h1 className="text-lg text-center my-1">Add new record</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              ref: nameRef,
              placeholder: "Name",
              label: "Name",
              className: "",
            },
            {
              ref: partRef,
              placeholder: "Part",
              label: "Part",
              className: "",
            },
            {
              ref: diagnosisRef,
              placeholder: "Diagnosis",
              label: "Diagnosis",
              className: "",
            },
            {
              ref: treatmentStatusRef,
              placeholder: "Treatment Status",
              label: "Treatment Status",
              className: "",
            },
            {
              ref: dateOfInjuryRef,
              placeholder: "Date of Injury",
              label: "Date of Injury",
              className: "",
            },
            {
              ref: returnDateRef,
              placeholder: "Return Date",
              label: "Return Date",
              className: "",
            },
          ].map((input, index) => (
            <div key={index} className="relative z-0 w-full group flex">
              <input
                type="text"
                ref={input.ref}
                id={input.label.toLowerCase().replace(" ", "_")}
                className={`block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${input.className}`}
                placeholder=" "
                required
              />
              <label
                htmlFor={input.label.toLowerCase().replace(" ", "_")}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {input.label}
              </label>
            </div>
          ))}
          <textarea
            ref={memoRef}
            id="memo"
            className="textarea textarea-bordered w-full h-24 border-2 border-gray-300 rounded-md"
            placeholder=" Memo"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddMedicalRecord;