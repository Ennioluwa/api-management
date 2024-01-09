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
          : " bg-transparent p-5 border border-dashed border-white text-white"
      } flex  justify-between items-center gap-5 rounded-lg w-full flex-1`}
    >
      <div className=" space-y-1">
        <p className=" text-xs font-bold">TOTAL EXPENSES</p>
        <p className=" text-3xl font-bold">
          ₦27,050<span className=" text-xs">.34</span>
        </p>
        <p className=" font-bold text-xs">All Expenses on Subscriptions</p>
      </div>
      <div className=" p-3 rounded-full bg-white/65 h-fit ">
        <MoneySend variant="Bulk" color="#a71c1c" />
      </div>
    </div>
  );
};

export default TotalExpenses;
