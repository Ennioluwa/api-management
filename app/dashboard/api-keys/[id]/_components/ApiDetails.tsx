"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiKeyData, fetchApiKeys } from "@/lib/hooks/api/apiKey.api";
import { ModifyApiManagement } from "@/lib/hooks/useAddApi";
import { formatter } from "@/lib/utils";
import { modifyApiOpen } from "@/redux/features/apiKeySlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Copy,
  DocumentFilter,
  Eye,
  EyeSlash,
  Information,
  More,
} from "iconsax-react";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

interface ApiDetailsProps {
  ApiKeyId: string;
}

const ApiDetails: FC<ApiDetailsProps> = ({ ApiKeyId }) => {
  const [hidden, setHidden] = useState(true);
  const [active, setActive] = useState(false);
  const [api, setApi] = useState<ApiKeyData | null>(null);
  const [toggleOff, setToggleOff] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);

  const dispatch = useAppDispatch();

  const {
    isError: isToggleError,
    isSuccess: isToggleSuccess,
    isPending: isTogglePending,
    mutate: modifyApi,
  } = ModifyApiManagement();

  const queryClient = useQueryClient();

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard");
      })
      .catch((err) => {
        toast.error("Error while copying to clipboard");
      });
  };

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

  useEffect(() => {
    if (apiKeys) {
      const api = apiKeys.find((api) => api.apiKeyId === ApiKeyId);
      if (api) {
        setApi(api);
      }
    }
  }, [apiKeys, active]);

  useEffect(() => {
    if (isToggleSuccess) {
      console.log(isToggleSuccess, apiKeys, "success state");
      toast.success("Api details successfully modified");
      setToggleOff(false);
      setToggleOn(false);
      setActive(!active);
      queryClient.refetchQueries({ queryKey: ["api"] });
      queryClient.invalidateQueries({ queryKey: ["api"] });
    } else if (isToggleError) {
      console.log(isToggleError, apiKeys, "error state");
      toast.error("Api modification failed");
    } else return;
  }, [isToggleSuccess, isToggleError]);

  const onSubmit = (value: boolean) => {
    if (!api) return;
    // setActive(value);
    if (value) {
      setToggleOn(true);
    } else {
      setToggleOff(true);
    }
  };

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
                <Copy
                  onClick={() => copyToClipboard(api.apiKeyValue)}
                  size={24}
                  color="#595959"
                  className=" shrink-0 cursor-pointer ml-3"
                />
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
              <Label htmlFor="active-status">
                Toggle to Deactivate this App
              </Label>
              <Switch
                disabled={isTogglePending}
                checked={api.isValid}
                onCheckedChange={onSubmit}
                id="active-status"
              />
            </div>
          </div>
          <Button onClick={() => dispatch(modifyApiOpen())}>MODIFY APP</Button>
        </div>
      </div>
      <Modal
        icon={Information}
        title="TOGGLE OFF API?"
        content={
          <p>
            When you toggle off the API, it will disrupt your current business
            operation.
          </p>
        }
        isPending={isTogglePending}
        isPendingText="PROCESSING"
        open={toggleOff}
        setOpen={() => setToggleOff(!toggleOff)}
        cancelButton="CANCEL"
        primaryButton="CONTINUE"
        primaryButtonAction={() => {
          modifyApi({
            apiId: api.id,
            isValid: !api.isValid,
            apiKeyName: api.apiKeyName,
          });
        }}
      />
      <Modal
        icon={Information}
        title="TOGGLE ON API?"
        content={<p>Are you sure you want to toggle on the API?</p>}
        isPending={isTogglePending}
        isPendingText="PROCESSING"
        open={toggleOn}
        setOpen={() => setToggleOn(!toggleOn)}
        cancelButton="CANCEL"
        primaryButton="CONTINUE"
        primaryButtonAction={() => {
          modifyApi({
            apiId: api.id,
            isValid: !api.isValid,
            apiKeyName: api.apiKeyName,
          });
        }}
      />
    </div>
  );
};

export default ApiDetails;
