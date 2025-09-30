import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DeepResearch from "../pages/DeepResearch";
import Home from "../pages/Home";
import PolicySuggestionAgent from "../pages/PolicySuggestionAgent";
import DeepResearchNew from "../pages/DeepResearchNew";

export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deep-research" element={<DeepResearch />} />
      <Route path="/deep-research-v2" element={<DeepResearchNew />} />
      <Route path="/policy-suggest" element={<PolicySuggestionAgent />} />
      {/* Add more routes here */}
      
    </Routes>
  );
}
