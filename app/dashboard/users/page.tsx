import { Button } from "@/components/ui/button";
import HomeNav from "../_components/HomeNav";
import { Plus } from "lucide-react";
import UserRoles from "./_components/UserRoles";
import UsersList from "./_components/UsersList";

const page = () => {
  return (
    <div className=" lg:container">
      <HomeNav text="Users Management" />
      <div className=" flex gap-4 items-center">
        <h1 className=" text-4xl font-bold">Users</h1>
        <Button
          variant="outline"
          className=" text-bgPrimary border-bgPrimary bg-transparent"
        >
          <Plus />
          ADD A NEW USER
        </Button>
      </div>
      <UserRoles />
      <UsersList />
    </div>
  );
};

export default page;
