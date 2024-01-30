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
import { UserCirlceAdd } from "iconsax-react";
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
      label: "Finanace Officers",
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
      phone: userData?.lastName || "",
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
          className="space-y-6 lg:max-w-xl mx-auto"
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
                  <FormItem className=" relative">
                    {field.value && (
                      <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                        Email
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Email Address"
                        type="email"
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
                  <FormItem className="relative pb-8">
                    {field.value && (
                      <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                        Phone Number
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Phone Number"
                        type="text"
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
