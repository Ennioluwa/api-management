"use client";

import { FC } from "react";
import { SidebarData, sidebarData } from "./sidebarData";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect, usePathname, useRouter } from "next/navigation";
import { LogoutCurve } from "iconsax-react";
import { useAppDispatch } from "@/lib/hooks";
import { logoutUser } from "@/redux/features/userSlice";
import axiosClient from "@/lib/axiosInstance";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
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

  const handleLogout = async () => {
    dispatch(logoutUser());
    const logout = await axiosClient.get(`/api/user/logout`);
    router.push("/login");
  };

  return (
    <aside className="fixed hidden md:flex h-full">
      <div className="  overflow-y-auto h-[calc(100vh-80px)] w-[240px] z-50 ">
        <div className=" flex flex-col justify-between gap-20 h-full px-3 py-8">
          <div className="flex flex-col gap-1">
            <div className=" flex flex-col gap-1">
              {dashboard?.map((item, index) => (
                <Link key={index} href={item.link}>
                  <Button
                    variant="sidebar"
                    className={`${
                      pathname.includes(item.link) &&
                      "border-l-[3px] border-bgPrimary bg-white font-bold text-black"
                    } h-12`}
                  >
                    <item.icon
                      variant="Bulk"
                      color={
                        pathname.includes(item.link) ? "#0062FF" : "#292D32"
                      }
                      className={`${
                        pathname.includes(item.link) && " text-bgPrimary"
                      } w-5 h-5`}
                    />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className=" py-5 px-3 font-bold uppercase text-[#9A9AAF]">
                Management
              </h4>
              {management?.map((item, index) => (
                <Link key={index} href={item.link}>
                  <Button
                    variant="sidebar"
                    className={`${
                      pathname.includes(item.link) &&
                      "border-l-[3px] border-bgPrimary bg-white font-bold text-black"
                    }  h-12`}
                  >
                    <item.icon
                      variant="Bulk"
                      color={
                        pathname.includes(item.link) ? "#0062FF" : "#292D32"
                      }
                      className={` w-5 h-5`}
                    />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
            <div className=" flex flex-col gap-1">
              <h4 className=" py-5 px-3 font-bold uppercase text-[#9A9AAF]">
                Administration
              </h4>
              {administration?.map((item, index) => (
                <Link key={index} href={item.link}>
                  <Button
                    variant="sidebar"
                    className={`${
                      pathname.includes(item.link) &&
                      "border-l-[3px] border-bgPrimary bg-white font-bold text-black"
                    }  h-12`}
                  >
                    <item.icon
                      variant="Bulk"
                      color={
                        pathname.includes(item.link) ? "#0062FF" : "#292D32"
                      }
                      className={` w-5 h-5`}
                    />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <Button
            variant="sidebar"
            className="hover:border-l-[3px] hover:border-bgPrimary hover:bg-white hover:font-bold hover:text-black h-12"
            onClick={handleLogout}
          >
            <LogoutCurve
              variant="Bulk"
              color={"#292D32"}
              className={` w-5 h-5`}
            />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
