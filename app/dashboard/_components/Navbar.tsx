"use client";

import Logo from "@/app/(landing)/_components/Logo";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import { MessageQuestion, Messages1, NotificationBing } from "iconsax-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Search } from "./SearchInput";
import IsAdminAuth from "@/components/isAdminAuth";
import { MobileSidebar } from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface NavbarProps {}

const accountQuestions = [
  {
    title: "What is an API and why should I care about your service?",
    answer:
      "An API (Application Programming Interface) allows different software systems to communicate with each other by calling features and services. Our API dashboard service makes it easy to manage, analyze, and optimize usage of APIs to improve reliability and efficiency. It provides insights into API performance, monitors errors, controls access and permissions, and can even generate client code.",
  },
  {
    title: "How do I generate new invoices via the API system?",
    answer:
      "You can programmatically generate new invoices by calling our RESTful Billing API. Simply make a POST request to the /v1/invoices endpoint with details like customer info, billing period, line items etc. Our API will automatically compile that into a professional-grade invoice PDF available for download.",
  },
  {
    title: "How many users can be added to a permission role?",
    answer:
      'There is no hard limit on the number of users that can be added to a role. Permission roles are intended to manage access for entire teams and groups of arbitrary size. For example you could have a "Developers" role with 50 developers, or an "Administrators" role with 10 admins. The system will scale to any reasonable number of role assignments needed.',
  },
  {
    title:
      "How many API requests can be made in a single period of initiation?",
    answer:
      "By default, we allow up to 100 API calls per second per user. If you intend to make requests at a much higher frequency, you can get in touch with our sales team to customize a higher tier plan allowing 500, 1000+ requests/sec or even unlimited use for heavy workloads.",
  },
  {
    title:
      "What is the importance of this application and how will it impact my business?",
    answer:
      "Efficient API management helps centralize control, reduce errors, comply with regulations, and optimize usage. Our platform provides data and tooling to reduce costs, maximize service uptime, and align technical capabilities with business goals. The insights it provides can directly inform strategic decisions.",
  },
  {
    title: "How many users can be created and added to an account?",
    answer:
      "Each account supports unlimited users without additional charges per user. The number of users you can invite and onboard for access is only limited by the capabilities of your overall account plan in terms of API requests, data retention, compute resources etc. Get in touch with us to understand scaling capabilities.",
  },
  {
    title: "How do I integrate payment gateway system to my current account?",
    answer:
      "Navigating to Integration Settings, you can configure connections for payment platforms like Stripe and PayPal with API keys. Our platform will handle routing invoice data, synchronizing status changes, and triggering notifications. Contact our support team if you need any assistance with the setup and onboarding.",
  },
];

