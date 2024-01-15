"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/hooks/api/users.api";
import { deleteUser } from "@/lib/hooks/api/users.api";
import { UserManagementData } from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash } from "iconsax-react";
import AddUserModal from "./add-user-modal";

interface UsersListProps {}

const UsersList: FC<UsersListProps> = ({}) => {
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
  const [allUsers, setAllUsers] = useState<UserManagementData[]>([]);
  const [verifiedUsers, setVerifiedUsers] = useState<UserManagementData[]>([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState<UserManagementData[]>(
    []
  );

  useEffect(() => {
    if (users) {
      setAllUsers(users);

      setVerifiedUsers(users.filter((u) => u.emailConfirmed));

      setUnverifiedUsers(users.filter((u) => !u.emailConfirmed));
    }
  }, [users]);

  const queryClient = useQueryClient();
  const columns: ColumnDef<UserManagementData>[] = [
    {
      header: "Name",
      cell: (info) =>
        `${info.row.original.firstName} ${info.row.original.lastName}`,
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "roles",
      cell: (info) => info.row.original.roles[0] || "",
    },
    {
      header: "Access",
      cell: (info) =>
        info.row.original.roles.includes("ClientAdmins") ? "Full" : "Custom",
    },
    {
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center gap-2">
          {/* <Edit2 variant="Bulk" onClick={() => editUser(info.row.original)} /> */}
          <Trash
            variant="Bulk"
            onClick={() => handleDeleteUser(info.row.original)}
          />
        </div>
      ),
    },
  ];

  async function handleDeleteUser(user: UserManagementData) {
    // delete user logic
    console.log(user, "delete user");
    const data = await deleteUser(user);

    queryClient.invalidateQueries({ queryKey: ["users"] });
    refetch();
    console.log(data);
  }

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
        {isPending && <p>Loading..</p>}
        {users && (
          <>
            <TabsContent className=" px-5" value="all">
              <DataTable type="all" columns={columns} data={allUsers} />
            </TabsContent>
            <TabsContent className=" px-5" value="verified">
              <DataTable
                type="verified"
                columns={columns}
                data={verifiedUsers}
              />
            </TabsContent>
            <TabsContent className=" px-5" value="unverified">
              <DataTable
                type="unverified"
                columns={columns}
                data={unverifiedUsers}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
      <AddUserModal />
    </div>
  );
};

export default UsersList;
