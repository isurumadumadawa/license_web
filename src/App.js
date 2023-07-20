import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";

import { getUserFromLocalStorage } from "./app/slices/LoginSlice";
import "./App.css";

import Layout from "./layout";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, []);
  return (
    <MantineProvider>
      <BrowserRouter>
        <Notifications position="top-right" />
        <Layout />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
