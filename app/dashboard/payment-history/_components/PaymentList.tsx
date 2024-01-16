"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/hooks/api/users.api";
import { deleteUser } from "@/lib/hooks/api/users.api";
import { UserManagementData } from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentDownload, Edit2, Trash } from "iconsax-react";
import AddUserModal from "./add-user-modal";
import {
  PaymentHistory,
  fetchPaymentHistory,
} from "@/lib/hooks/api/subscription.api";
import { PuffLoader } from "react-spinners";

interface PaymentListProps {}

const PaymentList: FC<PaymentListProps> = ({}) => {
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
      header: "Channel",
      accessorKey: "paymentMethod",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <p>{info.row.original.paymentMethod}</p>
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
        info.row.original.status === "Active" ? "Approved" : "Pending",
    },
    {
      header: "Action",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <DocumentDownload
            variant="Bulk"
            // onClick={() => handleDeleteUser(info.row.original)}
          />
        </div>
      ),
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
    <div className=" bg-white rounded-lg mt-5">
      <div className=" p-5">
        <h3 className=" font-bold pb-2.5 ">Billing History</h3>
        <p className=" w-full md:w-2/3 lg:w-1/2 text-xs">
          View all transaction history made through your Account
        </p>
      </div>
      <Tabs defaultValue="all" className="">
        <TabsList className=" my-2 p-0">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        {isPending && (
          <div className=" w-full h-full grid place-items-center py-20">
            <PuffLoader color="#0062FF" />
          </div>
        )}
        {payments && (
          <>
            <TabsContent className=" px-5" value="all">
              <DataTable type="all" columns={columns} data={allPayments} />
            </TabsContent>
            <TabsContent className=" px-5" value="approved">
              <DataTable
                type="verified"
                columns={columns}
                data={approvedPayments}
              />
            </TabsContent>
            <TabsContent className=" px-5" value="pending">
              <DataTable
                type="unverified"
                columns={columns}
                data={pendingPayments}
              />
            </TabsContent>
            <TabsContent className=" px-5" value="failed">
              <DataTable
                type="unverified"
                columns={columns}
                data={failedPayments}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
      <AddUserModal />
    </div>
  );
};

export default PaymentList;
