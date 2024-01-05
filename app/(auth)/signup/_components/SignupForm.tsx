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
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
// import { login } from "@/actions/login";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import OtpInput from "react-otp-input";
import { useUserLogin } from "@/lib/hooks/useUserLogin";
import { useUserRegister } from "@/lib/hooks/useUserRegister";
import { ShieldSecurity } from "iconsax-react";
import Modal from "@/components/Modal";
import { useOtpUserLogin } from "@/lib/hooks/useOtpUserLogin";
import { useToast } from "@/components/ui/use-toast";

export const SignupForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
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
        console.log(isOtpSuccess, otpData, "otp success state");
        toast({
          title: "OTP verified successfully",
        });
        router.push("/login");
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
        title: "Sign up successful",
        description: "Please enter otp sent to the email address",
      });
      setOpen(true);
    } else if (isError) {
      console.log(isError, data, "error state");
      toast({
        description: "Sign up failed",
      });
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    const { firstName, lastName, email, password, phone } = values;
    register({ email, password, firstName, lastName, phone });
  };

  const handleOtpSubmit = () => {
    otpLogin({ email: form.getValues().email, otp });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 lg:max-w-xl mx-auto"
        >
          <div className="space-y-4">
            <>
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-left">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className=" w-full">
                      <FormControl>
                        <Input
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
                    <FormItem className=" w-full">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Last Name"
                          type="text"
                          className=" lg:w-60"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
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
          <p className=" text-left">
            Have an Existing Account? <Link href="/login">Sign in Here</Link>
          </p>
          {/* TODO: add disabled state when all the fields have not been added */}
          <Button
            disabled={
              isPending ||
              !form.getValues().email ||
              !form.getValues().password ||
              !form.getValues().firstName ||
              !form.getValues().lastName ||
              !form.getValues().phone
            }
            type="submit"
            className="w-full"
          >
            {isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </Button>
        </form>
      </Form>
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
        open={open}
        setOpen={setOpen}
        cancelButton="Close"
        primaryButton="Confirm & Proceed"
        primaryButtonAction={handleOtpSubmit}
      />
    </>
  );
};
