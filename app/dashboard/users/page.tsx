import { Button } from "@/components/ui/button";
import HomeNav from "../_components/HomeNav";
import { Plus } from "lucide-react";
import UserRoles from "./_components/UserRoles";
import UsersList from "./_components/UsersList";
import UserHeader from "./_components/UserHeader";

const page = () => {
  return (
    <div className=" lg:container lg:ml-0">
      <HomeNav text="Users Management" />
      <UserHeader />
      <UserRoles />
      <UsersList />
    </div>
  );
};

export default page;
