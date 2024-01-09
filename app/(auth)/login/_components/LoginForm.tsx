"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
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
import { ShieldSecurity } from "iconsax-react";
import { useToast } from "@/components/ui/use-toast";
import { useOtpUserLogin } from "@/lib/hooks/useOtpUserLogin";
import { useAppDispatch } from "@/lib/hooks";
import { loginUser } from "@/redux/features/userSlice";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, mutate: login, isSuccess, isError, isPending } = useUserLogin();
  const {
    data: otpData,
    mutate: otpLogin,
    isSuccess: isOtpSuccess,
    isError: isOtpError,
    isPending: isOtpPending,
  } = useOtpUserLogin();

  useEffect(() => {
    try {
      if (isOtpSuccess && otpData) {
        console.log(isOtpSuccess, otpData, "otp success state");
        toast({
          title: "OTP verified successfully",
        });
        console.log(otpData, "otp", otpData.data.tokenSet);

        dispatch(loginUser(otpData.data));

        if (otpData.data.setupStatus === "Completed") {
          router.push("/dashboard/home");
        } else {
          router.push("/otpSuccess");
        }
      } else if (isOtpError) {
        console.log(isOtpError, otpData, "error state");
        toast({
          description: "Wrong OTP. Please try again",
        });
      } else return;
    } catch (error) {
      console.log(error);
    }
  }, [isOtpSuccess, isOtpError]);

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast({
        title: "Log in successful",
        description: "Please enter otp sent to the email address",
      });
      setOpen(true);
    } else if (isError) {
      console.log(isError, data, "error state");
      toast({
        description: "Log in failed",
      });
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    const { email, password } = values;
    login({ email, password });
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Create a Password"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          {/* <FormError message={error || urlError} />
          <FormSuccess message={success} /> */}
          <p className=" text-xs text-black text-center ">
            Forgot your password?{" "}
            <Link className="text-bgPrimary font-bold" href="/reset-password">
              Reset it here
            </Link>
          </p>
          {/* TODO: add disabled state when all the fields have not been added */}
          <Button
            disabled={
              isPending || !form.getValues().email || !form.getValues().password
            }
            type="submit"
            className="w-full"
          >
            {isPending ? "LOGGING IN" : "LOGIN"}
          </Button>
        </form>
      </Form>

      <Modal
        title="ENTER OTP"
        content={
          <p>
            To verify your identity, we’ve sent an OTP to your Email Address{" "}
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
