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
    if (!userData) {
      console.log("no user");
      return redirect("/login");
    } else if (userData.setupStatus === "AccountCreated") {
      return redirect("/kyc/business-information");
    } else if (userData.setupStatus === "CompanyCreated") {
      return redirect("/kyc/business-identity");
    } else return;
  }, []);
  return <>{children}</>;
};

export default IsAdminAuth(Authenticated);
