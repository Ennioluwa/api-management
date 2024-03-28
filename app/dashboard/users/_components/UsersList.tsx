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
import { Edit2, SecuritySafe, Trash } from "iconsax-react";
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

  const columns: ColumnDef<UserDetails>[] = [
    {
      header: "Name",
      cell: (info) => (
        <span className=" flex items-center gap-3 font-bold">
          <span className="shrink-0 h-8 w-8 bg-gray-500 uppercase rounded-full text-white grid place-items-center text-lg font-semibold">
            {info.row.original.firstName.slice(0, 1)}
          </span>
          {info.row.original.firstName} {info.row.original.lastName}
        </span>
      ),
    },
    {
      header: "Email",
      cell: (info) => (
        <span className=" font-normal flex items-center gap-3">
          {info.row.original.emailConfirmed && (
            <SecuritySafe size={18} color="#1CA78B" variant="Bulk" />
          )}
          {info.row.original.email}
        </span>
      ),
    },
    {
      header: "Role",
      accessorKey: "roles",
      cell: (info) => (
        <span className=" font-bold">{info.row.original.roles[0] || ""}</span>
      ),
    },
    {
      header: "Actions",
      cell: (info) =>
        info.row.original.emailConfirmed ? (
          <div className="flex gap-3">
            <Edit2
              variant="Bulk"
              size={18}
              // onClick={() => handleDelete(info.row.original.userName)}
            />
            <Trash
              variant="Bulk"
              size={18}
              // onClick={() => handleDelete(info.row.original.userName)}
            />
          </div>
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
    <div className=" rounded-lg mt-5">
      <div className=" bg-white p-5">
        <h3 className=" font-bold pb-2.5 ">Users List</h3>
        <p className=" w-full md:w-2/3 lg:w-1/2 text-xs">
          View all your users and their verification status below in each tabs
        </p>
      </div>
      <Tabs defaultValue="all" className=" w-full ">
        <TabsList className=" w-full overflow-x-auto justify-start overflow-y-clip h-auto bg-white border-b border-[#EFEFEF]">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="unverified">Unverified</TabsTrigger>
        </TabsList>
        {isPending && (
          <div className=" bg-white w-full h-full grid place-items-center py-20">
            <PuffLoader color="#0062FF" />
          </div>
        )}
        {!isPending && (
          <>
            <TabsContent value="all">
              <DataTable columns={columns} data={allUsers} />
            </TabsContent>
            <TabsContent value="verified">
              <DataTable columns={columns} data={verifiedUsers} />
            </TabsContent>
            <TabsContent value="unverified">
              <DataTable columns={columns} data={unverifiedUsers} />
            </TabsContent>
          </>
        )}
      </Tabs>
      <AddUserModal />
    </div>
  );
};

export default UsersList;
