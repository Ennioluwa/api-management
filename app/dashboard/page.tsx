"use client";

import axiosClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import Users from "./_components/Users";
import IsAdminAuth from "@/components/isAdminAuth";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className=" pt-20 bg-gray-300">
      dashboard page
      <Users />
    </div>
  );
};

export default IsAdminAuth(page);
