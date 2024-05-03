"use client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrganizationPage from "./page";

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
          <Route
            path="/dashboard/organization"
            element={<OrganizationPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
