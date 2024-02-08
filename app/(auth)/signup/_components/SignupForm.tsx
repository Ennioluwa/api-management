"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { SignupSchema } from "@/schemas";
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
import { useUserRegister } from "@/lib/hooks/useUserRegister";
import { Direct, Information, Lock, ShieldSecurity } from "iconsax-react";
import Modal from "@/components/Modal";
import { useOtpUserLogin } from "@/lib/hooks/useOtpUserLogin";
import { toast } from "sonner";
import { PasswordInput } from "@/components/password-input";
import { loginUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getOtp } from "@/lib/hooks/api/otp.api";
import PhoneInput from "react-phone-number-input";
import { PuffLoader } from "react-spinners";
import Loader from "@/components/Loader";

export const SignupForm = () => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const {
    data,
    mutate: register,
    isSuccess,
    isError,
    isPending,
  } = useUserRegister();

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
        toast.success("OTP verified successfully");
        dispatch(loginUser(otpData.data));

        if (otpData.data.setupStatus === "Completed") {
          router.push("/dashboard/home");
        } else {
          router.push("/kyc");
        }
      } else if (isOtpError) {
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
        "Sign up successful. Please enter otp sent to the email address"
      );
      setOpen(true);
    } else if (isError) {
      toast.error("Sign up failed");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    const { firstName, lastName, email, password } = values;
    register({ email, password, firstName, lastName });
  };

  const handleOtpSubmit = () => {
    otpLogin({ email: form.getValues().email, otp });
  };

  const handleResendOtp = async (email: string) => {
    try {
      const data = await getOtp({ email });
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
          className="space-y-6 lg:max-w-[440px] mx-auto"
        >
          <div className=" flex flex-col gap-4">
            <>
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-left">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="First Name"
                          type="text"
                          label="First Name"
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
                    <FormItem className="relative w-full">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Last Name"
                          type="text"
                          label="Last Name"
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
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Email Address"
                        type="email"
                        PrefixIcon={Direct}
                        variant="Bulk"
                        label="Email Address"
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
                  <FormItem className="relative w-full">
                    <FormControl>
                      <PasswordInput
                        {...field}
                        disabled={isPending}
                        PrefixIcon={Lock}
                        variant="TwoTone"
                        placeholder="Create a Password"
                        label="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <p className=" text-left flex items-center gap-2 text-xs">
            <Information variant="Bulk" size={18} />
            Have an Existing Account?{" "}
            <Link className=" text-bgPrimary font-bold underline" href="/login">
              Sign in Here
            </Link>
          </p>
          <Button
            disabled={
              isPending ||
              !form.getValues().email ||
              !form.getValues().password ||
              !form.getValues().firstName ||
              !form.getValues().lastName
            }
            type="submit"
            className="w-full"
          >
            {isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </Button>
        </form>
      </Form>
      <p className=" text-center mt-10 text-xs">
        (C) 2023. All Rights Reserved.
      </p>
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
        isPending={isOtpPending}
        isPendingText="Confirming"
        isOtp
        otp={otp}
        setOtp={setOtp}
        resendOtp={() => handleResendOtp(form.getValues().email)}
        open={open}
        email={form.getValues().email}
        setOpen={setOpen}
        cancelButton="Close"
        primaryButton="Confirm & Proceed"
        primaryButtonAction={handleOtpSubmit}
      />
    </>
  );
};
