"use client";

import axiosClient from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import Users from "./_components/Users";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      dashboard page
      <Users />
    </div>
  );
};

export default page;
