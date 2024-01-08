"use client";

import Logo from "@/app/(landing)/_components/Logo";
import isAdminAuth from "@/components/isAdminAuth";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { Message, Notification } from "iconsax-react";
import { FC } from "react";
import { Search } from "./SearchInput";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-20  px-3 py-3 bg-white border-b z-40 shadow grid place-items-center">
      <div className="flex items-center justify-between w-full gap-5">
        <Logo />
        <div className=" grow">
          <Search className=" max-w-80 " />
        </div>
        <div className=" flex items-center gap-5">
          <Message />
          <Notification />
          <div className=" flex flex-col">
            <p>{userData?.firstName}</p>
            <p>{userData?.roles[0] ? userData?.roles[0] : "Member"}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default isAdminAuth(Navbar);
