"use client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrganizationPage from "./organization/page";
import DashboardPage from "./page";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <main>{children}</main> */}
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/dashboard/organization"
            element={<OrganizationPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
