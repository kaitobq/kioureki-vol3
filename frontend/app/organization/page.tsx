"use client";

import { Suspense, useState } from "react";

import OrganizationHeader from "@/components/organization/organization-header";
import MedicalRecords from "@/components/organization/medical-records";
import Setting from "@/components/organization/setting";
import useOrganization from "@/components/organization/useOrganization";
import LoadingPage from "../loading";

export type activeMenus = "Database" | "Setting";

const OrganizationPage = () => {
  const [active, setActive] = useState<activeMenus>("Database");

  const { organizations, loading, error, currentOrganization } =
    useOrganization();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="w-full h-screen bg-slate-200">
        <OrganizationHeader
          organizations={organizations}
          currentOrganization={currentOrganization}
          active={active}
          setActive={setActive}
        />
        {currentOrganization && active === "Database" ? (
          <MedicalRecords organizationId={currentOrganization.id} />
        ) : null}
        {currentOrganization && active === "Setting" ? <Setting /> : null}
      </div>
    </Suspense>
  );
};

export default OrganizationPage;
