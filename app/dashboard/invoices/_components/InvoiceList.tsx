"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentDownload, Edit2, Trash } from "iconsax-react";
import AddUserModal from "./add-user-modal";
import { Transaction, fetchInvoices } from "@/lib/hooks/api/invoices.api";
import { PuffLoader } from "react-spinners";
import { formatter } from "@/lib/utils";

interface InvoiceListProps {}

const InvoiceList: FC<InvoiceListProps> = ({}) => {
  const {
    isPending,
    isError,
    data: invoices,
    error,
    refetch,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
  });

  const [allInvoices, setAllInvoices] = useState<Transaction[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState<Transaction[]>([]);
  const [successfulInvoices, setSuccessfulInvoices] = useState<Transaction[]>(
    []
  );
  const [failedInvoices, setFailedInvoices] = useState<Transaction[]>([]);

  useEffect(() => {
    if (invoices) {
      setAllInvoices(invoices);

      setPendingInvoices(invoices.filter((u) => u.uploadStatus === "Pending"));
      setSuccessfulInvoices(
        invoices.filter((u) => u.uploadStatus === "Uploaded")
      );
      setFailedInvoices(invoices.filter((u) => u.uploadStatus === "Error"));
    }
  }, [invoices]);

  const queryClient = useQueryClient();
  const columns: ColumnDef<Transaction>[] = [
    {
      header: "INVOICE ID",
      accessorKey: "invoiceNumber",
    },

    {
      header: "AMOUNT",
      cell: (info) => `-$${info.row.original.totalAmount}`,
    },
    {
      header: "INVOICE TYPE",
      accessorKey: "invoiceType",
    },
    {
      header: "STATUS",
      accessorKey: "uploadStatus",
    },
    {
      header: "DATE",
      cell: (info) =>
        info.row && formatter?.format(new Date(info.row.original.createDate)),
    },
  ];

  return (
    <div className=" bg-white rounded-lg mt-5">
      <div className=" p-5">
        <h3 className=" font-bold pb-2.5 ">Invoices and Receipt</h3>
        <p className=" w-full md:w-2/3 lg:w-1/2 text-xs">
          View all your invoices and receipts to keep track of your expenses and
          incomes in an intuitive interface
        </p>
      </div>
      <Tabs defaultValue="all" className=" w-full ">
        <TabsList className=" w-full overflow-x-auto justify-start overflow-y-clip h-auto ">
          <TabsTrigger className=" col-span-1" value="all">
            All Invoices
          </TabsTrigger>
          <TabsTrigger value="successful">
            Successful Invoices Invoices
          </TabsTrigger>
          <TabsTrigger value="pending">Pending Invoices</TabsTrigger>
          <TabsTrigger value="failed">Failed Invoices</TabsTrigger>
        </TabsList>
        {isPending && (
          <div className=" w-full h-full grid place-items-center py-20">
            <PuffLoader color="#0062FF" />
          </div>
        )}
        {!isPending && (
          <>
            <TabsContent className=" px-5" value="all">
              <DataTable columns={columns} data={allInvoices} />
            </TabsContent>
            <TabsContent className=" px-5" value="successful">
              <DataTable columns={columns} data={successfulInvoices} />
            </TabsContent>
            <TabsContent className=" px-5" value="pending">
              <DataTable columns={columns} data={pendingInvoices} />
            </TabsContent>
            <TabsContent className=" px-5" value="failed">
              <DataTable columns={columns} data={failedInvoices} />
            </TabsContent>
          </>
        )}
      </Tabs>
      <AddUserModal />
    </div>
  );
};

export default InvoiceList;
