import { InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import React from "react";

export interface SearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleClose: () => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, handleClose, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex relative h-10 items-center rounded-md border-[2px] border-input bg-white text-sm ring-offset-background focus-within:border-bgPrimary focus-within:ring-offset-2",
          className
        )}
      >
        <div className="absolute left-3 inset-y-0 grid place-items-center h-full">
          <SearchIcon className="h-[16px] w-[16px]" />
        </div>

        <input
          {...props}
          type="text"
          ref={ref}
          className="w-full p-2 pl-9 pr-6 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        {props.value && (
          <div className="cursor-pointer absolute right-3 inset-y-0 grid place-items-center h-full">
            <X size={14} onClick={handleClose} />
          </div>
        )}
      </div>
    );
  }
);

Search.displayName = "Search";

export { Search };
