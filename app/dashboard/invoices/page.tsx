import { Button } from "@/components/ui/button";
import HomeNav from "../_components/HomeNav";
import { Plus } from "lucide-react";
import InvoiceGlance from "./_components/InvoiceGlance";
import InvoiceHeader from "./_components/InvoiceHeader";
import InvoiceList from "./_components/InvoiceList";

const page = () => {
  return (
    <div className=" lg:container lg:ml-0">
      <HomeNav text="Invoice Manager" />
      <InvoiceHeader />
      <InvoiceGlance />
      <InvoiceList />
    </div>
  );
};

export default page;
