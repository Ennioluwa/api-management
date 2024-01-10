"use client";

import IsAdminAuth from "@/components/isAdminAuth";
import { useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { FC, ReactNode, useLayoutEffect } from "react";

interface AuthenticatedProps {
  children: ReactNode;
}

const Authenticated: FC<AuthenticatedProps> = ({ children }) => {
  const { userData } = useAppSelector((state) => state.user);
  useLayoutEffect(() => {
    // add this to protect the route || userData.setupStatus !== "Completed"
    if (!userData) {
      console.log("no user");

      return redirect("/login");
    } else return;
  }, []);
  return <>{children}</>;
};

export default IsAdminAuth(Authenticated);
