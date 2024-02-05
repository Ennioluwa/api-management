"use client";

import { useAppSelector } from "@/lib/hooks";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUserRegister } from "@/lib/hooks/useUserRegister";
import { Lock, UserCirlceAdd } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PreferencesPageProps {
  setHeader: Dispatch<
    SetStateAction<{
      title: string;
      subtitle: string;
    }>
  >;
}

const PreferencesPage: FC<PreferencesPageProps> = ({ setHeader }) => {
  const { userData } = useAppSelector((state) => state.user);

  const FormSchema = z.object({
    businessName: z.string().min(1, {
      message: "Business name is required",
    }),
    businessIndustry: z.string().min(1, {
      message: "Business Industry is required",
    }),
    businessCountry: z.string().min(1, {
      message: "Counry is required",
    }),
    businessAddress: z.string().min(1, {
      message: "Address is required",
    }),

    disputeEmail: z.string().email({
      message: "Dispute email is required",
    }),
    supportEmail: z.string().email({
      message: "Support email is required",
    }),
    defaultEmail: z.string().email({
      message: "Default email is required",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      businessName: "",
      businessIndustry: "",
      businessCountry: "",
      businessAddress: "",
      defaultEmail: "",
      disputeEmail: "",
      supportEmail: "",
    },
  });

  const {
    data,
    mutate: register,
    isSuccess,
    isError,
    isPending,
  } = useUserRegister();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast.success("User details modified successfully");
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("User details modification failed");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {};

  useEffect(() => {
    setHeader({
      title: "Preferences",
      subtitle:
        "Change appropriate settings relating to your account on the platform",
    });
  }, []);

  return (
    <div className=" py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10  mx-auto"
        >
          <div className="flex flex-col gap-5">
            <>
              <div className=" flex flex-col lg:flex-row gap-5">
                <div className=" flex-1">
                  <h5 className=" font-bold">Default Currency</h5>
                  <h6 className=" text-xs">
                    This email will be used in case there are disputes and
                    issues with transactions on your account
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4]">
                  <FormField
                    control={form.control}
                    name="businessIndustry"
                    render={({ field }) => (
                      <FormItem className=" relative">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger value={field.value} label="Currency">
                              <SelectValue placeholder="Select Default Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Currency</SelectLabel>
                                <SelectItem value="technology2">
                                  Naira
                                </SelectItem>
                                <SelectItem value="agriculture2">
                                  Dollars
                                </SelectItem>
                                <SelectItem value="construction2">
                                  Pounds
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <hr />
              <div className=" flex flex-col lg:flex-row gap-5">
                <div className=" flex-1">
                  <h5 className=" font-bold">Transaction Invoices</h5>
                  <h6 className=" text-xs">
                    Who receive transaction receipts automatically
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4] flex flex-col gap-10">
                  <div className=" flex gap-3">
                    <Checkbox />
                    <label className=" text-xs font-bold">Send to Me</label>
                  </div>
                  <div className=" flex gap-3">
                    <Checkbox />
                    <label className=" text-xs font-bold">
                      Send to All Users
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className=" flex flex-col lg:flex-row gap-5">
                <div className=" flex-1">
                  <h5 className=" font-bold">API Schedule</h5>
                  <h6 className=" text-xs">
                    Plan how often you want your total invoice to be made to the
                    government
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4] flex flex-col gap-10">
                  <div className=" flex gap-3">
                    <Checkbox />
                    <label className=" text-xs font-bold">
                      Immediately it reaches threshold
                    </label>
                  </div>
                  <div className=" flex gap-3">
                    <Checkbox />
                    <label className=" text-xs font-bold">
                      Send the next day
                    </label>
                  </div>
                </div>
              </div>
              <hr />
              <div className=" flex flex-col lg:flex-row gap-5">
                <div className=" flex-1">
                  <h5 className=" font-bold">Time zone</h5>
                  <h6 className=" text-xs">Set time zone</h6>
                </div>
                <div className=" shrink-0 flex-[1.4] flex flex-col gap-10">
                  <div className=" flex gap-3">
                    <Checkbox />
                    <label className=" text-xs font-bold">Local Time</label>
                  </div>
                  <div className=" flex gap-3">
                    <Checkbox />
                    <label className=" text-xs font-bold">WAT</label>
                  </div>
                </div>
              </div>
            </>
          </div>

          <Button
            disabled={
              isPending ||
              !form.getValues().businessName ||
              !form.getValues().businessIndustry
            }
            type="submit"
            className="w-full"
          >
            {isPending ? "SAVING..." : "SAVE"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PreferencesPage;
