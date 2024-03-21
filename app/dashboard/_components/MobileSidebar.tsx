"use client";

import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { RootState } from "@/redux/store";
import {
  onDashboardClose,
  onDashboardOpen,
} from "@/redux/features/navigationSlice";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
  }

  const { isDashboardOpen } = useAppSelector(
    (state: RootState) => state.navigation
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    dispatch(onDashboardClose());
  }, [pathname, onDashboardClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => dispatch(onDashboardOpen())}
        className="block md:hidden px-0"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-8 w-8" />
      </Button>
      <Sheet
        open={isDashboardOpen}
        onOpenChange={() => dispatch(onDashboardClose())}
      >
        <SheetContent
          side="left"
          className="p-2 bg-bgPrimary border-bgPrimary text-white h-full overflow-auto"
        >
          <div className="  py-3 pl-1.5 rounded  flex flex-col items-start gap-5">
            <Sidebar mobile />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
