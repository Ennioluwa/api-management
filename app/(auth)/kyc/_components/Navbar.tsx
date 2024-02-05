"use client";

import IsAdminAuth from "@/components/isAdminAuth";
import { useAppSelector } from "@/lib/hooks";
import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <nav className="fixed top-0 left-0 w-full px-5 h-20 grid place-items-center  text-dark bg-white shadow-sm z-50">
      <div className="lg:container flex items-center justify-between gap-5 w-full">
        <div>
          <h5 className=" font-bold mb-1">Setup your account</h5>
          <p className=" text-xs">Takes approximately 10 minutes</p>
        </div>
        <div className=" flex items-center gap-2">
          {/* <p className="shrink-0 h-8 w-8 rounded-full bg-gray-200"></p> */}
          <p className=" text-sm font-semibold">
            Hello, <span className=" font-bold">{userData?.firstName}</span>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default IsAdminAuth(Navbar);
