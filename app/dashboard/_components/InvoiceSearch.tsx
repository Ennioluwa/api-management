import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import {
  Transaction,
  fetchInvoices,
  fetchInvoicesById,
} from "@/lib/hooks/api/invoices.api";
import { formatter } from "@/lib/utils";
import { useRouter } from "next/navigation";

const InvoiceSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(true);

  const searchRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { isPending, data: invoice } = useQuery({
    queryKey: ["invoiceKey", { debouncedSearchTerm }],
    queryFn: () => fetchInvoicesById({ invoiceId: debouncedSearchTerm }),
    retry: false,
  });

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <>
      <div className=" grow hidden md:block max-w-xl">
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
                handleClose={() => {
                  setSearchTerm("");
                  searchRef?.current?.focus();
                }}
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
            {!isPending && invoice !== undefined ? (
              <div className=" bg-white rounded-lg p-5 shadow border-[1px] border-gray-100 flex flex-col gap-3 ">
                <div className=" flex items-start gap-5">
                  <div className=" p-3 bg-[#F0F4F9] rounded-full shrink-0">
                    <DocumentFilter variant="Bulk" size={30} color="#0062FF" />
                  </div>
                  <div className=" flex flex-col gap-3">
                    <h5 className=" font-bold">Invoice Details</h5>
                    <p className=" text-xs flex gap-2 items-center">
                      Amount{" "}
                      <span className=" font-bold">
                        ${invoice.totalTaxableAmount}
                      </span>
                    </p>
                    <p className=" text-xs flex gap-2 items-center">
                      No. of Items{" "}
                      <span className=" font-bold">
                        {invoice.totalItemCount}
                      </span>
                    </p>
                  </div>
                  {/* <span
                    className={`${
                      invoice.uploadStatus.toLowerCase() === "error"
                        ? "bg-red-400/10 text-red-400"
                        : invoice.uploadStatus.toLowerCase() === "pending"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-green-400/10 text-green-400"
                    } ml-auto p-1 px-3 rounded text-xs"`}
                  >
                    {invoice.uploadStatus}
                  </span> */}
                </div>
                <hr />
                <div className="flex gap-3 items-center text-xs">
                  <TimerStart variant="Bulk" size={18} />
                  {/* <p>{formatter?.format(new Date(invoice.validatedDate))}</p> */}
                  <Button
                    className=" ml-auto font-bold text-xs"
                    variant="ghost"
                    onClick={() => {
                      router.push(
                        `/dashboard/invoices/${invoice.invoiceNumber}`
                      );
                      setOpen(false);
                    }}
                  >
                    INVOICE DETAILS &rarr;
                  </Button>
                </div>
              </div>
            ) : (
              <p className=" text-center">Nothing found for that Query</p>
            )}
            {isPending && (
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
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default InvoiceSearch;
