import { FC } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { Transaction, fetchInvoices } from "@/lib/hooks/api/invoices.api";
import { PuffLoader } from "react-spinners";
import { ColumnDef } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { DocumentDownload } from "iconsax-react";

const InvoiceProcessing = ({}) => {
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
    <div className=" p-5 rounded-lg bg-white h-full">
      <h2 className=" text-3xl font-bold pb-4">Invoice Processing</h2>
      {isPending ||
        (invoices === undefined && (
          <div className=" w-full h-full grid place-items-center py-20">
            <PuffLoader color="#0062FF" />
          </div>
        ))}
      {invoices && (
        <div className="">
          <DataTable columns={columns} data={invoices} />
        </div>
      )}
    </div>
  );
};

export default InvoiceProcessing;
