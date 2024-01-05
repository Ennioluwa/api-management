"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUserLogin } from "@/lib/hooks/useUserLogin";
import Modal from "@/components/Modal";
import { ShieldSecurity } from "iconsax-react";
import { useToast } from "@/components/ui/use-toast";
import { useOtpUserLogin } from "@/lib/hooks/useOtpUserLogin";

export const KycForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
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

  const { data, mutate: login, isSuccess, isError } = useUserLogin();

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
    // login({ email, password });
    setEmail(email);
  };
  const handleModalClose = () => {
    setOpen(false);
    redirect("/kyc/business-identity");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What kind of business do you run?</FormLabel>
                    <FormControl>
                      <Select {...field} disabled={isPending}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Business Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Business Type</SelectLabel>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="agriculture">
                              Agriculture
                            </SelectItem>
                            <SelectItem value="construction">
                              Construction
                            </SelectItem>
                            <SelectItem value="aviation">Aviation</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What kind of business do you run?</FormLabel>
                    <FormDescription>
                      This must be the actual name on your official document.
                      This info cannot be changed
                    </FormDescription>
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
              <hr />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Industry</FormLabel>
                    <FormDescription>
                      Choose the industry closest to the ne in which yur
                      business operates
                    </FormDescription>
                    <FormControl>
                      <Select {...field} disabled={isPending}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Business Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Industry</SelectLabel>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="agriculture">
                              Agriculture
                            </SelectItem>
                            <SelectItem value="construction">
                              Construction
                            </SelectItem>
                            <SelectItem value="aviation">Aviation</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verify your business locaition</FormLabel>
                    <FormDescription>
                      You will need to upload a copy of you utility bill
                      associated to this address in the documentation part of
                      the onboarding.
                    </FormDescription>
                    <FormControl>
                      <Select {...field} disabled={isPending}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Country</SelectLabel>
                            <SelectItem value="nigeria">Nigeria</SelectItem>
                            <SelectItem value="ghana">Ghana</SelectItem>
                            <SelectItem value="kenya">Kenya</SelectItem>
                            <SelectItem value="zambia">Zambia</SelectItem>
                            <SelectItem value="mauritius">Mauritius</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr />
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
          <Button disabled={isPending} type="submit" className="w-full">
            LOGIN
          </Button>
        </form>
      </Form>

      <Modal
        title="INFO ADDED"
        content={
          <p>
            Company information has been saved and will be used when necessary
            on the platform to reach the business when needed
          </p>
        }
        icon={ShieldSecurity}
        open={open}
        setOpen={setOpen}
        primaryButton="Proceed"
        primaryButtonAction={handleModalClose}
      />
    </>
  );
};
