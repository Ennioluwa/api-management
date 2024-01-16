import { Button } from "@/components/ui/button";
import HomeNav from "../_components/HomeNav";
import Settings from "./_components/Settings";
const page = () => {
  return (
    <div className=" lg:container lg:ml-0">
      <HomeNav text="Settings" />
      <h1 className=" py-5 text-4xl font-bold">Settings</h1>
      <Settings />
    </div>
  );
};

export default page;
