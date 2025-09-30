import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DeepResearch from "../pages/DeepResearch";

export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/deep-research" />} />
      <Route path="/deep-research" element={<DeepResearch />} />
      {/* Add more routes here */}
      <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>} />
    </Routes>
  );
}
