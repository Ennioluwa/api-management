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
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
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
    oldPassword: z.string().min(1, {
      message: "Old password is required",
    }),
    newPassword: z.string().min(1, {
      message: "New password is required",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
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
      toast({
        title: "Sign up successful",
        description: "Please enter otp sent to the email address",
      });
    } else if (isError) {
      console.log(isError, data, "error state");
      toast({
        description: "Sign up failed",
      });
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    const { oldPassword, newPassword } = values;
    // register({ email, roles, firstName, lastName, phone });
  };

  useEffect(() => {
    setHeader({
      title: "Modify Password",
      subtitle: "Easily change your password here",
    });
  }, []);
  return (
    <div className=" py-8">
      <p className=" flex gap-2 items-center text-black text-xs pb-5">
        <Lock variant="Bulk" size={18} />
        Change Security Information
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 lg:max-w-xl mx-auto"
        >
          <div className="flex flex-col gap-5">
            <>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className=" relative">
                    {field.value && (
                      <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                        Old Password
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Old Password"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className=" relative">
                    {field.value && (
                      <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                        New Password
                      </FormLabel>
                    )}
                    <FormControl>
                      <Input
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                        {...field}
                        disabled={isPending}
                        placeholder="Enter New Password"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>

          <Button
            disabled={
              isPending ||
              !form.getValues().oldPassword ||
              !form.getValues().newPassword
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
