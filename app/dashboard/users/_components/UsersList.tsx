"use client";

import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/hooks/api/users.api";
import AddUserModal from "./add-user-modal";

interface UsersListProps {}

const UsersList: FC<UsersListProps> = ({}) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    // keepPreviousData: true,
    // staleTime: 5000,
  });
  console.log(data);

  return (
    <div className=" bg-white rounded-lg mt-5">
      <div className=" p-5">
        <h3 className=" font-bold pb-2.5 ">Users List</h3>
        <p className=" w-full md:w-2/3 lg:w-1/2 text-xs">
          View all your users and their verification status below in each tabs
        </p>
      </div>
      <Tabs defaultValue="all" className="">
        <TabsList className=" my-2 p-0">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
        </TabsList>
        <TabsContent className=" px-5" value="all">
          <DataTable type="all" columns={columns} data={data} />
        </TabsContent>
        <TabsContent className=" px-5" value="verified">
          <DataTable type="verified" columns={columns} data={data} />
        </TabsContent>
        <TabsContent className=" px-5" value="unverified">
          <DataTable type="unverified" columns={columns} data={data} />
        </TabsContent>
      </Tabs>
      <AddUserModal />
    </div>
  );
};

export default UsersList;
