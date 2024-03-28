"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentDownload, Edit2, Trash } from "iconsax-react";
import AddUserModal from "./add-user-modal";
import {
  Transaction,
  fetchInvoices,
  fetchInvoicesByDate,
} from "@/lib/hooks/api/invoices.api";
import { PuffLoader } from "react-spinners";
import { formatter } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";

interface InvoiceListProps {}

const InvoiceList: FC<InvoiceListProps> = ({}) => {
  const { invoiceStartDate, invoiceEndDate } = useAppSelector(
    (state) => state.dateRange
  );

  const [pageIndex, setPageIndex] = useState(1);
  const [lastId, setLastId] = useState<number | undefined>(undefined);

  const { data, isPending } = useQuery({
    queryKey: ["invoicesDate", { invoiceStartDate, invoiceEndDate, pageIndex }],
    queryFn: () =>
      fetchInvoicesByDate({
        startDate: invoiceStartDate,
        endDate: invoiceEndDate,
        pageIndex,
        lastId,
      }),
    placeholderData: keepPreviousData,
  });

  const [allInvoices, setAllInvoices] = useState<Transaction[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState<Transaction[]>([]);
  const [successfulInvoices, setSuccessfulInvoices] = useState<Transaction[]>(
    []
  );
  const [failedInvoices, setFailedInvoices] = useState<Transaction[]>([]);

  useEffect(() => {
    if (data?.data) {
      let invoices = data.data;

      invoices[invoices.length - 1] &&
        setLastId(invoices[invoices.length - 1]?.id);

      setAllInvoices(invoices);

      setPendingInvoices(invoices.filter((u) => u.uploadStatus === "Pending"));
      setSuccessfulInvoices(
        invoices.filter((u) => u.uploadStatus === "Uploaded")
      );
      setFailedInvoices(invoices.filter((u) => u.uploadStatus === "Error"));
    }
  }, [data]);

  console.log(data?.pagination);

  const columns: ColumnDef<Transaction>[] = [
    {
      header: "INVOICE ID",
      cell: (info) => (
        <span className=" font-bold">{info.row.original.invoiceNumber}</span>
      ),
    },

    {
      header: "AMOUNT",
      cell: (info) => (
        <span className=" font-bold">₦{info.row.original.totalAmount}</span>
      ),
    },
    {
      header: "INVOICE TYPE",
      cell: (info) => (
        <span className=" font-bold">{info.row.original.invoiceType}</span>
      ),
    },
    {
      header: "STATUS",
      cell: (info) => {
        const status = info.row.original.uploadStatus;
        return (
          <span
            className={` font-bold text-xs w-fit px-3 py-1.5 rounded ${
              status.toLowerCase() === "uploaded"
                ? "bg-[#1CA78B]/5 text-[#1CA78B]"
                : status.toLowerCase() === "error"
                ? "bg-[#A71C1C]/5 text-[#A71C1C] "
                : "bg-[#FFCF5C]/5 text-[#FFCF5C]"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "DATE",
      cell: (info) =>
        info.row && formatter?.format(new Date(info.row.original.createDate)),
    },
    {
      header: "ACTION",
      cell: (info) => (
        <Button className="flex items-center gap-4">
          <DocumentDownload variant="Bulk" />
          download
        </Button>
      ),
    },
  ];

  return (
    <div className="  mt-5">
      <div className=" p-5 bg-white rounded-t-lg">
        <h3 className=" font-bold pb-2.5 ">Invoices and Receipt</h3>
        <p className=" w-full md:w-2/3 lg:w-1/2 text-xs">
          View all your invoices and receipts to keep track of your expenses and
          incomes in an intuitive interface
        </p>
      </div>
      <Tabs defaultValue="all" className=" w-full ">
        <TabsList className=" w-full overflow-x-auto justify-start overflow-y-clip h-auto bg-white border-b border-[#EFEFEF]">
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
          <div className=" bg-white w-full h-full grid place-items-center py-20">
            <PuffLoader color="#0062FF" />
          </div>
        )}
        {!isPending && (
          <>
            <TabsContent value="all">
              <DataTable
                pagination={data?.pagination}
                columns={columns}
                data={allInvoices}
                invoice
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            </TabsContent>
            <TabsContent value="successful">
              <DataTable
                pagination={data?.pagination}
                columns={columns}
                data={successfulInvoices}
                invoice
              />
            </TabsContent>
            <TabsContent value="pending">
              <DataTable
                pagination={data?.pagination}
                columns={columns}
                data={pendingInvoices}
                invoice
              />
            </TabsContent>
            <TabsContent value="failed">
              <DataTable
                pagination={data?.pagination}
                invoice
                columns={columns}
                data={failedInvoices}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
      <AddUserModal />
    </div>
  );
};

export default InvoiceList;
