"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { More } from "iconsax-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import ChangePaymentMethod from "./change-payment-option";
import ModifyCardModal from "./modify-card-modal";
import Modals from "./Modals";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setChangePayment,
  setDeletePrompt,
} from "@/redux/features/subscriptionSlice";
import {
  Subscriptions,
  fetchSubscriptions,
} from "@/lib/hooks/api/subscription.api";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import { formatter, getCurrencySymbol } from "@/lib/utils";

const SubscriptionFee = () => {
  const dispatch = useAppDispatch();

  const [activeSubscription, setActiveSubscription] = useState<
    Subscriptions | undefined
  >(undefined);

  const { userData } = useAppSelector((state) => state.user);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => fetchSubscriptions({ companyId: userData?.companyId }),
  });

  useEffect(() => {
    if (data?.data) {
      let subscriptions = data.data;
      setActiveSubscription(
        subscriptions.find((sub) => sub.status === "Active")
      );
    }
  }, [data]);

  return (
    <>
      <div className=" flex flex-col gap-5">
        {activeSubscription && (
          <div className=" p-5 flex flex-col gap-4 bg-white rounded-lg">
            <div className=" flex justify-between items-center gap-5">
              <h6 className=" font-bold">
                SUBSCRIPTION FEE{" "}
                <span className=" font-normal">
                  {activeSubscription.currency}
                </span>
              </h6>
              <Popover>
                <PopoverTrigger className=" shrink-0">
                  <More size={18} />
                </PopoverTrigger>
                <PopoverContent className=" flex w-40 flex-col gap-2 justify-start items-start ">
                  <Button
                    className=" w-full text-left justify-start"
                    variant="ghost"
                  >
                    Modify
                  </Button>
                  <Separator />
                  <Button
                    className=" w-full text-left justify-start"
                    variant="ghost"
                    onClick={() => dispatch(setDeletePrompt(true))}
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

            <hr className=" border-dashed border-[#9A9AAF)]" />
            <h5 className=" text-3xl font-bold flex items-baseline gap-1">
              {getCurrencySymbol(activeSubscription.currency)}
              {activeSubscription.price}{" "}
              <span className=" text-xs font-normal"> (TAX INCL.)</span>
            </h5>
            <p className=" text-xs font-bold uppercase text-[#A71C1C] bg-[#A71C1C]/10 p-2.5 w-fit rounded">
              due on {formatter.format(new Date(activeSubscription.expiryDate))}
            </p>
          </div>
        )}
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between gap-2 items-center">
            <h5 className=" font-bold">Payment Method</h5>
            <h5 className=" uppercase text-[#0062FF] text-xs font-bold">
              CHANGE Payment OPTION
            </h5>
          </div>
          <div className="p-5 border border-dashed rounded-lg flex flex-col gap-2.5">
            <div className="justify-between flex items-center text-xs font-normal">
              <p className=" uppercase">Wire Transfer</p>
              <Image src="/wise.png" alt="Hero" height={15} width={60} />
            </div>
            <div className="justify-between flex items-center text-xs font-normal">
              <p className=" uppercase">Wire Transfer</p>
              <p className=" font-bold text-right">Heliosphere Shopping Mall</p>
            </div>
            <div className="justify-between flex items-center text-xs font-normal">
              <p className=" uppercase">ACCOUNT NUMBER</p>
              <p className=" font-bold text-right">0234 9485 0493</p>
            </div>
            <div className="justify-between flex items-center text-xs font-normal">
              <p className=" uppercase">ROUTING NUMBER</p>
              <p className=" font-bold text-right">02948</p>
            </div>
          </div>
        </div>
        <Button onClick={() => dispatch(setChangePayment(true))}>
          CHANGE PAYMENT OPTION
        </Button>
      </div>
      <Modals />
    </>
  );
};

export default SubscriptionFee;
