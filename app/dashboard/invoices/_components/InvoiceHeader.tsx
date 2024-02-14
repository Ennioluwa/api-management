"use client";

import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import { useAppDispatch } from "@/lib/hooks";
import { addDays, format } from "date-fns";
import { FC, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "iconsax-react";
import { Calendar } from "@/components/ui/calendar";

interface InvoiceListProps {}

const InvoiceList: FC<InvoiceListProps> = ({}) => {
  const dispatch = useAppDispatch();
  const pastMonth = new Date();

  const [range, setRange] = useState<DateRange | undefined>(undefined);

  let footer = <CalendarIcon />;

  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <div className=" flex gap-4 justify-between items-center">
      <h1 className=" text-4xl font-bold">Invoice Manager</h1>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-auto text-left border-none font-normal",
              !range && "text-muted-foreground"
            )}
          >
            {footer}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            id="invoice"
            mode="range"
            defaultMonth={pastMonth}
            selected={range}
            onSelect={setRange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InvoiceList;
