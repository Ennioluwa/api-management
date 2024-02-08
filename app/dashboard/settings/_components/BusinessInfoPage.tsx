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
import PhoneInputWithCountrySelect from "react-phone-number-input";
import Loader from "@/components/Loader";
import { optionsCategory } from "@/data/data";

interface ProfilePageProps {
  setHeader: Dispatch<
    SetStateAction<{
      title: string;
      subtitle: string;
    }>
  >;
}

const ProfilePage: FC<ProfilePageProps> = ({ setHeader }) => {
  const { userData } = useAppSelector((state) => state.user);

  const roles = [
    { label: "Super Admin", id: "ClientAdmins" },
    {
      label: "Sales Representative",
      id: "ClientSalesReps",
    },
    {
      label: "Finance Officers",
      id: "ClientFinanceOfficers",
    },
  ];

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
    phone: z.string().min(1, {
      message: "Phone number is required",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      businessName: "",
      businessIndustry: "",
      businessCountry: "",
      businessAddress: "",
      phone: "",
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
      toast.success(
        "Sign up successful. Please enter otp sent to the email address"
      );
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("Sign up failed");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    // const { oldPassword, newPassword } = values;
    // register({ email, roles, firstName, lastName, phone });
  };

  useEffect(() => {
    setHeader({
      title: "Contact Setup",
      subtitle: "You can modify your business information here with ease",
    });
  }, []);

  return (
    <div className=" py-3 px-5 bg-white lg:max-w-[784px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6  mx-auto"
        >
          <div className="flex flex-col gap-5">
            <>
              <div className=" flex flex-col lg:flex-row gap-5">
                <div className=" flex-1">
                  <h5 className=" font-bold">Business Information</h5>
                  <h6 className=" text-xs">
                    This include information about your avatar and business name
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4]">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem className=" relative">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter Business Name"
                            type="text"
                            label="Business Name"
                          />
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
                  <h5 className=" font-bold">Business Details</h5>
                  <h6 className=" text-xs">
                    This include information about your business industry
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
                            <SelectTrigger
                              label="Business Industry"
                              value={field.value}
                            >
                              <SelectValue placeholder="Select Business Industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Industry</SelectLabel>
                                {optionsCategory.map((category, index) => (
                                  <SelectItem
                                    key={index}
                                    value={category.value}
                                  >
                                    {category.label}
                                  </SelectItem>
                                ))}
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
                  <h5 className=" font-bold">Location</h5>
                  <h6 className=" text-xs">
                    You can change your business’ location address
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4] flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="businessAddress"
                    render={({ field }) => (
                      <FormItem className=" relative">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter Business Address"
                            label="Business Address"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessCountry"
                    render={({ field }) => (
                      <FormItem className=" relative">
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={isPending}
                          >
                            <SelectTrigger label="Country" value={field.value}>
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Country</SelectLabel>
                                <SelectItem value="nigeria">Nigeria</SelectItem>
                                <SelectItem value="ghana">Ghana</SelectItem>
                                <SelectItem value="kenya">Kenya</SelectItem>
                                <SelectItem value="zambia">Zambia</SelectItem>
                                <SelectItem value="mauritius">
                                  Mauritius
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
                  <h5 className=" font-bold">Phone</h5>
                  <h6 className=" text-xs">
                    You can change your business’ contact number
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4]">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="relative w-full">
                        {field.value && (
                          <FormLabel className="font-normal absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                            Phone
                          </FormLabel>
                        )}
                        <FormControl>
                          <PhoneInputWithCountrySelect
                            {...field}
                            defaultCountry="NG"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                            disabled={isPending}
                            placeholder="Enter phone number"
                            className={` flex h-[50px] w-full rounded-md border border-bgPrimary bg-background py-2 px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border focus-visible:border-bgPrimary  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-within:border-bgPrimary ${
                              field.value
                                ? "border-bgPrimary bg-white "
                                : "border-border"
                            } `}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
      {isPending && <Loader />}
    </div>
  );
};

export default ProfilePage;
