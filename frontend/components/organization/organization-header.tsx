import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Organization } from "@/types/organization";
import { activeMenus } from "@/app/organization/page";

interface OrganizationHeaderProps {
  organizations: Organization[];
  currentOrganization: Organization | null;
  active: activeMenus;
  setActive: (menu: activeMenus) => void;
}

const OrganizationHeader: React.FC<OrganizationHeaderProps> = ({
  organizations,
  currentOrganization,
  active,
  setActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!currentOrganization) {
      return;
    }
    router.push(
      pathname +
        "?" +
        createQueryString("organization_id", currentOrganization.id.toString())
    );
  }, [currentOrganization]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSetCurrentOrganization = (org: Organization) => {
    router.push(
      pathname + "?" + createQueryString("organization_id", org.id.toString())
    );
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="h-20 bg-white">
        <div className="h-15 border-b px-5 py-2 my-2 font-bold text-xl">
          <Link href="/">Kioureki</Link>
        </div>
        <div className="h-5 my-2 mx-5 flex items-center gap-5">
          <button
            onClick={() => setActive("Database")}
            className={`font-semibold text-sm ${
              active === "Database" ? "border-b-4 border-blue-700" : null
            }`}
          >
            Database
          </button>
          <button
            onClick={() => setActive("Setting")}
            className={`font-semibold text-sm ${
              active === "Setting" ? "border-b-4 border-blue-700" : null
            }`}
          >
            Setting
          </button>
          <div className="flex flex-col items-center px-5 font-semibold">
            <button onClick={() => setIsOpen(!isOpen)}>
              {currentOrganization ? (
                currentOrganization.name
              ) : (
                <h3 className="font-semibold text-sm">
                  Select Organization{isOpen ? "↑" : "↓"}
                </h3>
              )}
            </button>
            {isOpen && (
              <ul className="flex flex-col items-center absolute mt-7 text-center bg-white shadow-lg rounded border font-semibold text-sm">
                {organizations.map((org) => (
                  <li
                    key={org.id}
                    className={`w-fit min-w-20 m-0.5 px-2 py-0.5 cursor-pointer rounded-md ${
                      currentOrganization && currentOrganization.id === org.id
                        ? "bg-blue-700 text-white hover:bg-gray-600"
                        : "bg-white hover:shadow-lg hover:bg-gray-200"
                    }`}
                    onClick={() => handleSetCurrentOrganization(org)}
                  >
                    {org.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationHeader;
