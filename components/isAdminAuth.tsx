"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser } from "@/redux/features/userSlice";

export default function IsAdminAuth(Component: any) {
  return function IsAdminAuth(props: any) {
    const [auth, setAuth] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
      const auth = localStorage.getItem("access-token");
      const userData = localStorage.getItem("userData");
      console.log(auth, userData);

      if (!auth) {
        console.log("no access token");
        return redirect("/login");
      }
      if (!userData) {
        console.log("no userData in state");
        return redirect("/login");
      }
      setAuth(auth);
      setUserData(userData);
      dispatch(loginUser(JSON.parse(userData)));
    }, []);

    if (!userData || !auth) return;

    return <Component {...props} />;
  };
}
