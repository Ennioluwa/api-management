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
    <div className=" py-4">
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
                    This include information about your business type and your
                    business industry
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
                                <SelectItem value="technology2">
                                  Technology
                                </SelectItem>
                                <SelectItem value="agriculture2">
                                  Agriculture
                                </SelectItem>
                                <SelectItem value="construction2">
                                  Construction
                                </SelectItem>
                                <SelectItem value="aviation2">
                                  Aviation
                                </SelectItem>
                                <SelectItem value="fashion2">
                                  Fashion
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
                  <h5 className=" font-bold">Dispute Email</h5>
                  <h6 className=" text-xs">
                    This email will be used in case there are disputes and
                    issues with transactions on your account
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4]">
                  <FormField
                    control={form.control}
                    name="disputeEmail"
                    render={({ field }) => (
                      <FormItem className=" relative">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter Dispute Email"
                            type="email"
                            label="Dispute Email"
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
                  <h5 className=" font-bold">Support Email</h5>
                  <h6 className=" text-xs">
                    Email whenever there is a need for your team to help your
                    customers resolve an issue
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4]">
                  <FormField
                    control={form.control}
                    name="supportEmail"
                    render={({ field }) => (
                      <FormItem className=" relative">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter Support Email"
                            type="email"
                            label="Support Email"
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
                  <h5 className=" font-bold">Default Email</h5>
                  <h6 className=" text-xs">
                    This is your official email address and will be used as the
                    default email if the above email addresses are not set.
                  </h6>
                </div>
                <div className=" shrink-0 flex-[1.4]">
                  <FormField
                    control={form.control}
                    name="defaultEmail"
                    render={({ field }) => (
                      <FormItem className=" relative">
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Enter Default Email"
                            type="email"
                            label="Default Email"
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
    </div>
  );
};

export default ProfilePage;
