"use client";

import isAdminAuth from "@/components/isAdminAuth";
import { useAppSelector } from "@/lib/hooks";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <div>
      Navbar
      {userData?.firstName}
    </div>
  );
};

export default isAdminAuth(Navbar);
