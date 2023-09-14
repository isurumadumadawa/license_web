import React, { Suspense } from "react";
import { Routes, Navigate } from "react-router-dom";
import { Route } from "react-router";

import PSDashBoard from "../page/PSDashBoard";

function PSNavigation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/ps-dashboard" element={<PSDashBoard />} />
        <Route path="*" element={<Navigate to="/ps-dashboard" />} />
      </Routes>
    </Suspense>
  );
}

export default PSNavigation;
