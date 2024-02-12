import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

interface DocumentationProps {}

const documentationSteps = [
  {
    position: "ONE",
    title: "Create an API",
    subtitle:
      "Create an API end-point to be used to sync between your existing Point-Of-Sales system and our system to keep track on all your business transactions",
  },
  {
    position: "TWO",
    title: "Connect it with existing system",
    subtitle:
      "Connect with an existing point of sale system to immediately integrate your operations into our system",
  },
  {
    position: "THREE",
    title: "Start Receiving Data",
    subtitle:
      "Now, you can easily see all of your data being parsed onto our system from yours while we ensure your remittance to the government is taken care of.",
  },
];

const Documentation: FC<DocumentationProps> = ({}) => {
  return (
    <div className="pt-10 lg:pt-20 bg-[#F0F4F9] text-dark text-center px-5 lg:px-10">
      <div className="lg:container">
        <h3 className=" text-4xl font-bold mb-2.5">
          Well-Documented{" "}
          <span className=" text-bgPrimary  ">API Integration</span>
        </h3>
        <h4 className=" text-xl mb-2.5">
          Our team have written an extensive developer’s documentation for easy
          integration with your existing systems
        </h4>
        <div className="relative h-[26px] flex-1 mx-auto">
          <Image src={"/svgs/curvedLine.svg"} alt="curved line" fill />
        </div>
        <Button className="my-5">SEE OUR DOCUMENTATION</Button>

        <div className="flex flex-col lg:flex-row gap-6 gap-y-10 pt-5 lg:items-center">
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] lg:max-w-full mx-auto h-min">
            <Image
              src="/openAccountImage.png"
              alt="Open Account"
              fill
              className=" object-cover h-min"
            />
          </div>
          <div className="flex-1 text-left">
            <div>
              {documentationSteps.map((step, index) => (
                <div
                  key={index}
                  className=" px-5 pb-5 pl-10 border-l-[3px] border-bgPrimary border-dashed relative"
                >
                  <div className=" absolute top-0 left-[-22px] h-11 w-11 z-20 p-2 bg-white rounded-full grid place-items-center">
                    <div className=" bg-bgPrimary w-full h-full text-white grid place-items-center rounded-full">
                      {index + 1}
                    </div>
                  </div>
                  <h6 className=" text-bgPrimary mb-5">STEP {step.position}</h6>
                  <h5 className=" text-4xl font-bold mb-2">{step.title}</h5>
                  <p className=" text-base mb-5">{step.subtitle}</p>
                  {index !== documentationSteps.length - 1 && (
                    <div className=" w-[215px] h-[2px] border-[1.5px] border-dashed" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
