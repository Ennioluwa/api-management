"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { onOpen } from "@/redux/features/addUserSlice";
import { Calendar } from "iconsax-react";
import { Plus } from "lucide-react";
import { FC } from "react";

interface PaymentHeaderProps {}

const PaymentHeader: FC<PaymentHeaderProps> = ({}) => {
  const dispatch = useAppDispatch();
  return (
    <div className=" flex gap-4 justify-between items-center">
      <h1 className=" text-4xl font-bold">Payment History</h1>
      <button className=" bg-white rounded-lg p-2">
        <Calendar variant="Linear" size={18} />
      </button>
    </div>
  );
};

export default PaymentHeader;
