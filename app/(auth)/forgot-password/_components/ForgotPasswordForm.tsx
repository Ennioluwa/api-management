"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { ForgotPasswordSchema } from "@/schemas";
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
import Modal from "@/components/Modal";
import { ShieldSecurity } from "iconsax-react";
import { toast } from "sonner";
import { useOtpUserLogin } from "@/lib/hooks/useOtpUserLogin";
import { useAppDispatch } from "@/lib/hooks";
import { loginUser, logoutUser } from "@/redux/features/userSlice";
import { useForgotPassword } from "@/lib/hooks/UseForgotPassword";
import Loader from "@/components/Loader";

export const ForgotPasswordForm = () => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    data,
    mutate: forgotPassword,
    isSuccess,
    isError,
    isPending,
  } = useForgotPassword();
  const {
    data: otpData,
    mutate: otpLogin,
    isSuccess: isOtpSuccess,
    isError: isOtpError,
    isPending: isOtpPending,
  } = useOtpUserLogin();

  useEffect(() => {
    try {
      if (isOtpSuccess) {
        console.log(isOtpSuccess, otpData, "otp success state");
        toast.success("OTP verified successfully");
        router.push("/password-reset");
      } else if (isOtpError) {
        console.log(isOtpError, otpData, "error state");
        toast.error("Wrong OTP. Please try again");
        router.push("/password-reset");
      } else return;
    } catch (error) {
      console.log(error);
    }
  }, [isOtpSuccess, isOtpError]);

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast.success("Please enter otp sent to the email address");
      setOpen(true);
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("Please check if email address exists");
      setOpen(true);
    } else return;
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(values);
    const { email } = values;
    forgotPassword({ email });
    setEmail(email);
  };

  const handleOtpSubmit = () => {
    otpLogin({ email, otp });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        label="Email Address"
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
            </>
          </div>

          <Button
            disabled={isPending || !form.getValues().email}
            type="submit"
            className="w-full"
          >
            {isPending ? "PROCEEDING" : "PROCEED"}
          </Button>
        </form>
      </Form>

      {(isPending || isOtpPending) && <Loader />}

      <Modal
        title="ENTER OTP"
        content={
          <p>
            To verify your identity, we’ve sent an OTP to your Email Address{" "}
            {email}
          </p>
        }
        icon={ShieldSecurity}
        isOtp
        otp={otp}
        setOtp={setOtp}
        isPending={isOtpPending}
        isPendingText="Confirming"
        open={open}
        setOpen={setOpen}
        cancelButton="Close"
        primaryButton="Confirm & Proceed"
        primaryButtonAction={handleOtpSubmit}
      />
    </>
  );
};
