import React, { Suspense } from "react";
import { Routes, Navigate } from "react-router-dom";
import { Route } from "react-router";

import DMTDashBoard from "../page/DMTDashBoard";
import DMTDriverRegistration from "../page/DMTDriverRegistration";

function DTMNavigation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dmt-dashboard" element={<DMTDashBoard />} />
        <Route
          path="/dmt-driver-registration"
          element={<DMTDriverRegistration />}
        />
        <Route path="*" element={<Navigate to="/dmt-dashboard" />} />
      </Routes>
    </Suspense>
  );
}

export default DTMNavigation;
