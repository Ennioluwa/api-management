import { Button } from "@/components/ui/button";
import { Chart } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ServicesProps {}

const customerImages = [
  { name: "Unsplash", src: "/svgs/unsplash.svg" },
  { name: "Notion", src: "/svgs/notion.svg" },
  { name: "INTERCOM", src: "/svgs/intercom.svg" },
  { name: "descript", src: "/svgs/descript.svg" },
  { name: "grammarly", src: "/svgs/grammarly.svg" },
];

const Services: FC<ServicesProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="pt-10 bg-blue-50 lg:pt-32 text-dark text-center container">
      <>
        <h3 className=" text-4xl font-bold mb-2.5">
          Used By Over 2000 <span className=" text-bgPrimary  ">Customers</span>
        </h3>
        <h4 className=" text-xl mb-2.5">
          Our growing number of customers speaks for how great our service is{" "}
        </h4>
        <div className="relative h-[26px] flex-1 mx-auto">
          <Image src={"/svgs/curvedLine.svg"} alt="curved line" fill />
        </div>
        <div className=" pt-10 flex flex-wrap justify-center items-center gap-5 md:gap-10 pb-32">
          {customerImages.map((image, index) => (
            <div key={index} className="relative h-9 flex-1">
              <Image
                src={image.src}
                alt={image.name}
                fill
                className=" h-full shrink-0"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-x-20 gap-y-10">
          <div className="flex flex-col md:flex-row items-center gap-x-7">
            <h5 className=" text-4xl font-bold mb-2.5 max-w-[276px] text-left">
              Our service is Feature-Rich
            </h5>
            <p className=" text-xl mb-2.5 max-w-[500px] text-left">
              We offer a variety of interesting features that you can help
              increase yor productivity at work and manage your project easily
            </p>
          </div>
          <Button onClick={() => router.push("login")}>GET STARTED</Button>
        </div>
      </>
    </div>
  );
};

export default Services;
