"use client";

import { Button } from "@/components/ui/button";
import { Code, UserCirlceAdd } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface SidebarProps {}

const navItems = [
  { name: "Home", link: "/" },
  { name: "About us", link: "/about" },
  { name: "Support", link: "/support" },
  { name: "Documentation", link: "/documentation" },
  { name: "Contact us", link: "/contact" },
];

const Sidebar: FC<SidebarProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div className="   w-full h-full py-14 pr-5 overflow-auto text-white">
      <div className=" flex flex-col gap-1 font-bold">
        {navItems.map((item, index) => {
          const active = pathname === item.link;
          return (
            <Link
              key={index + item.link}
              href={item.link}
              className={`${
                active ? " bg-white text-bgPrimary" : "text-white"
              } px-5 h-12 text-nowrap inline-flex items-center`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <div className=" flex flex-col gap-3 pl-5 mt-10">
        <Button
          variant={"outline"}
          className=" inline-flex items-center w-full font-bold"
        >
          REQUEST A DEMO
        </Button>
        <Link href="/login">
          <Button className=" border border-white rounded-lg w-full">
            GET STARTED
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
