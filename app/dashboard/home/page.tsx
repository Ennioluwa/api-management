"use client";

import { useState } from "react";
import Activities from "./_components/Activities";
import AppUsage from "./_components/AppUsage";
import EarningReport from "./_components/EarningReport";
import InvoiceProcessing from "./_components/InvoiceProcessing";

const Home = () => {
  const [date, setDate] = useState("today");

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
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className=" col-span-1 lg:col-span-2 flex flex-col gap-5 h-full">
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
