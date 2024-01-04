"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
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

export const SignupForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
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

  const { data, mutate: register, isSuccess, isError } = useUserRegister();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");

      // toast.success("Login Successful!");
      // localStorage.setItem("access-token", data.auth_token);
      // localStorage.setItem("refresh-token", data.refresh_token);
    } else if (isError) {
      console.log(isError, data, "error state");

      // toast.error("Login failed!");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    const { firstName, lastName, email, password, phone } = values;
    register({ email, password, firstName, lastName, phone });

    // setOpen(true);
  };
  const handleOtpSubmit = () => {
    console.log(otp);
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
          <Button disabled={isPending} type="submit" className="w-full">
            CREATE ACCOUNT
          </Button>
        </form>
      </Form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className=" bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>ENTER OTP</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                To verify your identity, we’ve sent an OTP to your Email Address
              </span>
              <span>Nusaiba.sabiu@gmail.com</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            // placeholder=''
            // renderSeparator={<span>&nbsp;&nbsp;</span>}
            renderInput={(props) => (
              <input {...props} className="bg-[#F0F4F9]" />
            )}
            inputStyle={{
              border: "1px solid transparent",
              borderRadius: "8px",
              width: "3.2rem",
              height: "4rem",
              fontSize: "16px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
            }}
            shouldAutoFocus
            inputType="password"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleOtpSubmit}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p onClick={() => setOpen(true)}>Popw</p>
    </>
  );
};
