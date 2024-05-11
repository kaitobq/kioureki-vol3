import React, { useCallback, useState } from "react";
import Link from "next/link";
import { FaUserInjured } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Organization } from "@/types/organization";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface OrganizationHeaderProps {
  organizations: Organization[];
  setCurrentOrganization: (org: Organization) => void;
  currentOrganization: Organization | null;
}

const OrganizationHeader: React.FC<OrganizationHeaderProps> = ({
  organizations,
  setCurrentOrganization,
  currentOrganization,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSetCurrentOrganization = (org: Organization) => {
    setCurrentOrganization(org);
    // setSearchParams({ organization_id: org.id.toString() });
    router.push(
      pathname + "?" + createQueryString("organization_id", org.id.toString())
    );
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col justify-center items-center py-3 bg-slate-200">
      <header className="bg-gradient-to-r from-gray-800 to-blue-800 text-white w-3/5 rounded-full shadow-md shadow-black">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href={"/"} className="flex items-center">
            <FaUserInjured size={30} />
            <span className="text-lg font-bold">Kioureki</span>
          </Link>
          <div className="flex flex-row">
            <div className="relative">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold mx-2 py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105"
                onClick={() => setIsOpen(!isOpen)}
              >
                {currentOrganization
                  ? currentOrganization.name
                  : "Select Organization"}
                {isOpen ? "↑" : "↓"}
              </button>
              {isOpen && (
                <ul className="absolute bg-slate-100 shadow-lg rounded w-full flex flex-col items-center left-1/2 transform -translate-x-1/2">
                  {organizations.map((org) => (
                    <li
                      key={org.id}
                      className={`m-0.5 px-4 py-2 cursor-pointer rounded-lg ${currentOrganization && currentOrganization.id === org.id ? "bg-gray-800 hover:bg-gray-600" : "bg-blue-800 hover:bg-blue-600"}`}
                      onClick={() => handleSetCurrentOrganization(org)}
                    >
                      {org.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a
              href={`organization/setting?organization_id=${currentOrganization?.id}`}
              className="flex items-center text-xl hover:rotate-90 ease-in-out duration-300"
            >
              <IoSettingsSharp />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default OrganizationHeader;
