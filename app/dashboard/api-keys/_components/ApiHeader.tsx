"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { onOpen } from "@/redux/features/apiKeySlice";
import { Plus } from "lucide-react";
import { FC } from "react";

interface UserHeaderProps {}

const UserHeader: FC<UserHeaderProps> = ({}) => {
  const dispatch = useAppDispatch();
  return (
    <div className=" flex flex-wrap gap-4 items-center">
      <h1 className=" text-4xl font-bold">API Key Manager</h1>
      <Button
        variant="outline"
        className=" text-bgPrimary border-bgPrimary bg-transparent"
        onClick={() => dispatch(onOpen())}
      >
        <Plus />
        ADD NEW API
      </Button>
    </div>
  );
};

export default UserHeader;
