import { MoneySend } from "iconsax-react";
import { FC } from "react";

interface TotalExpensesProps {
  empty?: boolean;
}

const TotalExpenses: FC<TotalExpensesProps> = ({ empty }) => {
  return (
    <div
      className={`${
        empty
          ? " bg-white text-black"
          : " bg-transparent border border-dashed border-white text-white"
      } flex  justify-between items-center gap-5 rounded-lg w-full flex-1 p-5`}
    >
      <div className=" space-y-1">
        <p className=" text-xs font-bold">TOTAL EXPENSES</p>
        <p className=" text-3xl font-bold">
          {empty ? "₦0" : "₦27,050"}
          <span className=" text-xs">{!empty ? ".34" : ".00"}</span>
        </p>
        <p className=" font-bold text-xs">All Expenses on Subscriptions</p>
      </div>
      <div
        className={`p-3 rounded-full  h-fit ${
          empty ? "bg-[#A71C1C]/10" : "bg-white/65"
        }`}
      >
        <MoneySend size={25} variant="Bulk" color="#a71c1c" />
      </div>
    </div>
  );
};

export default TotalExpenses;
