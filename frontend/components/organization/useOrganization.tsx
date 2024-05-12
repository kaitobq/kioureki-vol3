"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { Organization } from "@/types/organization";

const useOrganization = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentOrganization, setCurrentOrganization] =
    useState<Organization | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
          "https://kioureki-vol3.onrender.com/api/organizations",
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
  }, [searchParams, createQueryString, pathname, router]);

  return { organizations, loading, error, currentOrganization };
};

export default useOrganization;
