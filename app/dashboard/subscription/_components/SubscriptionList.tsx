"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { UserManagementData } from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentDownload, Edit2, Trash } from "iconsax-react";
import {
  PaymentHistory,
  fetchPaymentHistory,
} from "@/lib/hooks/api/subscription.api";
import { PuffLoader } from "react-spinners";
import ChangePaymentMethod from "./change-payment-option";

interface SubscriptionListProps {}

const SubscriptionList: FC<SubscriptionListProps> = ({}) => {
  const {
    isPending,
    isError,
    data: payments,
    error,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPaymentHistory,
  });

  const [allPayments, setAllPayments] = useState<PaymentHistory[]>([]);
  const [approvedPayments, setApprovedPayments] = useState<PaymentHistory[]>(
    []
  );
  const [failedPayments, setFailedPayments] = useState<PaymentHistory[]>([]);
  const [pendingPayments, setPendingPayments] = useState<PaymentHistory[]>([]);

  useEffect(() => {
    if (payments) {
      setAllPayments(payments);

      setApprovedPayments(payments.filter((u) => u.status === "Active"));
      setPendingPayments(payments.filter((u) => u.status !== "Active"));
      setFailedPayments(payments.filter((u) => u.status !== "Active"));
    }
  }, [payments]);

  const queryClient = useQueryClient();
  const columns: ColumnDef<PaymentHistory>[] = [
    {
      header: "Transaction ID.",
      cell: (info) => `${info.row.original.terminalId}`,
    },
    {
      header: "Users",
      accessorKey: "paymentMethod",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <p>{info.row.original.totalUsers}</p>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "price",
      cell: (info) => `-₦${info.row.original.price}`,
    },
    {
      header: "Date",
      cell: (info) =>
        info.row && formatter?.format(new Date(info.row.original.createDate)),
    },
    {
      header: "Status",
      cell: (info) =>
        info.row.original.status === "Active" ? "Active" : "Expired",
    },
  ];

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",

    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",

    hour12: true,
  });

  return (
    <div className=" bg-white rounded-lg">
      <div className=" p-5">
        <h3 className=" font-bold pb-2.5 ">Subscriptions List</h3>
        <p className=" w-full text-xs">
          From here you can see a list of all you subscriptions and their
          statuses as they’re tabbed into different sections.
        </p>
      </div>
      <Tabs defaultValue="all" className="">
        <TabsList className=" my-2 p-0">
          <TabsTrigger value="all">All Subscription</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        {isPending && (
          <div className=" w-full h-full grid place-items-center py-20">
            <PuffLoader color="#0062FF" />
          </div>
        )}
        {!isPending && (
          <>
            <TabsContent className=" px-5" value="all">
              <DataTable type="all" columns={columns} data={allPayments} />
            </TabsContent>
            <TabsContent className=" px-5" value="approved">
              <DataTable
                type="active"
                columns={columns}
                data={approvedPayments}
              />
            </TabsContent>
            <TabsContent className=" px-5" value="pending">
              <DataTable
                type="expired"
                columns={columns}
                data={pendingPayments}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
      <ChangePaymentMethod />
    </div>
  );
};

export default SubscriptionList;
