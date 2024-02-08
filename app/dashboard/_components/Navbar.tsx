"use client";

import Logo from "@/app/(landing)/_components/Logo";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { Messages1, NotificationBing } from "iconsax-react";
import { FC } from "react";
import { Search } from "./SearchInput";
import IsAdminAuth from "@/components/isAdminAuth";
import { MobileSidebar } from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);

  let newRole = "Member";

  const OPTIONS = [
    { label: "Super Admin", value: "ClientAdmins" },
    {
      label: "Sales Representative",
      value: "ClientSalesReps",
    },
    {
      label: "Finance Officers",
      value: "ClientFinanceOfficers",
    },
  ];

  const handleRole = (role?: string) => {
    if (role === "ClientAdmins") {
      newRole = "Admin";
    } else if (role === "ClientSalesReps") {
      newRole = "Sales Rep.";
    } else if (role === "ClientFinanceOfficers") {
      newRole = "Finance Officer";
    } else {
      newRole = "Member";
    }

    return newRole;
  };
  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-16  px-3 bg-white border-b z-40 shadow grid place-items-center">
      <div className="flex items-center justify-between w-full gap-5 md:gap-12">
        <div className=" flex items-center gap-3 shrink-0">
          <MobileSidebar />
          {/* <HambergerMenu size={30} className=" cursor-pointer" /> */}
          <Logo />
        </div>

        <div className=" grow hidden md:block">
          <Search className="" />
        </div>
        <div className=" flex items-center gap-5">
          <Messages1 variant="Bulk" size={30} />
          <NotificationBing variant="Bulk" size={30} />
          <Popover>
            <PopoverTrigger asChild>
              <div className=" flex flex-col cursor-pointer">
                <p>{userData?.firstName}</p>
                <p>
                  {userData?.roles[0]
                    ? handleRole(userData?.roles[0])
                    : "Member"}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-full p-3 flex flex-col gap-2 bg-white"
            >
              <Link href="/dashboard/settings" className=" w-full">
                <Button
                  variant="ghost"
                  className=" w-full border-none outline-none ring-0 focus:outline-none focus:ring-0"
                >
                  Edit Account
                </Button>
              </Link>
              <hr className=" border-dashed border-[#9A9AAF] " />
              <Link href="/login" className=" w-full">
                <Button
                  variant="ghost"
                  className=" w-full border-none outline-none ring-0 focus:outline-none focus:ring-0"
                >
                  Log Out
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default IsAdminAuth(Navbar);
