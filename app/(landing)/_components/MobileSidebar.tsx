"use client";

import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { RootState } from "@/redux/store";
import { onClose, onOpen } from "@/redux/features/navigationSlice";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
  }

  const { isOpen } = useAppSelector((state: RootState) => state.navigation);
  const dispatch = useAppDispatch();

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
