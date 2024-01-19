"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ApiKeyData, fetchApiKeys } from "@/lib/hooks/api/apiKey.api";
import { useQuery } from "@tanstack/react-query";
import { Copy, DocumentFilter, Eye, EyeSlash, More } from "iconsax-react";
import { FC, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

interface ApiDetailsProps {
  ApiKeyId: string;
}

const ApiDetails: FC<ApiDetailsProps> = ({ ApiKeyId }) => {
  const [hidden, setHidden] = useState(false);
  const [api, setApi] = useState<ApiKeyData | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({ description: "Text copied to clipboard" });
      })
      .catch((err) => {
        toast({ description: "Error while copying to clipboard" });
      });
  };

  const {
    isPending,
    isError,
    data: apiKeys,
    error,
    refetch,
  } = useQuery({
    queryKey: ["api"],
    queryFn: fetchApiKeys,
  });

  useEffect(() => {
    if (apiKeys) {
      const api = apiKeys.find((api) => api.apiKeyId === ApiKeyId);
      if (api) {
        setApi(api);
      }
    }
  }, [apiKeys]);

  console.log(api, "api here");

  if (isPending || apiKeys === (undefined || null) || api === null) {
    return (
      <div className=" w-full h-full grid place-items-center py-20">
        <PuffLoader color="#0062FF" />
      </div>
    );
  }

  return (
    <div className=" p-5 rounded-lg bg-[#fff]/60">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className=" col-span-1 lg:col-span-2 bg-white p-5 rounded-lg flex flex-col gap-5 w-full">
          <div className=" flex gap-2 items-center">
            <i className=" p-2.5 bg-[#0062FF]/10 rounded-full">
              <DocumentFilter color="#0062FF" className="" variant="Bulk" />
            </i>

            <h2 className=" font-bold text-xl">
              {api.apiKeyName || "Untitled"}
            </h2>
          </div>
          <hr className=" border-dashed border-[#9A9AAF]" />
          <div className=" flex flex-col gap-5 p-5 bg-[#f0f4f9] rounded-lg">
            <div className="flex gap-3 items-center">
              <h5 className=" shrink-0 font-bold text-xs">APPLICATION ID</h5>
              <h6 className=" flex-1 text-xs">{api.apiKeyId}</h6>
              <Copy
                onClick={() => copyToClipboard(api.apiKeyId)}
                size={24}
                color="#595959"
                className=" shrink-0 cursor-pointer"
              />
            </div>
            <hr className=" border-dashed border-[#9A9AAF]" />
            <div className=" flex items-center justify-between gap-3">
              <p className="uppercase shrink-0 font-bold ">api key </p>
              <div className=" grow flex items-center gap-2 overflow-clip">
                <p className=" flex flex-wrap justify-start items-center gap-2.5 p-2.5 min-h-[50px] border border-dashed border-[#9A9AAF] rounded-lg grow overflow-x-auto">
                  {hidden
                    ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <circle cx="6" cy="6" r="6" fill="#2E2E3A" />
                        </svg>
                      ))
                    : api.apiKeyValue}
                </p>
                {hidden ? (
                  <Eye
                    variant="Bulk"
                    size={18}
                    onClick={() => setHidden(false)}
                    className=" shrink-0 cursor-pointer"
                  />
                ) : (
                  <EyeSlash
                    variant="Bulk"
                    size={18}
                    onClick={() => setHidden(true)}
                    className=" shrink-0 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-5 w-full ">
          <div className=" p-5 border border-dashed border-[#9A9AAF] rounded-lg h-fit flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <h5 className=" font-bold">ACTIVITIES</h5>
              <More />
            </div>
            <div className=" flex gap-2.5 text-xs uppercase">
              Number of Edits<span></span>
            </div>
            <div className=" flex gap-2.5 text-xs uppercase ">
              REQUESTS COMPLETED<span></span>
            </div>
            <div className=" flex gap-2.5 text-xs uppercase">
              REQUESTS MADE<span></span>
            </div>
            <div className=" flex gap-2.5 text-xs">
              Number of Edits<span></span>
            </div>
            <hr className=" border-dashed border-[#9A9AAF]" />
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
            <hr className=" border-dashed border-[#9A9AAF]" />
            <div className="flex items-center space-x-2">
              <Label htmlFor="airplane-mode">
                Toggle to Deactivate this App
              </Label>
              <Switch checked={api.isValid} id="airplane-mode" />
            </div>
          </div>
          <Button>MODIFY APP</Button>
        </div>
      </div>
    </div>
  );
};

export default ApiDetails;
