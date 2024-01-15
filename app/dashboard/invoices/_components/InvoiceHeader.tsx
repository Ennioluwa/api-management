"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { onOpen } from "@/redux/features/addUserSlice";
import { Calendar } from "iconsax-react";
import { Plus } from "lucide-react";
import { FC } from "react";

interface InvoiceListProps {}

const InvoiceList: FC<InvoiceListProps> = ({}) => {
  const dispatch = useAppDispatch();
  return (
    <div className=" flex gap-4 justify-between items-center">
      <h1 className=" text-4xl font-bold">Invoice Manager</h1>
      <button
        className=" bg-white rounded-lg p-2"
        onClick={() => dispatch(onOpen())}
      >
        <Calendar variant="Linear" size={18} />
      </button>
    </div>
  );
};

export default InvoiceList;