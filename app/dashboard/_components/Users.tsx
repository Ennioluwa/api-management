"use client";

import axiosClient from "@/lib/axiosInstance";
import { fetchUserList } from "@/lib/hooks/user.api";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";

interface UsersProps {}

const Users: FC<UsersProps> = ({}) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchUserList,
  });
  console.log(isPending, isError, data, error);
  return <div>Users</div>;
};

export default Users;
