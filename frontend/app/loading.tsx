"use client";

import { Loading } from "@yamada-ui/loading";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen">
      <Loading variant="oval" size="3xl" color="blue.500" />
    </div>
  );
};

export default LoadingPage;
