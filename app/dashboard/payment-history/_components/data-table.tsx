"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardPos } from "iconsax-react";
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { DataTablePagination } from "@/components/data-table-pagination";
import { PaginationData } from "@/lib/hooks/api/invoices.api";
import { NonDataTablePagination } from "@/components/non-data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationData;
  pageIndex?: number;
  setPageIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  pageIndex,
  setPageIndex,
}: DataTableProps<TData, TValue>) {
  const handleRowClick = (row: any) => {
    router.push(`/dashboard/payment-history/${row.id}`);
  };

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const router = useRouter();

  if (data === undefined)
    return (
      <div className=" w-full h-full grid place-items-center py-20">
        <PuffLoader color="#0062FF" />
      </div>
    );

  return (
    <div className=" space-y-5">
      <div className=" bg-white px-2 pb-3 rounded-b-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className=" font-bold uppercase">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=" cursor-pointer"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className=" text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <CardPos
                      variant="Bulk"
                      color="#0062FF"
                      className=" h-[100px] w-[100px]"
                    />
                    <h6 className=" font-bold pt-4 pb-2">
                      There are no payments yet.
                    </h6>
                    <p>
                      When you make payments on this account, they will appear
                      here
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getRowModel().rows.length ? (
        pagination && pageIndex && setPageIndex ? (
          <NonDataTablePagination
            hasNextPage={pagination.HasNextPage}
            hasPreviousPage={pagination.HasPreviousPage}
            currentPage={pagination.CurrentPage}
            totalPages={pagination.TotalPages}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        ) : (
          <DataTablePagination table={table} />
        )
      ) : null}
    </div>
  );
}
