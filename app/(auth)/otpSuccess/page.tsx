import { FC } from "react";
import Navbar from "./_components/Navbar";
import Link from "next/link";
import { TickSquare } from "iconsax-react";
import { Button } from "@/components/ui/button";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Navbar />
      <div className=" pt-10">
        <div className="container max-w-[430px] p-8 border rounded-lg flex flex-col justify-center items-center gap-8 text-center">
          <TickSquare
            size="161px"
            color="#0071F2"
            variant="Bold"
            fill="#0071F2"
          />
          <div className=" -pt-5 space-y-2.5">
            <h5 className=" font-bold text-3xl uppercase text-bgPrimary">
              Account Activated
            </h5>
            <p className=" text-black text-base">
              Your account has been successfully activated. You can proceed to
              complete your KYC to have access to your account.
            </p>
          </div>
          <Link href={"/kyc/business-information"} className=" w-full">
            <Button className=" w-full">SETUP KYC</Button>
          </Link>

          <div className=" text-center rounded-lg bg-[#2488FF0D] bg-opacity-5 px-5 py-8 text-xs flex flex-col gap-2.5 w-full">
            <p>Having problems logging in?</p>
            <Link className="font-bold text-bgPrimary " href="/contact">
              Chat with us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
