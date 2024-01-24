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
import { PuffLoader } from "react-spinners";
import {
  PaymentHistory,
  fetchPaymentHistory,
} from "@/lib/hooks/api/payments.api";
import { useAppSelector } from "@/lib/hooks";
import { formatter } from "@/lib/utils";

interface PaymentListProps {}

const PaymentList: FC<PaymentListProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);

  const {
    isPending,
    isError,
    data: payments,
    error,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: () => fetchPaymentHistory({ companyId: userData?.companyId }),
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
      cell: (info) => `${info.row.original.id}`,
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
      accessorKey: "amount",
      cell: (info) => `-₦${info.row.original.amount}`,
    },
    {
      header: "Date",
      cell: (info) =>
        info.row && formatter?.format(new Date(info.row.original.timestamp)),
    },
    {
      header: "Status",
      cell: (info) =>
        info.row.original.status === "Active" ? (
          <p
            className={` bg-[#1CA78B]/5 text-[#1CA78B] text-xs w-fit px-3 py-1.5 rounded `}
          >
            Approved
          </p>
        ) : info.row.original.status === "Pending" ? (
          <p
            className={` bg-[#FFCF5C]/5 text-[#FFCF5C] text-xs w-fit px-3 py-1.5 rounded `}
          >
            Pending
          </p>
        ) : (
          <p
            className={` bg-[#A71C1C]/5 text-[#A71C1C] text-xs w-fit px-3 py-1.5 rounded `}
          >
            Failed
          </p>
        ),
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
        {!isPending && (
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
