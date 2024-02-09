import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { Search } from "./SearchInput";
import { useDebounce } from "@/components/ui/multiple-selector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { DocumentFilter, TimerStart } from "iconsax-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/Loader";
import { ThreeCircles } from "react-loader-spinner";

const InvoiceSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(true);

  const searchRef = useRef(null);

  function closePopover() {
    setOpen(false);
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  if (debouncedSearchTerm) {
  }

  return (
    <>
      <div className=" grow hidden md:block">
        <Popover open={!!debouncedSearchTerm && open} onOpenChange={setOpen}>
          <PopoverTrigger
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            asChild
          >
            <div className="relative">
              <Search
                value={searchTerm}
                onChange={handleSearch}
                ref={searchRef}
                onFocus={() => setOpen(true)}
                placeholder="Search for Invoices..."
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            align="start"
            className="p-6 flex flex-col gap-2 w-[var(--radix-popover-trigger-width)] h-full bg-white"
          >
            <p className=" text-xl font-bold">
              Search Result for &quot;{debouncedSearchTerm}&quot;
            </p>
            <div className=" bg-white rounded-lg p-5 shadow border-[1px] border-gray-100 flex flex-col gap-3 ">
              <div className=" flex items-start gap-5">
                <div className=" p-3 bg-[#F0F4F9] rounded-full shrink-0">
                  <DocumentFilter variant="Bulk" size={30} color="#0062FF" />
                </div>
                <div className=" flex flex-col gap-3">
                  <h5 className=" font-bold">Invoice Details</h5>
                  <p className=" text-xs flex gap-2 items-center">
                    Amount <span className=" font-bold">$951, 764</span>
                  </p>
                  <p className=" text-xs flex gap-2 items-center">
                    No. of Items <span className=" font-bold">17</span>
                  </p>
                </div>
                <span className=" ml-auto p-1 px-3 bg-green-400/10 text-green-400 rounded text-xs">
                  Successful
                </span>
              </div>
              <hr />
              <div className="flex gap-3 items-center text-xs">
                <TimerStart variant="Bulk" size={18} />
                <p>07/3/2023 9:45:01 PM</p>
                <Link href={`/dashboard/invoice`}></Link>
                <Button className=" ml-auto font-bold text-xs" variant="ghost">
                  LEARN MORE &rarr;
                </Button>
              </div>
            </div>
            <div className=" w-full grid place-items-center">
              <div className=" w-[88px] h-[88px] rounded-full bg-white grid place-items-center ">
                <ThreeCircles
                  visible={true}
                  height="48"
                  width="48"
                  color="#4fa94d"
                  ariaLabel="three-circles-loading"
                  innerCircleColor="#2D2D2D"
                  middleCircleColor="#D9D9D9"
                  outerCircleColor="#D9D9D9"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default InvoiceSearch;
