"use client";

import { useAppSelector } from "@/lib/hooks";
import { FC } from "react";

interface BusinessIdentityHeaderProps {}

const BusinessIdentityHeader: FC<BusinessIdentityHeaderProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <div>
      <h3 className=" text-xl font-bold mb-2.5">
        Welcome {userData?.firstName}, Tell us about your company
      </h3>
      <h4 className=" text-xs mb-2.5">
        Enter appropriate and official information about your business below
      </h4>
    </div>
  );
};

export default BusinessIdentityHeader;
