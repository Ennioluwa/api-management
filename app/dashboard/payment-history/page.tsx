import { Button } from "@/components/ui/button";
import HomeNav from "../_components/HomeNav";
import { Plus } from "lucide-react";
import PaymentList from "./_components/PaymentList";
import PaymentHeader from "./_components/PaymentHeader";

const page = () => {
  return (
    <div className=" lg:container lg:ml-0">
      <HomeNav text="Payment History" />
      <PaymentHeader />
      <PaymentList />
    </div>
  );
};

export default page;
