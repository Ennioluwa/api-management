import { Button } from "@/components/ui/button";
import { Chart } from "iconsax-react";
import Image from "next/image";
import { FC } from "react";

interface ServicesProps {}

const customerImages = [
  { name: "Unsplash", src: "/svgs/unsplash.svg" },
  { name: "Notion", src: "/svgs/notion.svg" },
  { name: "INTERCOM", src: "/svgs/intercom.svg" },
  { name: "descript", src: "/svgs/descript.svg" },
  { name: "grammarly", src: "/svgs/grammarly.svg" },
];

const services = [
  {
    title: "Daily Analytics",
    subtitle:
      "We always provide useful informatin to make it easier for you every day",
    icon: Chart,
  },
  {
    title: "Daily Analytics",
    subtitle:
      "We always provide useful informatin to make it easier for you every day",
    icon: Chart,
  },
  {
    title: "Daily Analytics",
    subtitle:
      "We always provide useful informatin to make it easier for you every day",
    icon: Chart,
  },
  {
    title: "Daily Analytics",
    subtitle:
      "We always provide useful informatin to make it easier for you every day",
    icon: Chart,
  },
];

const Services: FC<ServicesProps> = ({}) => {
  return (
    <div className="pt-10 bg-blue-50 lg:pt-20 text-dark text-center px-5 lg:px-10">
      <div className="lg:container">
        <h3 className=" text-4xl font-bold mb-2.5">
          Used By Over 2000 <span className=" text-bgPrimary  ">Customers</span>
        </h3>
        <h4 className=" text-xl mb-2.5">
          Our growing number of customers speaks for how great our service is{" "}
        </h4>
        <div className="relative h-[26px] flex-1 mx-auto">
          <Image src={"/svgs/curvedLine.svg"} alt="curved line" fill />
        </div>
        <div className=" pt-10 flex flex-wrap justify-center items-center gap-5 md:gap-10 pb-20">
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-x-20">
          <div className="flex flex-col md:flex-row items-center gap-x-7">
            <h5 className=" text-4xl font-bold mb-2.5 max-w-[276px] text-left">
              Our service is Feature-Rich
            </h5>
            <p className=" text-xl mb-2.5 max-w-[500px] text-left">
              We offer a variety of interesting features that you can help
              increase yor productivity at work and manage your project easily
            </p>
          </div>
          <Button>GET STARTED</Button>
        </div>
        <div className=" space-y-10 pt-32">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex md:w-[90%] flex-col md:flex-row md:items-center md:h-[220px]  ${
                index % 2 ? " mr-auto" : " ml-auto"
              }`}
            >
              <div className="bg-[#F0F4F9] md:flex-[0.4] grid place-items-center h-full ">
                <service.icon size="200px" className=" text-bgPrimary" />
              </div>

              <div className=" flex flex-col gap-4 w-full text-left py-5 px-8 bg-white rounded md:flex-[1]">
                <h5 className=" text-3xl font-bold mb-2.5">
                  Our service is Feature-Rich
                </h5>
                <p className=" text-xl mb-2.5 text-left">
                  We offer a variety of interesting features that you can help
                  increase yor productivity at work and manage your project
                  easily
                </p>
                <Button className=" w-fit">GET STARTED</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
