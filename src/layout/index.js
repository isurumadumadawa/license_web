import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../app/slices/LoginSlice";
import AuthLayout from "./AuthLayout";
import UnauthLayout from "./UnauthLayout";

function Layout() {
  const [isAuth, setAuth] = useState(false);
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (sessionStorage.getItem("token")) setAuth(true);
    else setAuth(false);
  }, [auth]);

  return <>{isAuth ? <AuthLayout /> : <UnauthLayout />}</>;
}

export default Layout;
