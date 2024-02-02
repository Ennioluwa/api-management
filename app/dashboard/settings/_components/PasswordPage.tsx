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
import { Lock, UserCirlceAdd } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useChangePassword } from "@/lib/hooks/UseForgotPassword";
import { ChangePasswordSchema } from "@/schemas";
import { PasswordInput } from "@/components/password-input";

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

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    data,
    mutate: changePassword,
    isSuccess,
    isError,
    isPending,
  } = useChangePassword();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast.success("Password successfully changed");
      form.reset();
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("An error occured");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    if (!userData) return;
    console.log(values);
    const { oldPassword, newPassword } = values;
    changePassword({ email: userData?.email, oldPassword, newPassword });
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
          className="space-y-6 lg:max-w-[440px] mx-auto"
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
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        PrefixIcon={Lock}
                        variant="TwoTone"
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                        placeholder="Enter Old Password"
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
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        PrefixIcon={Lock}
                        variant="TwoTone"
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                        placeholder="Enter New Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className=" relative">
                    {field.value && (
                      <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                        Confirm Password
                      </FormLabel>
                    )}
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        PrefixIcon={Lock}
                        variant="TwoTone"
                        className={`${
                          field.value && "border-bgPrimary bg-white "
                        }`}
                        placeholder="Confirm New Password"
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
              !form.getValues().newPassword ||
              !form.getValues().confirmPassword ||
              form.getValues().newPassword != form.getValues().confirmPassword
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
