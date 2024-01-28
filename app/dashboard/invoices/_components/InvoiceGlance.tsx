import { Button } from "@/components/ui/button";
import { FC } from "react";

interface UserRolesProps {}

const UserRoles: FC<UserRolesProps> = ({}) => {
  return (
    <div className=" rounded-lg bg-white p-5 mt-5">
      <h3 className=" font-bold pb-2.5 ">AT A GLANCE</h3>
      <p className=" w-full md:w-2/3 lg:w-1/2 text-xs pb-6">
        An intuitive way to see all your general invoices for a quick access
      </p>
      <div className="flex flex-col md:flex-row flex-wrap md:items-stretch gap-4">
        <div className=" p-5  border border-dashed border-[#9A9AAF] rounded-lg md:flex-[2] flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="space-y-1.5">
            <h6 className=" text-xs font-bold">TOTAL INCOME</h6>
            <h4 className=" text-3xl font-bold">₦8,332,134.99</h4>
            <p className=" text-xs font-bold uppercase text-[#1CA78B] px-2.5 py-1 rounded-r-full rounded-l-full bg-[#1CA78B]/10">
              + 4% compared to last week
            </p>
          </div>
          <div className=" space-y-3">
            <div className=" px-3 py-1.5 rounded-lg space-y-1 bg-[#9A9AAF]/20">
              <p className=" flex items-center gap-1 text-xs font-bold text-[#9a9aaf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                >
                  <ellipse
                    cx="5.99989"
                    cy="5"
                    rx="5.55556"
                    ry="5"
                    fill="#9A9AAF"
                  />
                </svg>
                <span>LAST WEEK</span>
              </p>
              <p className=" text-xs font-bold">₦1,771,020.00</p>
            </div>
            <div className=" px-3 py-1.5 rounded-lg space-y-1 bg-[#9A9AAF]/20">
              <p className=" flex items-center gap-1 text-xs font-bold text-[#0062FF] uppercase">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                >
                  <ellipse
                    cx="5.99989"
                    cy="5"
                    rx="5.55556"
                    ry="5"
                    fill="#0062FF"
                  />
                </svg>
                <span>2 Months ago</span>
              </p>
              <p className=" text-xs font-bold">₦2,023,999.43</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row  md:items-stretch gap-4">
          <div className="p-5 border border-dashed border-[#9A9AAF] rounded-lg flex-1 space-y-1.5">
            <h6 className=" text-xs font-bold">PENDING</h6>
            <h4 className=" text-3xl font-bold flex gap-2.5 items-baseline">
              ₦32,134 <span className=" text-[#FFCF5C] text-base ">↑0.7%</span>
            </h4>
            <p className=" text-xs font-bold uppercase text-[#FFCF5C] px-2.5 py-1 rounded-r-full rounded-l-full bg-[#FFCF5C]/10">
              + 4% compared to last week
            </p>
          </div>
          <div className="p-5 border border-dashed border-[#9A9AAF] rounded-lg flex-1 space-y-1.5">
            <h6 className=" text-xs font-bold">FAILED</h6>
            <h4 className=" text-3xl font-bold flex gap-2.5 items-baseline">
              ₦32,134 <span className=" text-[#A71C1C] text-base ">↑0.7%</span>
            </h4>
            <p className=" w-fit text-xs font-bold uppercase text-[#A71C1C] px-2.5 py-1 rounded-r-full rounded-l-full bg-[#A71C1C]/10">
              + 16% compared to last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
