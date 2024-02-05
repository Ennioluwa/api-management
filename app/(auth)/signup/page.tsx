import { FC } from "react";
import Navbar from "../_components/Navbar";
import { SignupForm } from "./_components/SignupForm";
import Container from "../_components/Container";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Navbar text="Login to your Account" link="/login" />
      <>
        <div className=" container max-w-[440px] mx-auto p-8 border border-dashed border-[#2488FF0D]/10 rounded-lg ">
          <h3 className=" text-xl font-bold mb-2.5">Create a new Account</h3>
          <h4 className=" text-sm mb-2.5 pb-7">
            Welcome to our service. We’re thrilled that you’re interested in
            using our service.
          </h4>
          <SignupForm />
        </div>
      </>
    </>
  );
};

export default page;
