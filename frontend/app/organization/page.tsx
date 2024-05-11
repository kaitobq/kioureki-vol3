// pages/OrganizationPage.tsx
"use client";

import OrganizationHeader from "@/components/organization/organization-header";
import MedicalRecords from "@/components/organization/medical-records";
import MedicalRecordDetail from "@/components/organization/medical-record-detail"; // 医療記録詳細コンポーネントをインポート
import { Organization } from "@/types/organization";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Setting from "@/components/organization/setting";

export type activeMenus = "Database" | "Setting";

const OrganizationPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization | null>(null);
  const [currentMedicalRecordId, setCurrentMedicalRecordId] = useState<
    number | null
  >(null);
  const [active, setActive] = useState<activeMenus>("Database");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const fetchOrganizations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/organizations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.length === 0) {
          setError("No organization found");
        } else {
          setOrganizations(response.data);
          const initialOrgId =
            searchParams.get("organization_id") ||
            response.data[0].id.toString();
          router.push(
            pathname + "?" + createQueryString("organization_id", initialOrgId)
          );
          setCurrentOrganization(
            response.data.find((o: any) => o.id.toString() === initialOrgId) ||
              null
          );
        }
      } catch (err) {
        setError("Failed to fetch organizations");
        router.push("/organization/new");
        console.error(err);
      }
      setLoading(false);
    };

    fetchOrganizations();
  }, [searchParams]);

  useEffect(() => {
    const orgId = searchParams.get("organization_id");
    if (orgId && organizations.length > 0) {
      setCurrentOrganization(
        organizations.find((o) => o.id.toString() === orgId) || null
      );
    }
  }, [searchParams, organizations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (currentMedicalRecordId) {
    return (
      <MedicalRecordDetail
        recordId={currentMedicalRecordId}
        searchParams={searchParams}
      />
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-screen bg-slate-200">
        <OrganizationHeader
          organizations={organizations}
          currentOrganization={currentOrganization}
          setCurrentOrganization={(org: Organization) => {
            setCurrentOrganization(org);
            router.push(
              pathname +
                "?" +
                createQueryString("organization_id", org?.id.toString())
            );
          }}
          active={active}
          setActive={setActive}
        />
        {currentOrganization && active === "Database" ? (
          <MedicalRecords
            organizationId={currentOrganization.id}
            setCurrentMedicalRecordId={setCurrentMedicalRecordId}
          />
        ) : (
          <Setting />
        )}
      </div>
    </Suspense>
  );
};

export default OrganizationPage;
