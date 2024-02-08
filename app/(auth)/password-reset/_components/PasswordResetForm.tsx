"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordResetSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { LockCircle, ShieldSecurity } from "iconsax-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/hooks";
import { logoutUser } from "@/redux/features/userSlice";
import { useResetPassword } from "@/lib/hooks/useResetPassword";
import Loader from "@/components/Loader";

export const PasswordResetForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    data,
    mutate: passwordReset,
    isSuccess,
    isError,
    isPending,
  } = useResetPassword();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast.success(
        "Reset password successful. Please proceed to the login page"
      );
      setOpen(true);
      router.push("/login");
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("Password reset failed");
      router.push("/login");
    } else return;
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    const { password, confirmPassword } = values;
    passwordReset({ confirmPassword, password });
  };

  const onProceed = () => {
    router.push("/login");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Password"
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Password"
                        type="text"
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
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Confirm Password"
                        {...field}
                        disabled={isPending}
                        placeholder="Confirm your Password"
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
              !form.getValues().password ||
              !form.getValues().confirmPassword
            }
            type="submit"
            className="w-full"
          >
            {isPending ? "PROCEEDING" : "PROCEED"}
          </Button>
        </form>
      </Form>
      {isPending && <Loader />}

      <Modal
        title="NEW PASSWORD CREATED"
        content={
          <p>
            A new password has now been setup for your account. Click below to
            login to your account.
          </p>
        }
        icon={LockCircle}
        isPendingText="PROCEEDING"
        open={open}
        setOpen={setOpen}
        primaryButton="PROCEED"
        primaryButtonAction={onProceed}
      />
    </>
  );
};
