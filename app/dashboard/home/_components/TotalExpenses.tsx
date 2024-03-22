import { useAppSelector } from "@/lib/hooks";
import { fetchDashboardProps } from "@/lib/hooks/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";
import { MoneySend } from "iconsax-react";
import { FC } from "react";
import { PuffLoader } from "react-spinners";

interface TotalExpensesProps {
  empty?: boolean;
}

const TotalExpenses: FC<TotalExpensesProps> = ({ empty }) => {
  const { userData } = useAppSelector((state) => state.user);
  const {
    isPending,
    isError,
    data: dashboard,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboardProps({ companyId: userData?.companyId }),
  });

  if ((isPending && !empty) || (!dashboard && !empty))
    return (
      <div
        className={` grid place-items-center w-full bg-blue rounded-lg py-6 flex-1 ${
          empty
            ? " bg-white text-black"
            : " bg-transparent border border-dashed border-white text-white"
        }`}
      >
        <PuffLoader color="#fff" />
      </div>
    );

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
          {empty ? "₦0" : `₦${dashboard.totalTaxAmount || 0}`}
          <span className=" text-xs">.00</span>
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