const Navbar: FC<NavbarProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);

  let newRole = "Member";

  const [questions, setQuestions] = useState(accountQuestions);
  const [search, setSearch] = useState("");

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setSearch(value);

    if (value === "") {
      console.log(value, "empty");

      setQuestions(accountQuestions);
      return;
    }

    const filtered = accountQuestions.filter((q) =>
      q.title.toLowerCase().includes(value.toLowerCase())
    );

    setQuestions(filtered);
  }

  const handleRole = (role?: string) => {
    if (role === "ClientAdmins") {
      newRole = "Admin";
    } else if (role === "ClientSalesReps") {
      newRole = "Sales Rep.";
    } else if (role === "ClientFinanceOfficers") {
      newRole = "Finance Officer";
    } else {
      newRole = "Member";
    }

    return newRole;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-16  px-3 bg-white border-b z-40 shadow grid place-items-center">
      <div className="flex items-center justify-between w-full gap-5 md:gap-12">
        <div className=" flex items-center gap-3 shrink-0">
          <MobileSidebar />
          {/* <HambergerMenu size={30} className=" cursor-pointer" /> */}
          <Logo />
        </div>

        <div className=" grow hidden md:block">
          <Search value={search} onChange={handleSearch} className="" />
        </div>
        <div className=" flex items-center gap-5">
          <Sheet>
            <SheetTrigger>
              <Messages1 variant="Bulk" size={30} />
            </SheetTrigger>
            <SheetContent className=" w-[440px] bg-transparent bg-white bg-opacity-80 overflow-y-auto">
              <div className="  py-5 rounded-lg flex flex-col gap-3 h-full">
                <div className=" flex items-center gap-5 text-left">
                  <div className=" p-1 bg-white z-50 rounded-lg">
                    <MessageQuestion variant="Bulk" color="#0062FF" size={30} />
                  </div>
                  <SheetHeader className="text-left space-y-0">
                    <SheetTitle className=" font-bold">FAQ and Help</SheetTitle>
                    <SheetDescription className="text-xs">
                      You can also search for queries below or chat with our
                      representatives for better support
                    </SheetDescription>
                  </SheetHeader>
                </div>
                <Search
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search for Help"
                />
                <div className=" border border-dashed rounded-lg border-[#9A9AAF] p-5 overflow-y-auto bg-white min-h-40 h-full">
                  <Accordion type="single" collapsible>
                    {questions.map((question, index) => (
                      <AccordionItem key={index} value={`item ${index}`}>
                        <AccordionTrigger className=" text-left  font-normal">
                          {question.title}
                        </AccordionTrigger>
                        <AccordionContent className=" border mb-4 border-dashed border-[#0062FF]/45 rounded-lg text-xs p-3 bg-[#F0F4F9] ">
                          {question.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className=" p-5 rounded-lg bg-[#F0F4F9] flex flex-col gap-3 ">
                    <p className=" text-xs">
                      Can`&apos;t find what you`&apos;re looking for? Chat with
                      our support agents instead.
                    </p>
                    <Button>Contact Support</Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger>
              <NotificationBing variant="Bulk" size={30} />
            </SheetTrigger>
            <SheetContent className=" w-[440px] bg-transparent bg-white bg-opacity-80 overflow-y-auto">
              <div className="  py-5 rounded-lg flex flex-col gap-3 h-full">
                <div className=" flex items-center gap-5 text-left">
                  <div className=" p-1 bg-white z-50 rounded-lg">
                    <NotificationBing
                      variant="Bulk"
                      color="#0062FF"
                      size={30}
                    />
                  </div>
                  <SheetHeader className="text-left space-y-0">
                    <SheetTitle className=" font-bold">
                      Notifications
                    </SheetTitle>
                    <SheetDescription className="text-xs">
                      Manage all your notifications, alerts, and messages here
                    </SheetDescription>
                  </SheetHeader>
                </div>
                <div className=" flex items-center justify-between gap-5 text-xs font-bold">
                  <p>Notification Type</p>
                  <p>32 Unread</p>
                </div>
                <div className=" border border-dashed rounded-lg border-[#9A9AAF] p-5 overflow-y-auto bg-white min-h-40 h-full">
                  {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                    <div key={index} className="">
                      <div className="flex items-stretch gap-3 py-3">
                        <Checkbox className=" h-6 w-6 border-[#E4E4E4]" />
                        <div className=" space-y-1">
                          <h6 className=" font-bold">
                            New API has been created successfully
                          </h6>
                          <p className="flex gap-1 items-center text-[10px]">
                            <span>2/4/2023</span>
                            <span>11:16:59 AM</span>
                          </p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Popover>
            <PopoverTrigger asChild>
              <div className=" flex flex-col cursor-pointer">
                <p>{userData?.firstName}</p>
                <p>
                  {userData?.roles[0]
                    ? handleRole(userData?.roles[0])
                    : "Member"}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-full p-3 flex flex-col gap-2 bg-white"
            >
              <Link href="/dashboard/settings" className=" w-full">
                <Button
                  variant="ghost"
                  className=" w-full border-none outline-none ring-0 focus:outline-none focus:ring-0"
                >
                  Edit Account
                </Button>
              </Link>
              <hr className=" border-dashed border-[#9A9AAF] " />
              <Link href="/login" className=" w-full">
                <Button
                  variant="ghost"
                  className=" w-full border-none outline-none ring-0 focus:outline-none focus:ring-0"
                >
                  Log Out
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default IsAdminAuth(Navbar);
