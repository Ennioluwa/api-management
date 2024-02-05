import { FC } from "react";
import Navbar from "../_components/Navbar";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";
import Link from "next/link";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Navbar text="Login to your Account" link="/login" />
      <div className=" flex flex-col gap-8 container max-w-[440px] mx-auto p-8 border border-dashed border-[#2488FF0D]/10 rounded-lg ">
        <div>
          <h3 className=" text-xl font-bold mb-2.5">Change your Password</h3>
          <h4 className=" text-xs mb-2.5">
            You need to change your password in order to use our service.
          </h4>
        </div>

        <ChangePasswordForm />
        <div className=" text-center rounded-lg bg-[#2488FF0D] bg-opacity-5 px-5 py-8 text-xs flex flex-col gap-2.5">
          <p>Having problems logging in?</p>
          <Link className="font-bold text-bgPrimary " href="/contact">
            Chat with us
          </Link>
        </div>
        <p className=" text-center text-xs text-dark">
          (C) 2023. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default page;
