"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchInvoice } from "@/lib/hooks/api/invoices.api";
import {
  PaymentHistory,
  fetchPaymentHistory,
} from "@/lib/hooks/api/payments.api";
import { ModifyApiManagement } from "@/lib/hooks/useAddApi";
import { formatter } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CardPos } from "iconsax-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

interface TransactionDetailsProps {
  transactionId: string;
}

const TransactionDetails: FC<TransactionDetailsProps> = ({ transactionId }) => {
  const { userData } = useAppSelector((state) => state.user);

  const {
    isPending,
    isError,
    data: invoice,
    error,
    refetch,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: () => fetchInvoice({ invoiceNumber: transactionId }),

    // staleTime: 5000,
  });

  if (isPending || invoice === (undefined || null)) {
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
          <div className=" flex gap-3 items-center">
            <i className=" p-3 rounded-full bg-bgPrimary/10">
              <CardPos variant="Bulk" size={20} color="#0062FF" />
            </i>
            <h2 className=" text-xl font-bold">Mobile Electronics</h2>
          </div>
          <div className=" text-xs bg-bgPrimary text-white rounded-lg p-5 flex flex-col items-center justify-center gap-3">
            <p>TRANSACTION ID</p>
            <p className=" text-3xl font-bold">029830192</p>
            <p className=" flex items-center gap-1">
              TRANSACTION DATE: <span className=" font-bold">28 FEB 2023</span>
            </p>
            <p className=" flex items-center gap-1">
              DATE ISSUED: <span className=" font-bold">28 FEB 2023</span>
            </p>
          </div>
          <hr className=" border-dashed border-[#9A9AAF]" />
          <div className=" flex flex-col gap-3">
            <div>
              <h5 className=" font-bold">ITEM DETAILS</h5>
              <p>list items and their prices</p>
            </div>

            <div className=" flex items-center gap-3 overflow-x-auto text-nowrap">
              <div className=" flex flex-col gap-2 grow">
                <p className=" uppercase font-bold">Item</p>
                <p className="px-3 py-1.5 bg-[#f0f4f9] rounded text-xs min-w-16 shrink-0">
                  Subscription
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <p className=" uppercase font-bold">qty</p>
                <p className="px-3 py-1.5 bg-[#f0f4f9] rounded text-xs min-w-16 shrink-0">
                  1
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <p className=" uppercase font-bold">price (₦)</p>
                <p className="px-3 py-1.5 bg-[#f0f4f9] rounded text-xs min-w-16 shrink-0">
                  1,350
                </p>
              </div>
              <div className=" flex flex-col gap-2">
                <p className=" uppercase font-bold">total</p>
                <p className=" font-bold py-1.5 text-xs min-w-16 shrink-0">
                  1,350
                </p>
              </div>
            </div>
            <p className="px-3 py-1.5 bg-[#f0f4f9] rounded text-xs min-w-16 min-h-20 shrink-0">
              This is a recurring monthly fee for the service
            </p>
          </div>
          <hr className=" border-dashed border-[#9A9AAF]" />
          <div className="flex flex-wrap gap-10">
            <div className=" shrink-0 w-full">
              <h5 className=" font-bold pb-3">Payment Method</h5>
              <div className="p-5 border border-dashed rounded-lg flex flex-col gap-2.5">
                <div className="justify-between flex items-center text-xs font-normal gap-1">
                  <p className=" uppercase">Wire Transfer</p>
                  <Image src="/wise.png" alt="Hero" height={15} width={60} />
                </div>
                <div className="justify-between flex items-center text-xs font-normal gap-1">
                  <p className=" uppercase">Wire Transfer</p>
                  <p className=" font-bold text-right">
                    Heliosphere Shopping Mall
                  </p>
                </div>
                <div className="justify-between flex items-center text-xs font-normal gap-1">
                  <p className=" uppercase">ACCOUNT NUMBER</p>
                  <p className=" font-bold text-right">0234 9485 0493</p>
                </div>
                <div className="justify-between flex items-center text-xs font-normal gap-1">
                  <p className=" uppercase">ROUTING NUMBER</p>
                  <p className=" font-bold text-right">02948</p>
                </div>
              </div>
            </div>
            <div className=" w-full shrink-0 min-h-[170px]">
              <div className=" h-full flex flex-col gap-2.5">
                <div className="justify-between flex items-center gap-2 text-xs font-normal">
                  <p className=" uppercase font-bold">Sub Total</p>
                  <p className=" font-bold">₦1,350</p>
                </div>
                <div className="justify-between flex items-center gap-2 text-xs font-normal">
                  <p className=" uppercase">Discount</p>
                  <p className=" font-bold">0%</p>
                </div>
                <div className="justify-between flex items-center gap-2 text-xs font-normal">
                  <p className=" uppercase">Sales Tax</p>
                  <p className=" font-bold">₦0.00</p>
                </div>
                <hr className=" border-dashed border-[#9A9AAF] mt-auto" />
                <div className="justify-between flex items-center gap-2 text-xs font-normal">
                  <p className=" uppercase font-bold">Total Amount</p>
                  <p className=" font-bold">₦1,350</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-5 w-full">
          <div className=" rounded-lg bg-white p-5 flex flex-col gap-2.5">
            <h5 className=" flex items-baseline gap-[2px] font-bold ">
              AMOUNT <span className=" text-[#9A9AAF] font-normal">(NGN)</span>
            </h5>
            <hr className=" border-dashed border-[#9A9AAF]" />
            <h5 className=" text-[28px] font-bold flex items-baseline gap-1">
              ₦1,350
              <span className=" text-[#9A9AAF] text-xs font-normal">(NGN)</span>
            </h5>
            <p
              className={` bg-[#A71C1C]/5 text-[#A71C1C] text-xs w-fit px-3 py-1.5 rounded uppercase `}
            >
              next due DATE: mar. 29th, 2023
            </p>
          </div>
          <Button>DOWNLOAD RECEIPT</Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
