"use client";

import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/lib/hooks/api/users.api";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

interface UserRolesProps {}

interface RoleCount {
  [key: string]: number;
}
interface User {
  roles: string[];
}

const UserRoles: FC<UserRolesProps> = ({}) => {
  const [roles, setRoles] = useState<RoleCount>({});
  const OPTIONS = [
    { label: "Super Admin", value: "ClientAdmins" },
    {
      label: "Sales Representative",
      value: "ClientSalesReps",
    },
    {
      label: "Finance Officers",
      value: "ClientFinanceOfficers",
    },
  ];

  const matchOptions = (option: string) => {
    const value = OPTIONS.filter((item) => item.value === option);
    console.log(value);
    if (value.length) return value[0].label;
    return option;
  };
  const {
    isPending,
    isError,
    data: users,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,

    // staleTime: 5000,
  });

  useEffect(() => {
    if (users === (null || undefined)) return setRoles({});
    const roles = users?.map((user) => user.roles);

    const countRoles = (rolesArr: string[][]) =>
      rolesArr.reduce((acc: RoleCount, roles: any) => {
        roles.forEach((role: any) => {
          if (!acc[role]) {
            acc[role] = 0;
          }
          acc[role]++;
        });
        return acc;
      }, {});

    const roleCounts = countRoles(roles);

    setRoles(roleCounts);
  }, [users]);

  console.log(roles);

  return (
    <div className=" rounded-lg bg-white p-5 mt-5 w-full">
      <h3 className=" font-bold pb-2.5 ">User Roles Available</h3>
      <p className=" w-full md:w-2/3 lg:w-1/2 text-xs pb-6">
        A role provides access to predefined menus and features so that
        depending on the assigned role (Super Admin, Manager, Customer Support),
        a user can have access to what they needs
      </p>
      {isPending ? (
        <div className=" bg-white w-full h-[112px] grid place-items-center">
          <PuffLoader color="#0062FF" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full justify-start items-center gap-5 flex-wrap">
          {Object.entries(roles).map(([role, count], index) => {
            return (
              <div
                key={index}
                className="p-4 border border-[#9A9AAF] border-dashed rounded-lg space-y-2 min-w-40 md:max-w-80 w-full flex-1 "
              >
                <h5 className=" text-xs font-bold">{matchOptions(role)}</h5>
                <h6 className=" text-xl">{count} Users</h6>
                <Button
                  className=" text-xs text-bgPrimary font-bold p-0 m-0 h-fit"
                  variant="ghost"
                >
                  LEARN MORE
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserRoles;
