"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { onClose, onOpen } from "@/redux/features/navigationSlice";
import Sidebar from "./Sidebar";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const { isOpen } = useSelector((state: RootState) => state.navigation);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    dispatch(onClose());
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => dispatch(onOpen())}
        className="block lg:hidden px-0"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Sheet open={isOpen} onOpenChange={() => dispatch(onClose())}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};
