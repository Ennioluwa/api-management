"use client";

import { FC, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, resendVerification } from "@/lib/hooks/api/users.api";
import { deleteUser } from "@/lib/hooks/api/users.api";
import { UserDetails } from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Trash } from "iconsax-react";
import AddUserModal from "./add-user-modal";
import { PuffLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [allUsers, setAllUsers] = useState<UserDetails[]>([]);
  const [verifiedUsers, setVerifiedUsers] = useState<UserDetails[]>([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState<UserDetails[]>([]);

  useEffect(() => {
    if (users) {
      setAllUsers(users);

      setVerifiedUsers(users.filter((u) => u.emailConfirmed));

      setUnverifiedUsers(users.filter((u) => !u.emailConfirmed));
    }
  }, [users]);

  const handleResendVerification = async (username: string) => {
    try {
      const data = await resendVerification({ username });
      toast.success("Email successfully sent");
    } catch (error) {
      toast.error("An error has occured here");
    }
    console.log(error);
  };

  const queryClient = useQueryClient();
  const columns: ColumnDef<UserDetails>[] = [
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
      header: "Actions",
      cell: (info) =>
        info.row.original.emailConfirmed ? (
          <Trash
            variant="Bulk"
            onClick={() => handleDelete(info.row.original.userName)}
          />
        ) : (
          <Button
            className=" uppercase"
            // todo
            onClick={() => handleResendVerification(info.row.original.userName)}
          >
            Resend verification
          </Button>
        ),
    },
  ];
  const router = useRouter();

  const handleDelete = (userName: string) => {
    router.push(`/dashboard/users/${userName}`);
  };
  return (
    <div className=" bg-white rounded-lg mt-5">
      <div className=" p-5">
        <h3 className=" font-bold pb-2.5 ">Users List</h3>
        <p className=" w-full md:w-2/3 lg:w-1/2 text-xs">
          View all your users and their verification status below in each tabs
        </p>
      </div>
      <Tabs defaultValue="all" className=" w-full ">
        <TabsList className=" w-full overflow-x-auto justify-start overflow-y-clip h-auto ">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
        </TabsList>
        {isPending && (
          <div className=" w-full h-full grid place-items-center py-20">
            <PuffLoader color="#0062FF" />
          </div>
        )}
        {!isPending && (
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
