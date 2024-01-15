"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentDownload, Edit2, Trash } from "iconsax-react";
import AddUserModal from "./add-user-modal";
import { Invoice, fetchInvoices } from "@/lib/hooks/api/invoices.api";

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

    // staleTime: 5000,
  });
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState<Invoice[]>([]);
  const [dueInvoices, setDueInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    if (invoices) {
      setAllInvoices(invoices);

      setPendingInvoices(invoices.filter((u) => u));

      setDueInvoices(invoices.filter((u) => !u));
    }
  }, [invoices]);

  const queryClient = useQueryClient();
  const columns: ColumnDef<Invoice>[] = [
    {
      header: "INVOICE ID",
      cell: (info) => ``,
    },
    {
      header: "TOTAL ITEMS",
      accessorKey: "email",
    },
    {
      header: "AMOUNT",
      accessorKey: "roles",
      cell: (info) => "",
    },
    {
      header: "INVOICE TYPE",
      cell: (info) => "Custom",
    },
    {
      header: "STATUS",
      cell: (info) => "Custom",
    },
    {
      header: "DATE",
      cell: (info) => "Custom",
    },
    {
      header: "ACTION",
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
        <h3 className=" font-bold pb-2.5 ">Users List</h3>
        <p className=" w-full md:w-2/3 lg:w-1/2 text-xs">
          View all your users and their verification status below in each tabs
        </p>
      </div>
      <Tabs defaultValue="all" className="">
        <TabsList className=" my-2 p-0">
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="pending">Pending Invoices</TabsTrigger>
          <TabsTrigger value="due">Due Invoices</TabsTrigger>
        </TabsList>
        {isPending && <p>Loading..</p>}
        {invoices && (
          <>
            <TabsContent className=" px-5" value="all">
              <DataTable columns={columns} data={allInvoices} />
            </TabsContent>
            <TabsContent className=" px-5" value="pending">
              <DataTable columns={columns} data={pendingInvoices} />
            </TabsContent>
            <TabsContent className=" px-5" value="due">
              <DataTable columns={columns} data={dueInvoices} />
            </TabsContent>
          </>
        )}
      </Tabs>
      <AddUserModal />
    </div>
  );
};

export default InvoiceList;
