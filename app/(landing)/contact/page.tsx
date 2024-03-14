import { FC } from "react";
import HomeNav from "../_components/HomeNav";
import Footer from "../_components/Footer";
import {
  CallCalling,
  MessageMinus,
  Location as LocationDot,
} from "iconsax-react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { ContactForm } from "./_components/ContactForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className=" bg-[#f1f1f1] text-dark text-center  min-h-[calc(100dvh_-_80px)]">
      <div className="flex flex-col justify-between min-h-[calc(100dvh_-_80px)]">
        <div className="lg:container p-5 lg:p-10 mb-auto">
          <HomeNav text="Contact us" />
          <h3 className=" text-4xl font-bold mb-2.5">Contact us</h3>
          <h4 className=" text-xl mb-2.5 pb-6">
            Any question or remarks? Just write us a message
          </h4>
          <div className=" p-5 flex flex-col md:flex-row gap-10 items-center bg-white rounded-[10px] mb-20">
            <div className=" w-full pb relative text-left bg-bgPrimary p-5 lg:p-10 h-[600px] flex flex-col justify-between items-start rounded-[8px] text-white lg:flex-[0.6] ">
              <div>
                <h6 className=" text-3xl font-bold">Contact Information</h6>
                <p className=" text-xl font-normal text-[#c9c9c9]">
                  Say something to start a live chat!
                </p>
              </div>
              <div className=" space-y-10">
                <div className=" flex gap-5 items-center">
                  <CallCalling />
                  <p>+1012 3456 789</p>
                </div>
                <div className=" flex gap-5 items-center">
                  <MessageMinus />
                  <p>demo@gmail.com</p>
                </div>
                <div className=" flex gap-5 items-center">
                  <LocationDot />
                  <p>
                    132 Dartmouth Street Boston, Massachusetts 02156 United
                    States
                  </p>
                </div>
              </div>
              <div className="flex gap-5 items-center z-10">
                <div className="grid place-items-center h-[30px] w-[30px] rounded-full bg-[#1b1b1b] cursor-pointer ring-[1px] ring-black hover:ring-white ">
                  <Twitter color="white" fill="white" size="16px" />
                </div>
                <div className="grid place-items-center h-[30px] w-[30px] rounded-full bg-[#1b1b1b] cursor-pointer  ring-[1px] ring-black hover:ring-white">
                  <Instagram color="white" size="16px" />
                </div>
                <div className="grid place-items-center h-[30px] w-[30px] rounded-full bg-[#1b1b1b] cursor-pointer ring-[1px] ring-black hover:ring-white ">
                  <Facebook color="white" fill="white" size="16px" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0">
                <svg
                  width="208"
                  height="209"
                  viewBox="0 0 208 209"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="162.5" cy="160.5" r="134.5" fill="#1A1A1A" />
                  <circle
                    cx="69"
                    cy="69"
                    r="69"
                    fill="#484848"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
            </div>
            <div className=" w-full lg:flex-1">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className=" mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
