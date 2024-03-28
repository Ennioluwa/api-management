"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { UserManagementData } from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentDownload, Edit2, Trash } from "iconsax-react";
import {
  Subscriptions,
  fetchSubscriptions,
} from "@/lib/hooks/api/subscription.api";
import { PuffLoader } from "react-spinners";
import ChangePaymentMethod from "./change-payment-option";
import { useAppSelector } from "@/lib/hooks";
import { formatter, getCurrencySymbol } from "@/lib/utils";
import { DataTable } from "../../invoices/_components/data-table";

interface SubscriptionListProps {}

const SubscriptionList: FC<SubscriptionListProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);

  const {
    isPending,
    isError,
    data: subscriptions,
    error,
    refetch,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => fetchSubscriptions({ companyId: userData?.companyId }),
  });

  const [allSubscriptions, setAllSubscriptions] = useState<Subscriptions[]>([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState<
    Subscriptions[]
  >([]);
  const [expiredSubscriptions, setExpiredSubscriptions] = useState<
    Subscriptions[]
  >([]);

  useEffect(() => {
    if (subscriptions) {
      setAllSubscriptions(subscriptions);

      setActiveSubscriptions(
        subscriptions.filter((u) => u.status === "Active")
      );
      setExpiredSubscriptions(
        subscriptions.filter((u) => u.status !== "Active")
      );
    }
  }, [subscriptions]);

  const columns: ColumnDef<Subscriptions>[] = [
    {
      header: "Subscription ID.",
      cell: (info) => (
        <span className=" font-bold">{info.row.original.terminalId}</span>
      ),
    },
    {
      header: "Users",
      accessorKey: "paymentMethod",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <p className=" font-bold">{info.row.original.totalUsers}</p>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "price",
      cell: (info) => (
        <span className=" font-bold">
          {getCurrencySymbol(info.row.original.currency)}
          {info.row.original.price}
        </span>
      ),
    },
    {
      header: "Date",
      cell: (info) =>
        info.row && formatter?.format(new Date(info.row.original.createDate)),
    },
    {
      header: "Status",
      cell: (info) => (
        <span
          className={` font-bold text-xs w-fit px-3 py-1.5 rounded ${
            info.row.original.status.toLowerCase() === "active"
              ? "bg-[#1CA78B]/5 text-[#1CA78B]"
              : "bg-[#A71C1C]/5 text-[#A71C1C] "
          }`}
        >
          {info.row.original.status === "Active" ? "Active" : "Expired"}
        </span>
      ),
    },
  ];

  return (
    <div className=" bg-white rounded-lg">
      <div className=" p-5">
        <h3 className=" font-bold pb-2.5 ">Subscriptions List</h3>
        <p className=" w-full text-xs">
          From here you can see a list of all you subscriptions and their
          statuses as they’re tabbed into different sections.
        </p>
      </div>
      <Tabs defaultValue="all" className=" w-full ">
        <TabsList className=" w-full overflow-x-auto justify-start overflow-y-clip h-auto bg-white border-b border-[#EFEFEF]">
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
            <TabsContent value="all">
              <DataTable columns={columns} data={allSubscriptions} invoice />
            </TabsContent>
            <TabsContent value="active">
              <DataTable columns={columns} data={activeSubscriptions} invoice />
            </TabsContent>
            <TabsContent value="expired">
              <DataTable
                columns={columns}
                data={expiredSubscriptions}
                invoice
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
