"use client";

import { Button } from "@/components/ui/button";
import { fetchInvoiceStats } from "@/lib/hooks/api/invoices.api";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { PuffLoader } from "react-spinners";

interface UserRolesProps {}

const UserRoles: FC<UserRolesProps> = ({}) => {
  const { isPending, data: invoiceStats } = useQuery({
    queryKey: ["invoice stats"],
    queryFn: fetchInvoiceStats,
  });

  if (isPending || !invoiceStats)
    return (
      <div className=" w-full h-full grid place-items-center py-20 bg-white rounded-lg mt-5">
        <PuffLoader color="#0062FF" />
      </div>
    );

  return (
    <div className=" rounded-lg bg-white p-5 mt-5">
      <h3 className=" font-bold pb-2.5 ">AT A GLANCE</h3>
      <p className=" w-full md:w-2/3 lg:w-1/2 text-xs pb-6">
        An intuitive way to see all your general invoices for a quick access
      </p>
      <div className="flex flex-col md:flex-row flex-wrap md:items-stretch gap-4">
        <div className=" p-5  border border-dashed border-[#9A9AAF] rounded-lg md:grow flex flex-col md:flex-row justify-center gap-3">
          <div className="space-y-1.5">
            <h6 className=" text-xs font-bold text-nowrap">TOTAL INVOICES</h6>
            <h4 className=" text-3xl font-bold">
              {invoiceStats?.totalInvoice}
            </h4>
          </div>
          <div className=" p-3 rounded-lg space-y-1 bg-[#9A9AAF]/20 w-full flex flex-col justify-center">
            <p className=" flex items-center gap-1 text-xs font-bold text-[#9a9aaf]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
              >
                <ellipse
                  cx="5.99989"
                  cy="5"
                  rx="5.55556"
                  ry="5"
                  fill="#9A9AAF"
                />
              </svg>
              <span>THIS MONTH</span>
            </p>
            <p className=" text-xs font-bold">
              {invoiceStats?.currentMonthProcessed}
            </p>
          </div>
          <div className=" p-3 rounded-lg space-y-1 bg-[#9A9AAF]/20 w-full h-full flex flex-col justify-center">
            <p className=" flex items-center gap-1 text-xs font-bold text-[#0062FF] uppercase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
              >
                <ellipse
                  cx="5.99989"
                  cy="5"
                  rx="5.55556"
                  ry="5"
                  fill="#0062FF"
                />
              </svg>
              <span>LAST MONTH</span>
            </p>
            <p className=" text-xs font-bold">
              {invoiceStats?.lastMonthProcessed}
            </p>
          </div>
        </div>
        <div className="p-5 border border-dashed border-[#9A9AAF] rounded-lg shrink space-y-1.5">
          <h6 className=" text-xs font-bold">SUCCESSFUL</h6>
          <h4 className=" text-3xl font-bold flex gap-2.5 items-baseline">
            {invoiceStats?.successInvoice}
            <span className=" text-[#1CA78B] text-base ">
              {invoiceStats?.successChange >= 0 ? "↑" : "↓"}
              {Math.abs(invoiceStats?.successChange)}%
            </span>
          </h4>
        </div>

        <div className="p-5 border border-dashed border-[#9A9AAF] rounded-lg shrink space-y-1.5">
          <h6 className=" text-xs font-bold">PENDING</h6>
          <h4 className=" text-3xl font-bold flex gap-2.5 items-baseline">
            {invoiceStats?.pendingInvoice}{" "}
            <span className=" text-[#FFCF5C] text-base ">
              {invoiceStats?.pendingChange >= 0 ? "↑" : "↓"}
              {Math.abs(invoiceStats?.pendingChange)}%
            </span>
          </h4>
        </div>

        <div className="p-5 border border-dashed border-[#9A9AAF] rounded-lg shrink space-y-1.5">
          <h6 className=" text-xs font-bold">FAILED</h6>
          <h4 className=" text-3xl font-bold flex gap-2.5 items-baseline">
            {invoiceStats?.failedInvoice}{" "}
            <span className=" text-[#A71C1C] text-base ">
              {invoiceStats?.failedChange >= 0 ? "↑" : "↓"}
              {Math.abs(invoiceStats?.failedChange)}%
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
