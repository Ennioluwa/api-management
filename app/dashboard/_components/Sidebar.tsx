"use client";

import { FC } from "react";
import { SidebarData, sidebarData } from "./sidebarData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, usePathname, useRouter } from "next/navigation";
import { LogoutCurve } from "iconsax-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logoutUser } from "@/redux/features/userSlice";
import axiosClient from "@/lib/axiosInstance";

interface SidebarProps {
  mobile?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ mobile }) => {
  const { isDashboardOpen } = useAppSelector((state) => state.navigation);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const dashboard = sidebarData.filter(
    (data: SidebarData) => data.group === "Dashboard"
  );
  const management = sidebarData.filter(
    (data: SidebarData) => data.group === "Management"
  );
  const administration = sidebarData.filter(
    (data: SidebarData) => data.group === "Administration"
  );

  const { userData } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    dispatch(logoutUser());
    const logout = await axiosClient.get(`/api/user/logout`);
    router.push("/login");
  };

  return (
    <aside
      className={`absolute left-0 top-0 h-full w-[240px] md:flex ${
        mobile ? "flex mt-auto" : "hidden"
      } `}
    >
      <div
        className={`"  overflow-y-auto h-[calc(100vh-80px)] w-[240px] ${
          mobile && "h-full pt-5"
        } `}
      >
        <div className=" flex flex-col justify-between gap-10 h-full pl-3 pt-8 shrink-0">
          <div className="flex flex-col gap-1 ">
            <div className=" flex flex-col gap-1">
              {dashboard?.map((item, index) => (
                <Button
                  onClick={() => router.push(item.link)}
                  variant="sidebar"
                  key={index}
                  className={`${
                    pathname.includes(item.link) &&
                    "border-l-[3px] border-bgPrimary bg-white font-bold text-black"
                  } h-12 hover:border-l-[3px] hover:border-bgPrimary hover:bg-white hover:font-bold hover:text-black`}
                  disabled={
                    item.name !== "Dashboard" &&
                    userData?.companyStatus === "Pending"
                  }
                >
                  <item.icon
                    variant="Bulk"
                    color={pathname.includes(item.link) ? "#0062FF" : "#292D32"}
                    className={`${
                      pathname.includes(item.link) && " text-bgPrimary"
                    } w-5 h-5`}
                  />
                  {item.name}
                </Button>
              ))}
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className=" py-5 px-3 font-bold uppercase text-[#9A9AAF]">
                Management
              </h4>
              {management?.map((item, index) => (
                <Button
                  variant="sidebar"
                  key={index}
                  onClick={() => router.push(item.link)}
                  disabled={userData?.companyStatus === "Pending"}
                  className={`${
                    pathname.includes(item.link) &&
                    "border-l-[3px] border-bgPrimary bg-white font-bold text-black"
                  }  h-12 hover:border-l-[3px] hover:border-bgPrimary hover:bg-white hover:font-bold hover:text-black`}
                >
                  <item.icon
                    variant="Bulk"
                    color={pathname.includes(item.link) ? "#0062FF" : "#292D32"}
                    className={` w-5 h-5`}
                  />
                  {item.name}
                </Button>
              ))}
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className=" py-5 px-3 font-bold uppercase text-[#9A9AAF]">
                Administration
              </h4>
              {administration?.map((item, index) => (
                <Button
                  key={index}
                  variant="sidebar"
                  onClick={() => router.push(item.link)}
                  disabled={
                    item.name !== "Subscription" &&
                    userData?.companyStatus === "Pending"
                  }
                  className={`${
                    pathname.includes(item.link) &&
                    "border-l-[3px] border-bgPrimary bg-white font-bold text-black"
                  }  h-12 hover:border-l-[3px] hover:border-bgPrimary hover:bg-white hover:font-bold hover:text-black`}
                >
                  <item.icon
                    variant="Bulk"
                    color={pathname.includes(item.link) ? "#0062FF" : "#292D32"}
                    className={` w-5 h-5`}
                  />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
          <div className=" pb-8">
            <Button
              variant="sidebar"
              className="hover:border-l-[3px] shrink-0 hover:border-bgPrimary hover:bg-white hover:font-bold hover:text-black h-12"
              onClick={handleLogout}
            >
              <LogoutCurve
                variant="Bulk"
                color={"#292D32"}
                className={`w-5 h-5`}
              />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
