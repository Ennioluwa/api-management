"use client";

import Navbar from "../_components/Navbar";
import BusinessIdentityForm from "./_components/BusinessIdentityForm";
import Authenticated from "./_components/Authenticated";
import { useAppSelector } from "@/lib/hooks";

const page = ({}) => {
  const { userData } = useAppSelector((state) => state.user);
  return (
    <Authenticated>
      <div>
        <Navbar />
        <div className=" py-40">
          <div className="container max-w-[440px] p-8 border rounded-lg space-y-8 ">
            <div>
              <h3 className=" text-xl font-bold mb-2.5">
                Welcome {userData?.firstName}, Tell us about your company
              </h3>
              <h4 className=" text-xs mb-2.5">
                Enter appropriate and official information about your business
                below
              </h4>
            </div>

            <BusinessIdentityForm />
          </div>
        </div>
      </div>
    </Authenticated>
  );
};

export default page;
