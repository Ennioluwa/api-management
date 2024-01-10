"use client";

import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../../home/_components/data-table";
import { User, columns } from "./columns";

interface UsersListProps {}

const UsersList: FC<UsersListProps> = ({}) => {
  const data: User[] = [
    {
      name: "Al-Mohammad Aliyu",
      email: "almohammad@gmail.com",
      role: "IT Support",
      access: "Custom ",
      action: 12342134,
    },
    {
      name: "Al-Mohammad Aliyu",
      email: "almohammad@gmail.com",
      role: "IT Support",
      access: "Custom ",
      action: 12342134,
    },
    {
      name: "Al-Mohammad Aliyu",
      email: "almohammad@gmail.com",
      role: "IT Support",
      access: "Custom ",
      action: 12342134,
    },
    {
      name: "Al-Mohammad Aliyu",
      email: "almohammad@gmail.com",
      role: "IT Support",
      access: "Custom ",
      action: 12342134,
    },
    {
      name: "Al-Mohammad Aliyu",
      email: "almohammad@gmail.com",
      role: "IT Support",
      access: "Custom ",
      action: 12342134,
    },
    {
      name: "Al-Mohammad Aliyu",
      email: "almohammad@gmail.com",
      role: "IT Support",
      access: "Custom ",
      action: 12342134,
    },
    {
      name: "Al-Mohammad Aliyu",
      email: "almohammad@gmail.com",
      role: "IT Support",
      access: "Custom ",
      action: 12342134,
    },
  ];
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
          <DataTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent className=" px-5" value="verified">
          <DataTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent className=" px-5" value="unverified">
          <DataTable columns={columns} data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersList;
