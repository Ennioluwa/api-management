import Link from "next/link";
import { Home2 } from "iconsax-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TransactionDetails from "./_components/TransactionDetails";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className=" lg:ml-0 lg:container">
      <div className=" flex items-center gap-2 mb-6 py-2 text-xs font-bold text-dark ">
        <Link href="/dashboard/home" className=" contents">
          <Home2 variant="Outline" size="18px" color="#292D32" />
          <span className=" font-normal">Home</span>
        </Link>
        <ChevronRight size="16px" />
        <Link href="/dashboard/payment-history" className=" contents">
          <span className=" font-normal ">Transactions</span>
        </Link>
        <ChevronRight size="16px" />
        <Link
          href={`/dashboard/payment-history/${params.id}`}
          className=" contents"
        >
          <span className=" text-black">{params.id}</span>
        </Link>
      </div>
      <Link
        href="/dashboard/payment-history"
        className="flex items-center gap-2 mb-6 py-2 text-lg font-bold text-dark"
      >
        <ChevronLeft />
        Back
      </Link>
      <TransactionDetails transactionId={params.id} />
      {/* <ModifyApi ApiKeyId={params.id} /> */}
    </div>
  );
}
