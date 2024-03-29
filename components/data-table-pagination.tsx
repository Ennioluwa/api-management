import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end pb-5">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="flex text-dark  px-4 items-center justify-center text-sm font-medium bg-black/10 rounded-[14px] h-10"
          >
            First
          </Button>
          <Button
            className="h-10 w-10 p-0 bg-black/10 rounded-[14px] grid place-items-center"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeft2 color="#1A1A1A" size={20} />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium bg-black/10 rounded-[14px] h-10">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            className="h-10 w-10 p-0 bg-black/10 rounded-[14px] grid place-items-center"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRight2 color="#1A1A1A" size={20} />
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="flex text-dark  px-4 items-center justify-center text-sm font-medium bg-black/10 rounded-[14px] h-10"
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
