import { useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  const router = useRouter();

  const inputs = [
    nameRef,
    partRef,
    diagnosisRef,
    treatmentStatusRef,
    dateOfInjuryRef,
    returnDateRef,
  ];

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextInput = inputs[index + 1];
      if (nextInput && nextInput.current) {
        nextInput.current.focus();
      } else {
        memoRef.current?.focus(); // 最後のinputからテキストエリアに移動
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      if (!record.name) {
        e.preventDefault();
        alert("名前が未記入です。");
        return;
      }

      if (!record.part) {
        e.preventDefault();
        alert("受傷箇所が未記入です。");
        return;
      }

      if (!record.date_of_injury) {
        e.preventDefault();
        alert("受傷日が未記入です。");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/medical_records?organization_id=${organizationId}`,
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
      router.refresh();
    } catch (error) {
      console.error("Failed to add record:", error);
      alert("Failed to add record.");
    }
  };

  return (
    <dialog ref={dialogRef} className="p-3 w-2/3 rounded-lg">
      <h1 className="text-lg text-center my-1">データを追加</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className="grid grid-cols-1 gap-4"
          style={{ transform: "scale(0.95)" }}
        >
          {[
            {
              ref: nameRef,
              placeholder: "Name",
              label: "名前*",
              className: "",
            },
            {
              ref: partRef,
              placeholder: "Part",
              label: "受傷箇所*",
              className: "",
            },
            {
              ref: diagnosisRef,
              placeholder: "Diagnosis",
              label: "診断 -Optional",
              className: "",
            },
            {
              ref: treatmentStatusRef,
              placeholder: "Treatment Status",
              label: "治療状況 -Optional",
              className: "",
            },
            {
              ref: dateOfInjuryRef,
              placeholder: "Date of Injury",
              label: "受傷日*",
              className: "",
            },
            {
              ref: returnDateRef,
              placeholder: "Return Date",
              label: "復帰日 -Optional",
              className: "",
            },
          ].map((input, index) => (
            <div key={index} className="relative z-0 w-full group flex">
              <input
                type="text"
                ref={input.ref}
                id={input.label.toLowerCase().replace(" ", "_")}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`block py-1.5 w-full rounded-none text-black text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${input.className}`}
                placeholder=" "
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
            className="textarea text-base textarea-bordered w-full h-20 border-2 border-gray-300 rounded-md"
            placeholder="メモ"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeModal}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-sm shadow transition-all transform hover:scale-105"
          >
            閉じる
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-sm shadow transition-all transform hover:scale-105"
          >
            保存
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddMedicalRecord;
