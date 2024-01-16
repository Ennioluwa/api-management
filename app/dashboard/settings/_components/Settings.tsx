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
    <div className=" py-5 rounded-lg bg-white ">
      <div className=" px-5 max-w-xl">
        <h3 className=" font-bold pb-2.5 ">{header.title}</h3>
        <p className=" w-full text-xs pb-6">{header.subtitle}</p>
      </div>
      <div className=" max-w-xl">
        <Tabs defaultValue="profile" className="">
          <TabsList className=" my-2 p-0">
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
