import { ChangeEvent, FC, useRef, useState } from "react";

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
import { MessageQuestion, Messages1, NotificationBing } from "iconsax-react";
import { Search } from "./SearchInput";
import { useAppSelector } from "@/lib/hooks";
import { accountQuestions } from "@/data/data";
import { handleRole } from "@/lib/utils";

interface FeaturesProps {}

const Features: FC<FeaturesProps> = ({}) => {
  const { userData } = useAppSelector((state) => state.user);

  let newRole = "Member";

  const [questions, setQuestions] = useState(accountQuestions);
  const [search, setSearch] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className=" flex items-center gap-5">
      <Sheet>
        <SheetTrigger>
          <Messages1 className=" hidden sm:block" variant="Bulk" size={30} />
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
              handleClose={() => {
                setSearch("");
                setQuestions(accountQuestions);
                searchRef?.current?.focus();
              }}
              ref={searchRef}
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
              <div className=" p-5 rounded-lg bg-[#F0F4F9] flex flex-col gap-3 mt-5 ">
                <p className=" text-xs">
                  Can`&apos;t find what you`&apos;re looking for? Chat with our
                  support agents instead.
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
        <SheetContent className=" w-full md:w-[440px] bg-transparent bg-white bg-opacity-80 overflow-y-auto">
          <div className="  py-5 rounded-lg flex flex-col gap-3 h-full">
            <div className=" flex items-center gap-5 text-left">
              <div className=" p-1 bg-white z-50 rounded-lg">
                <NotificationBing variant="Bulk" color="#0062FF" size={30} />
              </div>
              <SheetHeader className="text-left space-y-0">
                <SheetTitle className=" font-bold">Notifications</SheetTitle>
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
          <div className=" sm:pl-5 flex flex-col cursor-pointer">
            <p className=" font-semibold text-sm">{userData?.firstName}</p>
            <p className=" text-xs text-[#9A9AAF]">
              {userData?.roles[0] ? handleRole(userData?.roles[0]) : "Member"}
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
  );
};

export default Features;
