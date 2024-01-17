import { Button } from "@/components/ui/button";
import HomeNav from "../_components/HomeNav";
import { Plus } from "lucide-react";
import SubscriptionList from "./_components/SubscriptionList";
import SubscriptionFee from "./_components/SubscriptionFee";

const page = () => {
  return (
    <div className=" lg:container lg:ml-0">
      <HomeNav text="Manage Payment Options" />
      <div className="flex flex-col lg:flex-row gap-4 bg-[#F0F4F9] p-5 rounded-lg">
        <SubscriptionList />
        <SubscriptionFee />
      </div>
    </div>
  );
};

export default page;
