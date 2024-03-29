"use client";

import Logo from "@/app/(landing)/_components/Logo";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { MessageQuestion, Messages1, NotificationBing } from "iconsax-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import Features from "./Features";
import InvoiceSearch from "./InvoiceSearch";
import { useRouter } from "next/navigation";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-16 z-40 bg-white border-b shadow  ">
      <nav className=" px-3 h-full grid place-items-center  lg:max-w-[1650px] lg:ml-0">
        <div className="flex items-center justify-between w-full gap-5 md:gap-12">
          <div className=" flex items-center gap-3 shrink-0">
            <MobileSidebar />
            <Logo />
          </div>
          <InvoiceSearch />
          <Features />
        </div>
      </nav>
    </div>
  );
};

export default IsAdminAuth(Navbar);
