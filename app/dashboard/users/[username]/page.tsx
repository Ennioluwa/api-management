import Link from "next/link";
import { Home2 } from "iconsax-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UserHeader from "./components/UserHeader";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <div>
      <UserHeader username={params.username} />
      {/* <TransactionDetails transactionId={params.id} /> */}
      {/* <ModifyApi ApiKeyId={params.id} /> */}
    </div>
  );
}
