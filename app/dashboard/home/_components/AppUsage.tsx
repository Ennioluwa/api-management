"use client";

import { FC } from "react";
import ProcessedInvoices from "./ProcessedInvoices";
import TotalExpenses from "./TotalExpenses";
import ApiRequests from "./ApiRequests";

interface AppUsageProps {}

const AppUsage: FC<AppUsageProps> = ({}) => {
  return (
    <div className=" text-white bg-bgPrimary p-6 rounded-lg">
      <h5 className=" font-bold">App Usage</h5>
      <p className=" text-xs pt-3">
        View your daily, weekly, and monthly usage of the service via this
        oversimplified overview interface to help you understand how you are
        using the service.
      </p>

      <div className=" pt-6 flex flex-wrap flex-col lg:flex-row gap-6 items-stretch justify-between w-full">
        <ProcessedInvoices />
        <TotalExpenses />
        <ApiRequests />
      </div>
    </div>
  );
};

export default AppUsage;
