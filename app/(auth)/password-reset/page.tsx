import { FC } from "react";
import Navbar from "../_components/Navbar";
import Link from "next/link";
import { PasswordResetForm } from "./_components/PasswordResetForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Navbar text="Login to your Account" link="/login" />
      <div className="container max-w-[440px] p-8 border rounded-lg space-y-8 ">
        <div>
          <h3 className=" text-xl font-bold mb-2.5">Reset your Password</h3>
          <h4 className=" text-xs mb-2.5">Enter the new password</h4>
        </div>

        <PasswordResetForm />
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
