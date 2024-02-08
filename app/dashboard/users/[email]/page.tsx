import Link from "next/link";
import { Home2 } from "iconsax-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UserHeader from "./components/UserHeader";

export default function Page({ params }: { params: { email: string } }) {
  return (
    <div>
      <UserHeader email={params.email} />
      {/* <TransactionDetails transactionId={params.id} /> */}
      {/* <ModifyApi ApiKeyId={params.id} /> */}
    </div>
  );
}
