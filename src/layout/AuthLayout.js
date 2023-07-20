import React from "react";
import { AppShell } from "@mantine/core";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { DTMNavigation } from "../navigation";

function AuthLayout() {
  return (
    <>
      <AppShell
        padding="md"
        layout="default"
        header={<Header />}
        navbar={<Navbar />}
      >
        {sessionStorage.getItem("roleId") == 2 ? <DTMNavigation /> : null}
      </AppShell>
    </>
  );
}

export default AuthLayout;
