"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Home2, SecuritySafe } from "iconsax-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { fetchUserByEmail } from "@/lib/hooks/api/users.api";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useAppDispatch } from "@/lib/hooks";
import { onModifyUserOpen, onOpen } from "@/redux/features/addUserSlice";
import Modal from "@/components/Modal";
import ModifyUserModal from "../../_components/modify-user-modal";
import AddUserModal from "../../_components/add-user-modal";

interface UserHeaderProps {
  email: string;
}

const UserHeader: FC<UserHeaderProps> = async ({ email }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  //   const {
  //     isPending,
  //     isError,
  //     data: user,
  //     error,
  //     refetch,
  //   } = useQuery({
  //     queryKey: ["user"],
  //     queryFn: () => fetchUserByEmail({ email }),
  //   });

  const user = {} as any;

  const handleDeleteUser = () => {
    setDeleteConfirm(false);
    setDeleteSuccess(true);
  };

  return (
    <>
      <div className=" flex items-center gap-2 mb-6 py-2 text-xs font-bold text-dark ">
        <Link href="/dashboard/home" className=" contents">
          <Home2 variant="Outline" size="18px" color="#292D32" />
          <span className=" font-normal">Home</span>
        </Link>
        <ChevronRight size="16px" />
        <Link href="/dashboard/users" className=" contents">
          <span className=" font-normal ">User Management</span>
        </Link>
        <ChevronRight size="16px" />
        <Link href={`/dashboard/users/${user?.email}`} className=" contents">
          <span className=" text-black flex gap-1">
            {user?.firstName}
            {user?.lastName}
          </span>
        </Link>
      </div>
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        className="flex items-center gap-2 px-0 mb-6 py-2 text-lg font-bold text-dark"
      >
        <ChevronLeft />
        Back
      </Button>

      <div className="lg:container lg:ml-0 grid place-items-center p-5 rounded-lg bg-[#fff]/60">
        <div className="flex flex-col items-center text-center gap-3 bg-white container max-w-[300px] mx-auto p-5 border border-dashed border-[#2488FF0D]/10 rounded-lg">
          <h2 className=" text-3xl font-bold text-black flex gap-1">
            {/* {user?.firstName}{user?.lastName}  */}
            Al-Mohammad Aliyu
          </h2>
          <p className=" text-[#0062FF] text-xs font-bold">
            {user?.roles || "IT Support"}
          </p>
          <div className="flex items-center gap-2">
            <span>
              <SecuritySafe size={30} variant="Bulk" color="#1CA78B" />
            </span>
            <span>{user?.email || "almohammad@gmail.com"}</span>
          </div>
          <div className="flex justify-between w-full gap-3 rounded-b-lg overflow-clip">
            <Button
              className=" flex-1 w-full rounded-none"
              onClick={() => dispatch(onModifyUserOpen())}
            >
              EDIT
            </Button>
            <Button
              className=" flex-1 w-full rounded-none"
              onClick={() => setDeleteConfirm(true)}
            >
              DELETE
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="ARE YOU SURE?"
        content={
          <div>
            <h6 className=" font-bold text-xl">DELETE USERS?</h6>
            <p>
              When you delete these users, their roles and permissions will be
              vacated and their logs will be lost forever
            </p>
          </div>
        }
        headerTextColor="#A71C1C"
        isPendingText="DELETING"
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        cancelButton="CANCEL"
        primaryButton="DELETE"
        primaryButtonAction={() => {
          handleDeleteUser();
        }}
      />
      <Modal
        title="Action Successful"
        content={
          <div>
            <h6 className=" font-bold text-xl">USER DELETED</h6>
            <p>
              Users have been deleted from your account. You can still add new
              users by clicking the “Add New” button below.
            </p>
          </div>
        }
        open={deleteSuccess}
        setOpen={setDeleteSuccess}
        cancelButton="CLOSE"
        primaryButton="ADD NEW"
        primaryButtonAction={() => {
          setDeleteSuccess(false);
          dispatch(onOpen());
        }}
      />
      <ModifyUserModal
        firstName=""
        lastName=""
        email=""
        roles={[{ label: "Super Admin", value: "ClientAdmins" }]}
      />
      <AddUserModal />
      {/* {pending && <Loader />} */}
    </>
  );
};

export default UserHeader;
