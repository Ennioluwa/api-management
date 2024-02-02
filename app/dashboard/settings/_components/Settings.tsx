"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePage from "./ProfilePage";
import PasswordPage from "./PasswordPage";
import BusinessInfoPage from "./BusinessInfoPage";
import PreferencesPage from "./PreferencesPage";
import { useState } from "react";

const Settings = () => {
  const [header, setHeader] = useState({
    title: "Profile Settings",
    subtitle:
      "Modify your profile information and make adjustments to the editable ones below",
  });
  return (
    <div className=" py-5 rounded-lg bg-white h-full ">
      <div className=" px-5 max-w-[440px]">
        <h3 className=" font-bold pb-2.5 ">{header.title}</h3>
        <p className=" w-full text-xs pb-6">{header.subtitle}</p>
      </div>
      <div className=" max-w-[440px] w-full h-full">
        <Tabs defaultValue="profile" className=" w-full">
          <TabsList className=" my-2 p-0 w-full overflow-x-auto overflow-y-clip h-20 justify-start">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="business-info">Business Info</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent className=" px-5" value="profile">
            <ProfilePage setHeader={setHeader} />
          </TabsContent>
          <TabsContent className=" px-5" value="password">
            <PasswordPage setHeader={setHeader} />
          </TabsContent>
          <TabsContent className=" px-5" value="business-info">
            <BusinessInfoPage setHeader={setHeader} />
          </TabsContent>
          <TabsContent className=" px-5" value="preferences">
            <PreferencesPage setHeader={setHeader} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
