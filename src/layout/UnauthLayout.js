import React from "react";
import { AppShell } from "@mantine/core";

import { UnauthNavigation } from "../navigation";

function UnauthLayout() {
  return (
    <>
      <AppShell padding="md" layout="alt">
        <UnauthNavigation />
      </AppShell>
    </>
  );
}

export default UnauthLayout;
