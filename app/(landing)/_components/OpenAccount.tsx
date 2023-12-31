import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

interface OpenAccountProps {}

const accountSteps = [
  {
    position: "ONE",
    title: "Fill In Your Info",
    subtitle:
      "Provide your email and phone number and verify your phone number with an OTP.",
  },
  {
    position: "TWO",
    title: "Get Verified",
    subtitle:
      "Enter your Government-issued ID numbers and business registration IDs where necessary and our team will take it up from there.",
  },
  {
    position: "THREE",
    title: "Create Your First API",
    subtitle:
      "Create an API end-point to be used to sync between your existing Point-Of-Sales system and our system to keep track on all your business transactions",
  },
];

const OpenAccount: FC<OpenAccountProps> = ({}) => {
  return (
    <div className="py-10 lg:py-20 bg-[#F0F4F9] text-dark text-center px-5 lg:px-10">
      <div className="lg:container">
        <h3 className=" text-4xl font-bold mb-2.5">
          Open An Account In Just{" "}
          <span className=" text-bgPrimary  ">3 Steps</span>
        </h3>
        <h4 className=" text-xl mb-2.5">
          Focus on making more sales while we handle the rest for you.
        </h4>
        <div className="relative h-[26px] flex-1 mx-auto">
          <Image src={"/svgs/curvedLine.svg"} alt="curved line" fill />
        </div>
        <div className="flex flex-col lg:flex-row gap-6 gap-y-10 pt-10 lg:items-center">
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] lg:max-w-full mx-auto h-min">
            <Image
              src="/openAccountImage.png"
              alt="Open Account"
              fill
              className=" object-cover h-min"
            />
          </div>
          <div className="flex-1 text-left max-w-[500px] lg:max-w-full mx-auto">
            <div>
              {accountSteps.map((step, index) => (
                <div key={index} className=" pb-5">
                  <h6 className=" text-bgPrimary mb-5">STEP {step.position}</h6>
                  <h5 className=" text-4xl font-bold mb-2">{step.title}</h5>
                  <p className=" text-base">{step.subtitle}</p>
                  <Button className="my-5">GET STARTED</Button>
                  <div className=" w-[215px] h-[2px] border-[1.5px] border-dashed" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenAccount;
