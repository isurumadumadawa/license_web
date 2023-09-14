import React from "react";
import { AppShell } from "@mantine/core";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { DTMNavigation, PSNavigation } from "../navigation";

function AuthLayout() {
  return (
    <>
      <AppShell
        padding="md"
        layout="default"
        header={<Header />}
        navbar={sessionStorage.getItem("roleId") == 2 ? <Navbar /> : null}
      >
        {sessionStorage.getItem("roleId") == 2 ? <DTMNavigation /> : null}
        {sessionStorage.getItem("roleId") == 4 ? <PSNavigation /> : null}
      </AppShell>
    </>
  );
}

export default AuthLayout;
