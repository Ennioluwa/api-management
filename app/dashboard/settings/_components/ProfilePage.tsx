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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUserRegister } from "@/lib/hooks/useUserRegister";
import { Direct, UserCirlceAdd } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInputWithCountrySelect from "react-phone-number-input";

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
    email: z.string().email({
      message: "Email is required",
    }),
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    phone: z.string().min(1, {
      message: "Phone number is required",
    }),
    roles: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      roles: userData?.roles || [],
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
      toast.success("User details saved");
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("Error while saving user details");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {};

  useEffect(() => {
    setHeader({
      title: "Profile Settings",
      subtitle:
        "Modify your profile information and make adjustments to the editable ones below",
    });
  }, []);
  return (
    <div className=" py-8">
      <p className=" flex gap-2 items-center text-black text-xs pb-5">
        <UserCirlceAdd variant="Bulk" size={18} />
        Profile Settings
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 lg:max-w-[440px] mx-auto"
        >
          <div className="flex flex-col gap-5">
            <>
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-left">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className=" w-full relative">
                      {field.value && (
                        <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                          First Name
                        </FormLabel>
                      )}
                      <FormControl>
                        <Input
                          className={`${
                            field.value && "border-bgPrimary bg-white "
                          }`}
                          {...field}
                          disabled={isPending}
                          placeholder="First Name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className=" w-full relative">
                      {field.value && (
                        <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                          Last Name
                        </FormLabel>
                      )}
                      <FormControl>
                        <Input
                          className={`${
                            field.value && "border-bgPrimary bg-white "
                          }`}
                          {...field}
                          disabled={isPending}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    {field.value && (
                      <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                        Email
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Email Address"
                        type="email"
                        PrefixIcon={Direct}
                        variant="Bulk"
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    {field.value && (
                      <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
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
              <hr className=" border-dashed border-[#9A9AAF)]" />
              <p className=" font-bold pb-5">Role at the business</p>
              <FormField
                control={form.control}
                name="roles"
                render={() => (
                  <FormItem>
                    <div className="mb-4 flex items-center justify-between gap-5">
                      {/* <FormLabel className="text-base">Sidebar</FormLabel> */}
                      {roles.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="roles"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row flex-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-sm">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>

          <Button
            disabled={
              isPending ||
              !form.getValues().email ||
              !form.getValues().firstName ||
              !form.getValues().lastName ||
              !form.getValues().phone
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
