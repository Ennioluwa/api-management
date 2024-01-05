import { FC } from "react";
import Navbar from "../_components/Navbar";
import Link from "next/link";
import { TickSquare } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { KycForm } from "./_components/KycForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <Navbar />
      <div className=" py-40">
        <div className="container max-w-xl p-8 border rounded-lg space-y-8 ">
          <div>
            <h3 className=" text-xl font-bold mb-2.5">
              Welcome Nusaiba, Tell us about your company
            </h3>
            <h4 className=" text-xs mb-2.5">
              Enter appropriate and official information about your business
              below
            </h4>
          </div>

          <KycForm />
        </div>
      </div>
    </div>
  );
};

export default page;
