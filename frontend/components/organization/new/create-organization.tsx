import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const CreateOrganizationPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    if (!name) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/organizations`,
        { name: name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log(response);
      router.push(
        `/organization?organization_id=${response.data.organization.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-10">
      <h3 className="text-2xl font-bold mb-6">組織の作成</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md relative z-0"
      >
        <input
          id="organization_name"
          type="text"
          ref={nameRef}
          placeholder=" "
          className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="organization_name"
          className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:right-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          組織名
        </label>
        <button
          type="submit"
          className="mt-6 bg-gray-500 focus:bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105 focus:scale-105"
        >
          {loading === true ? <p>loading</p> : <>作成</>}
        </button>
      </form>
    </div>
  );
};

export default CreateOrganizationPage;
