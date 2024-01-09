import { Trash } from "iconsax-react";
import { FC } from "react";

interface AccountUsersProps {}

const AccountUsers: FC<AccountUsersProps> = ({}) => {
  const items = [1, 2, 3, 4, 5];
  return (
    <div className=" p-5 border border-[#9A9AAF] border-dashed rounded-lg">
      <h2 className=" text-3xl font-bold pb-4">Account Users</h2>
      <div className=" flex flex-col gap-4">
        {items.map((number, index) => {
          return (
            <div className=" flex flex-col gap-4">
              <div className=" flex justify-between items-center">
                <div className=" flex gap-4 items-center">
                  <p className=" h-10 w-10 rounded-full bg-gray-200"></p>
                  <div>
                    <p className=" font-bold">Ret SILO</p>
                    <p className=" text-xs">retsilo@gmail.com</p>
                  </div>
                </div>
                <div>
                  <Trash variant="Bulk" color="#292D32" />
                </div>
              </div>
              {index !== items.length && (
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
