"use client";

import { useState } from "react";
import Activities from "./_components/Activities";
import AppUsage from "./_components/AppUsage";
import EarningReport from "./_components/EarningReport";
import InvoiceProcessing from "./_components/InvoiceProcessing";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Accumulations from "./_components/Accumulations";
import TotalExpenses from "./_components/TotalExpenses";
import ProcessedInvoices from "./_components/ProcessedInvoices";
import ApiRequests from "./_components/ApiRequests";
import { StatusUp, UserTag } from "iconsax-react";
import { setCompanyStatus } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Home = () => {
  const [date, setDate] = useState("today");

  const { userData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const router = useRouter();

  if (userData?.companyStatus === "Pending") {
    return (
      <div className="lg:container flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h1 className=" font-bold text-4xl text-dark">Overview</h1>
          <div className=" font-bold p-3 flex items-center gap-5 justify-between bg-[#A71C1C] text-white rounded-lg text-xs">
            <p>
              You need to pay for a service subscription first before you can
              make use of the system.
            </p>
            <button
              onClick={() => {
                dispatch(setCompanyStatus("Completed"));
                toast.success("User subscription success");
                router.refresh();
              }}
              className=" bg-[#F0F4F9] rounded-lg px-10 py-3 text-[#A71C1C] "
            >
              REFRESH
            </button>
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className=" col-span-1 lg:col-span-2 flex flex-col gap-5 h-full">
              <Accumulations />
            </div>
            <div className=" col-span-1 flex flex-col gap-5">
              <ProcessedInvoices empty />
              <TotalExpenses empty />
              <ApiRequests empty />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-8 bg-white rounded-lg">
            <StatusUp
              variant="Bulk"
              color="#0062FF"
              className=" h-[100px] w-[100px]"
            />
            <h6 className=" font-bold pt-4 pb-2">There are no users yet.</h6>
            <p>Click Add to create new users</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:container flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <h1 className=" font-bold text-4xl text-dark">Dashboard</h1>
        <div className=" rounded bg-white flex gap-1 items-center w-fit">
          <p
            onClick={() => setDate("today")}
            className={`px-2 py-1 rounded cursor-pointer ${
              date === "today"
                ? " bg-bgPrimary text-white"
                : "bg-transparent text-black"
            }`}
          >
            Today
          </p>
          <p
            onClick={() => setDate("week")}
            className={`px-2 py-1 rounded cursor-pointer ${
              date === "week"
                ? " bg-bgPrimary text-white"
                : "bg-transparent text-black"
            }`}
          >
            This week
          </p>
          <p
            onClick={() => setDate("month")}
            className={`px-2 py-1 rounded cursor-pointer ${
              date === "month"
                ? " bg-bgPrimary text-white"
                : "bg-transparent text-black"
            }`}
          >
            This month
          </p>
        </div>
      </div>

      <AppUsage />
      <div className=" grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className=" col-span-1 xl:col-span-2 flex flex-col gap-5 h-full">
          <EarningReport />
          <InvoiceProcessing />
        </div>
        <div className=" col-span-1">
          <Activities />
        </div>
      </div>
    </div>
  );
};

export default Home;
