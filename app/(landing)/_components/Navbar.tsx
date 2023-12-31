"use client";

import { Button } from "@/components/ui/button";
import { Code, UserCirlceAdd } from "iconsax-react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About us", link: "/about" },
  { name: "Support", link: "/support" },
  { name: "Documentation", link: "/documentation" },
  { name: "Contact us", link: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-[80px]  p-5 lg:px-10  bg-white border-b z-40 shadow">
      <div className="md:container flex items-center justify-between w-full">
        <div className=" flex items-center relative gap-5">
          <Logo />
          <div className=" w-full shrink- hidden lg:block">
            {navItems.map((item, index) => {
              const active = pathname === item.link;
              return (
                <Link
                  key={index + item.link}
                  href={item.link}
                  className={`${
                    active && "border-b-[3px] border-bgPrimary"
                  } px-5 py-[10px] text-nowrap`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" items-center gap-3 hidden lg:flex">
          <Button variant={"outline"}>
            <Code variant="Bold" size="18px" />
            REQUEST A DEMO
          </Button>
          <Button>
            <UserCirlceAdd variant="Bold" size="18px" />
            GET STARTED
          </Button>
        </div>
        <MobileSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
