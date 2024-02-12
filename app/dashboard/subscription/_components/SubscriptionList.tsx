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
  Subscriptions,
  fetchSubscriptions,
} from "@/lib/hooks/api/subscription.api";
import { PuffLoader } from "react-spinners";
import ChangePaymentMethod from "./change-payment-option";
import { useAppSelector } from "@/lib/hooks";
import { formatter, getCurrencySymbol } from "@/lib/utils";

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

  const queryClient = useQueryClient();
  const columns: ColumnDef<Subscriptions>[] = [
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
      cell: (info) =>
        `${getCurrencySymbol(info.row.original.currency)}${
          info.row.original.price
        }`,
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
        <TabsList className=" w-full overflow-x-auto justify-start overflow-y-clip h-auto ">
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
              <DataTable type="all" columns={columns} data={allSubscriptions} />
            </TabsContent>
            <TabsContent className=" px-5" value="active">
              <DataTable
                type="active"
                columns={columns}
                data={activeSubscriptions}
              />
            </TabsContent>
            <TabsContent className=" px-5" value="expired">
              <DataTable
                type="expired"
                columns={columns}
                data={expiredSubscriptions}
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
