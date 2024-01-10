import { Button } from "@/components/ui/button";
import { FC } from "react";

interface UserRolesProps {}

const UserRoles: FC<UserRolesProps> = ({}) => {
  return (
    <div className=" rounded-lg bg-white p-5 mt-5">
      <h3 className=" font-bold pb-2.5 ">User Roles Available</h3>
      <p className=" w-full md:w-2/3 lg:w-1/2 text-xs pb-6">
        A role provides access to predefined menus and features so that
        depending on the assigned role (Super Admin, Manager, Customer Support),
        a user can have access to what they needs
      </p>
      <div className="flex flex-col md:flex-row w-full justify-between items-center gap-5 flex-wrap">
        {[1, 2, 3, 4].map((role, index) => (
          <div
            key={index}
            className="p-4 border border-dashed rounded-lg space-y-2 min-w-40 md:max-w-80 w-full flex-1 "
          >
            <h5 className=" text-xs font-bold">Super Admin</h5>
            <h6 className=" text-xl">2 Users</h6>
            <Button
              className=" text-xs text-bgPrimary font-bold p-0 m-0 h-fit"
              variant="ghost"
            >
              LEARN MORE
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoles;
