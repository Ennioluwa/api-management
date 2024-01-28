import { FC } from "react";
import Navbar from "../_components/Navbar";
import { LoginForm } from "./_components/LoginForm";
import Link from "next/link";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Navbar text="Create an Account" link="/signup" />
      <div className=" flex flex-col gap-8 mt-32 container max-w-xl mx-auto p-8 border border-dashed border-[#2488FF0D]/10 rounded-lg ">
        <div>
          <h3 className=" text-xl font-bold mb-2.5">Login to your Account</h3>
          <h4 className=" text-xs mb-2.5">
            Welcome to our service. We’re thrilled that you’re interested in
            using our service.
          </h4>
        </div>

        <LoginForm />
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
    </div>
  );
};

export default page;
