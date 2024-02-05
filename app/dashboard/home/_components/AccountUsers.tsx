import { fetchUsers } from "@/lib/hooks/api/users.api";
import { DeleteUserManagement } from "@/lib/hooks/useUserManagement";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "iconsax-react";
import { FC, useEffect } from "react";
import { PuffLoader } from "react-spinners";

interface AccountUsersProps {}

const AccountUsers: FC<AccountUsersProps> = ({}) => {
  const queryClient = useQueryClient();

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

  const {
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    data: isDeleteData,
    isPending: isDeletePending,
    mutate: deleteUser,
  } = DeleteUserManagement();

  const handleDelete = (email: string) => {
    console.log(email);
    deleteUser({ email });
  };

  useEffect(() => {
    console.log(isDeleteData, "data ");
    queryClient.refetchQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }, [isDeleteError, isDeleteSuccess]);

  if (isPending || users === undefined)
    return (
      <div className=" w-full h-full grid place-items-center py-20">
        <PuffLoader color="#0062FF" />
      </div>
    );

  return (
    <div className=" p-5 border border-[#9A9AAF] border-dashed rounded-lg">
      <h2 className=" text-3xl font-bold pb-4">Account Users</h2>
      <div className=" flex flex-col gap-4">
        {users.map((user, index) => {
          if (index > 8) return;
          return (
            <div key={index} className=" flex flex-col gap-4">
              <div className=" flex justify-between items-center">
                <div className=" flex gap-4 items-center">
                  <div>
                    <p className=" font-bold">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className=" text-xs">{user.email}</p>
                  </div>
                </div>
                <div onClick={() => handleDelete(user.email)}>
                  <Trash
                    variant="Bulk"
                    color="#292D32"
                    className=" cursor-pointer"
                  />
                </div>
              </div>
              {index !== users.length && (
                <hr className=" border-dashed border-[#9A9AAF)]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountUsers;
