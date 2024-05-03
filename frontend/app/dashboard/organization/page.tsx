// pages/OrganizationPage.tsx
"use client";

import DashboardHeader from "@/components/dashboard/dashboardheader";
import MedicalRecords from "@/components/dashboard/organization/medicalrecords";
import { Organization } from "@/types/organization";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OrganizationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization | null>(null);

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
          setSearchParams({}); // どの組織もない場合はクエリパラメータをクリア
        } else {
          setOrganizations(response.data);
          const initialOrgId =
            searchParams.get("organization_id") ||
            response.data[0].id.toString();
          setSearchParams({ organization_id: initialOrgId }, { replace: true });
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

  return (
    <div>
      <DashboardHeader
        organizations={organizations}
        currentOrganization={currentOrganization}
        setCurrentOrganization={(org: Organization) => {
          setCurrentOrganization(org);
          setSearchParams(
            { organization_id: org?.id.toString() },
            { replace: true }
          );
        }}
      />
      <h1>Organizations: {currentOrganization?.name}</h1>
      {currentOrganization && (
        <MedicalRecords organizationId={currentOrganization.id} />
      )}
    </div>
  );
};

export default OrganizationPage;
