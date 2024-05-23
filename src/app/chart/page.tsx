"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the Chart component with no SSR
const Chart = dynamic(() => import("@/components/Charts/page"), { ssr: false });

const BasicChartPage: React.FC = () => {
  return <Chart />;
};

export default BasicChartPage;
