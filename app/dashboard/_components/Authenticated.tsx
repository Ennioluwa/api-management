"use client";

import IsAdminAuth from "@/components/isAdminAuth";
import { useAppSelector } from "@/lib/hooks";
import { fetchUsers } from "@/lib/hooks/api/users.api";
import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useLayoutEffect } from "react";

interface AuthenticatedProps {
  children: ReactNode;
}

const Authenticated: FC<AuthenticatedProps> = ({ children }) => {
  const { userData } = useAppSelector((state) => state.user);

  const pathName = usePathname();

  useLayoutEffect(() => {
    if (!userData) {
      console.log("no user");
      return redirect("/login");
    } else if (userData.setupStatus === "AccountCreated") {
      return redirect("/kyc/business-information");
    } else if (userData.setupStatus === "CompanyCreated") {
      return redirect("/kyc/business-identity");
    } else if (userData.changePassword === true) {
      return redirect("/change-password");
    } else if (
      userData.companyStatus === "Pending" &&
      pathName !== "/dashboard/home" &&
      pathName !== "/dashboard/subscription"
    ) {
      redirect("/dashboard/home");
    } else return;
  }, [pathName]);

  return <>{children}</>;
};

export default IsAdminAuth(Authenticated);
