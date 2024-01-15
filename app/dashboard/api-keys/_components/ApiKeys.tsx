"use client";

import { Edit, More, ShieldSecurity } from "iconsax-react";

const ApiKeys = () => {
  return (
    <div className=" rounded-lg bg-white p-5 mt-5">
      <h3 className=" font-bold pb-2.5 ">API IDs and Keys</h3>
      <p className=" w-full md:w-2/3 lg:w-1/2 text-xs pb-6">
        View all API IDs and Keys that you have created to generate Invoices
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className=" p-5 border border-dashed border-[#9A9AAF] rounded-lg col-span-1 flex flex-col gap-2 "
          >
            <div className="flex justify-between items-start gap-5">
              <h6 className=" text-3xl font-bold">Reconnection</h6>
              <input type="checkbox" name="active" id="api" />
            </div>
            <p>
              API ID: <span className=" font-bold">923301295780</span>
            </p>
            <p className=" text-xs">
              REQUESTS MADE: <span className=" font-bold">419</span>
            </p>
            <p className=" text-xs">
              REQUESTS COMPLETED: <span className=" font-bold">273</span>
            </p>
            <p className=" text-xs">22/2/2022 3:45:01 PM</p>
            <hr className=" border-dashed border-[#9A9AAF)]" />
            <div className="flex items-center justify-between gap-5">
              <p>App Status</p>
              <p className=" text-xs px-3 py-1.5 text-[#1CA78B] bg-[#1CA78B]/10 ">
                Active
              </p>
            </div>
            <hr className=" border-dashed border-[#9A9AAF)]" />
            <div className="flex items-center gap-2">
              <ShieldSecurity variant="Bulk" size={20} />
              <span>Administrator</span>
              <div className=" ml-auto">
                <Edit size={20} />
              </div>
              <span className=" h-8 w-8 rounded-full bg-[#F0F4F9] text-black font-bold grid place-items-center ">
                3
              </span>
              <div className=" ml-auto">
                <More size={20} className="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiKeys;
