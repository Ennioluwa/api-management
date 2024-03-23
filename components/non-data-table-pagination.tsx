import { Button } from "./ui/button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

interface NonDataTablePaginationProps<TData> {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function NonDataTablePagination<TData>({
  hasNextPage,
  hasPreviousPage,
  currentPage,
  totalPages,
  pageIndex,
  setPageIndex,
}: NonDataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end pb-5">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setPageIndex(1)}
            disabled={!hasPreviousPage}
            className="flex text-dark  px-4 items-center justify-center text-sm font-medium bg-black/10 hover:bg-black/5 rounded-[14px] h-10"
          >
            First
          </Button>
          <Button
            className="h-10 w-10 p-0 bg-black/10 hover:bg-black/5 rounded-[14px] grid place-items-center"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={!hasPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeft2 color="#1A1A1A" size={20} />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium bg-black/10 rounded-[14px] h-10">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            className="h-10 w-10 p-0 bg-black/10 hover:bg-black/5 rounded-[14px] grid place-items-center"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRight2 color="#1A1A1A" size={20} />
          </Button>
          <Button
            onClick={() => setPageIndex(totalPages)}
            disabled={!hasNextPage}
            className="flex text-dark  px-4 items-center justify-center text-sm font-medium bg-black/10 hover:bg-black/5 rounded-[14px] h-10"
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
