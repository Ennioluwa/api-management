"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchApiKeys } from "@/lib/hooks/api/apiKey.api";
import { useQuery } from "@tanstack/react-query";
import { Edit, More, ShieldSecurity } from "iconsax-react";
import { Plus } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
import { onOpen } from "@/redux/features/apiKeySlice";

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
  const dispatch = useAppDispatch();

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Button
          onClick={() => dispatch(onOpen())}
          className=" h-20"
          variant="outline"
        >
          <Plus /> ADD NEW API
        </Button>
      </div>
    </div>
  );
};

export default ApiKeys;
