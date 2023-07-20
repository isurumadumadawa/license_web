import React, { Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import { Routes } from "react-router";

import LoginPage from "../page/LoginPage";
import RegisterPage from "../page/RegisterPage";

function UnauthNavigation() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}

export default UnauthNavigation;
