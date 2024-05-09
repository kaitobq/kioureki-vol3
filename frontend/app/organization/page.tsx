// pages/OrganizationPage.tsx
"use client";

import DashboardHeader from "@/components/organization/organization-header";
import MedicalRecords from "@/components/organization/medical-records";
import MedicalRecordDetail from "@/components/organization/medical-record-detail"; // 医療記録詳細コンポーネントをインポート
import { Organization } from "@/types/organization";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
  >(null); // 医療記録IDの状態

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
          // setSearchParams({ organization_id: initialOrgId }, { replace: true });
          setCurrentOrganization(
            response.data.find((o: any) => o.id.toString() === initialOrgId) ||
              null
          );
        }
      } catch (err) {
        setError("Failed to fetch organizations");
        console.error(err);
      }
      setLoading(false);
    };

    fetchOrganizations();
  }, [searchParams]);

  useEffect(() => {
    // 組織IDが変更されたときに、現在の組織を更新します
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

  // 医療記録IDが設定されている場合、詳細ページを表示します
  if (currentMedicalRecordId) {
    return (
      <MedicalRecordDetail
        recordId={currentMedicalRecordId}
        searchParams={searchParams}
      />
    );
    console.log("medicl", currentMedicalRecordId);
  }

  // 医療記録IDが設定されていない場合、医療記録の一覧を表示します
  return (
    <div>
      <DashboardHeader
        organizations={organizations}
        currentOrganization={currentOrganization}
        setCurrentOrganization={(org: Organization) => {
          setCurrentOrganization(org);
          // setSearchParams(
          //   { organization_id: org?.id.toString() },
          //   { replace: true }
          // );
          router.push(
            pathname +
              "?" +
              createQueryString("organization_id", org?.id.toString())
          );
        }}
      />
      <h1>Organizations: {currentOrganization?.name}</h1>
      {currentOrganization && (
        <MedicalRecords
          organizationId={currentOrganization.id}
          setCurrentMedicalRecordId={setCurrentMedicalRecordId}
        />
      )}
    </div>
  );
};

export default OrganizationPage;
