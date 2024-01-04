import { FC } from "react";
import Navbar from "../_components/Navbar";
import { SignupForm } from "./_components/SignupForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Navbar text="Log-on to your Account" link="/login" />
      <div className=" pt-40 container max-w-xl mx-auto">
        <h3 className=" text-xl font-bold mb-2.5">Login to your Account</h3>
        <h4 className=" text-sm mb-2.5 pb-7">
          Welcome to our service. We’re thrilled that you’re interested in using
          our service.
        </h4>
        <SignupForm />
      </div>
    </div>
  );
};

export default page;
