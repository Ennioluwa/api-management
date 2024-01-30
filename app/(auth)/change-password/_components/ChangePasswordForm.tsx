"use client";

import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { ChangePasswordSchema, LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useUserLogin } from "@/lib/hooks/useUserLogin";
import Modal from "@/components/Modal";
import { Direct, Lock, ShieldSecurity } from "iconsax-react";
import { useOtpUserLogin } from "@/lib/hooks/useOtpUserLogin";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser, logoutUser } from "@/redux/features/userSlice";
import { PasswordInput } from "@/components/password-input";
import { useChangePassword } from "@/lib/hooks/UseForgotPassword";

export const ChangePasswordForm = () => {
  const [open, setOpen] = useState(false);
  const { userData } = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    // if (!userData) return router.push("/login");
    console.log(values);
    const { oldPassword, newPassword } = values;
    changePassword({ email: "userData?.email", oldPassword, newPassword });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
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
            {isPending ? "PROCEEDING..." : "PROCEED"}
          </Button>
        </form>
      </Form>
    </>
  );
};
