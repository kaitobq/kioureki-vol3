"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.length === 0) {
          setError("No organizations found");
        } else {
          setOrganizations(response.data);
        }
      } catch (err) {
        setError("Failed to fetch organizations");
        console.error(err);
      }
      setLoading(false);
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Organizations</h1>
      {organizations.length > 0 ? (
        <ul>
          {organizations.map((org) => (
            <li key={org.id}>{org.name}</li>
          ))}
        </ul>
      ) : (
        <p>No organizations available.</p>
      )}
    </div>
  );
};

export default OrganizationPage;
