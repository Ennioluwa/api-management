import { FC } from "react";
import { Payment, columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { Transaction, fetchInvoices } from "@/lib/hooks/api/invoices.api";
import { PuffLoader } from "react-spinners";
import { ColumnDef } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { DocumentDownload } from "iconsax-react";
import { DataTable } from "../../invoices/_components/data-table";
import { Button } from "@/components/ui/button";

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
      cell: (info) => (
        <span className=" font-bold">{info.row.original.invoiceNumber}</span>
      ),
    },

    {
      header: "AMOUNT",
      cell: (info) => (
        <span className=" font-bold">${info.row.original.totalAmount}</span>
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
            className={` text-xs font-bold w-fit px-3 py-1.5 rounded ${
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
    <div className=" h-ful">
      <div className=" p-5 bg-white rounded-t-lg">
        <h2 className=" text-3xl font-bold pb-4">Invoice Processing</h2>
      </div>

      {isPending && (
        <div className=" bg-white w-full grid place-items-center py-20 rounded-b-lg">
          <PuffLoader color="#0062FF" />
        </div>
      )}
      {invoices && (
        <div className="">
          <DataTable columns={columns} data={invoices} />
        </div>
      )}
    </div>
  );
};

export default InvoiceProcessing;
