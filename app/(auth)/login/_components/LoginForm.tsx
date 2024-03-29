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
import { Direct, Lock, ShieldSecurity } from "iconsax-react";
import { toast } from "sonner";
import { useOtpUserLogin } from "@/lib/hooks/useOtpUserLogin";
import { useAppDispatch } from "@/lib/hooks";
import { loginUser, logoutUser } from "@/redux/features/userSlice";
import { PasswordInput } from "@/components/password-input";
import { getOtp } from "@/lib/hooks/api/otp.api";
import Loader from "@/components/Loader";

export const LoginForm = () => {
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

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    data,
    mutate: login,
    isSuccess,
    isError,
    isPending,
    error,
  } = useUserLogin();
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
        toast.success("OTP verified successfully");
        dispatch(loginUser(otpData.data));
        // TODO
        if (
          otpData.data.setupStatus === "Completed" &&
          otpData.data.changePassword === false
        ) {
          router.push("/dashboard/home");
        } else if (
          otpData.data.setupStatus === "Completed" &&
          otpData.data.changePassword === true
        ) {
          router.push("/change-password");
        } else {
          router.push("/kyc");
        }
      } else if (isOtpError) {
        console.log(isOtpError, otpData, "error state");
        toast.error("Wrong OTP. Please try again");
      } else return;
    } catch (error) {
      console.log(error);
    }
  }, [isOtpSuccess, isOtpError]);

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast.success(
        "Log in successful. Please enter otp sent to the email address"
      );
      setOpen(true);
    } else if (isError) {
      console.log(isError, error.message, "error state");
      toast.error(
        "Authentication failed. Please check your username and password"
      );
    } else return;
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values;
    login({ email, password });
    setEmail(email);
  };

  const handleOtpSubmit = () => {
    otpLogin({ email, otp });
  };

  const handleResendOtp = async (username: string) => {
    try {
      const data = await getOtp({ username });
      console.log(data);

      toast.success("Otp successfully sent");
    } catch (error) {
      toast.error("An error has occured here");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4 w-full">
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormControl>
                      <Input
                        label="Email Address"
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Email Address"
                        type="email"
                        PrefixIcon={Direct}
                        variant="Bulk"
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
                  <FormItem className=" w-full">
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        PrefixIcon={Lock}
                        variant="TwoTone"
                        placeholder="Enter your Password"
                        label="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <p className=" text-xs text-black text-center ">
            Forgot your password?{" "}
            <Link className="text-bgPrimary font-bold" href="/forgot-password">
              Reset it here
            </Link>
          </p>
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
      {(isPending || isOtpPending) && <Loader />}

      <Modal
        title="ENTER OTP"
        content={
          <>
            <p>
              To verify your identity, we’ve sent an OTP to your Email Address{" "}
            </p>
            <p className=" text-bgPrimary font-bold pt-2">
              {form.getValues().email}
            </p>
          </>
        }
        icon={ShieldSecurity}
        isOtp
        otp={otp}
        setOtp={setOtp}
        resendOtp={() => handleResendOtp(form.getValues().email)}
        isPending={isOtpPending}
        isPendingText="Confirming"
        open={open}
        setOpen={setOpen}
        email={form.getValues().email}
        cancelButton="Close"
        primaryButton="Confirm & Proceed"
        primaryButtonAction={handleOtpSubmit}
      />
    </>
  );
};
