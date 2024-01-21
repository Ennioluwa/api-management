"use client";

import { useAppSelector } from "@/lib/hooks";
import { fetchApiKeys } from "@/lib/hooks/api/apiKey.api";
import { useQuery } from "@tanstack/react-query";
import { Edit, More, ShieldSecurity } from "iconsax-react";
import { redirect, useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";

const ApiKeys = () => {
  const { userData } = useAppSelector((state) => state.user);

  const {
    isPending,
    isError,
    data: apiKeys,
    error,
    refetch,
  } = useQuery({
    queryKey: ["api"],
    queryFn: () => fetchApiKeys({ companyId: userData?.companyId }),
  });

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",

    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",

    hour12: true,
  });

  const router = useRouter();

  return (
    <div className=" rounded-lg bg-white p-5 mt-5">
      <h3 className=" font-bold pb-2.5 ">API IDs and Keys</h3>
      <p className=" w-full md:w-2/3 lg:w-1/2 text-xs pb-6">
        View all API IDs and Keys that you have created to generate Invoices
      </p>
      {isPending && (
        <div className=" w-full h-full grid place-items-center py-20">
          <PuffLoader color="#0062FF" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apiKeys !== (null || undefined) &&
          apiKeys.map((api, i) => (
            <div
              key={i}
              onClick={() => router.push(`/dashboard/api-keys/${api.apiKeyId}`)}
              className="cursor-pointer p-5 border border-dashed border-[#9A9AAF] rounded-lg col-span-1 flex flex-col gap-2 "
            >
              <div className="flex justify-between items-start gap-5">
                <h6 className=" text-3xl font-bold">
                  {api.apiKeyName || "Untitled"}
                </h6>
                {/* <input type="checkbox" name="active" id="api" /> */}
              </div>
              <p>
                API ID: <span className=" font-bold">{api.apiKeyId}</span>
              </p>
              <p className=" text-xs">
                CREATED BY: <span className=" font-bold">{api.createdBy}</span>
              </p>
              <p className=" text-xs">
                CREATED ON:{" "}
                <span className=" font-bold">
                  {formatter.format(new Date(api.created))}
                </span>
              </p>
              <p className=" text-xs">
                DEACTIVATED ON:{" "}
                <span className=" font-bold">
                  {api.deactivatedOn
                    ? formatter.format(new Date(api.deactivatedOn))
                    : "-"}
                </span>
              </p>
              <hr className=" border-dashed border-[#9A9AAF)]" />
              <div className="flex items-center justify-between gap-5">
                <p>App Status</p>
                <p
                  className={`${
                    api.isValid
                      ? "text-[#1CA78B] bg-[#1CA78B]/10"
                      : "text-[#A71C1C] bg-[#A71C1C]/10"
                  } text-xs px-3 py-1.5 rounded `}
                >
                  {api.isValid ? "Active" : "Inactive"}
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
                  {api.edits}
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
