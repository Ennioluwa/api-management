"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { BusinessIdentitySchema } from "@/schemas";
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

  const form = useForm<z.infer<typeof BusinessIdentitySchema>>({
    resolver: zodResolver(BusinessIdentitySchema),
    defaultValues: {
      businessTpid: "",
      branchId: "",
      businessSerialNumber: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const { data, mutate: identityKyc, isSuccess, isError } = useUserLogin();
  console.log(form.getValues().businessSerialNumber, "serial number");

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

  const onSubmit = (values: z.infer<typeof BusinessIdentitySchema>) => {
    setError("");
    setSuccess("");
    console.log(values);
    const { businessTpid, branchId, businessSerialNumber } = values;
    form.reset();
    setOpen(true);
    // identityKyc({ email, password });
  };
  const handleModalClose = () => {
    setOpen(false);
    router.push("/dashboard/home");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <>
              <FormField
                control={form.control}
                name="businessTpid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Business TPID</FormLabel>
                    <FormDescription>
                      Enter your business TPID which can be found on your
                      business registration form
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter TPID"
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
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch ID</FormLabel>
                    <FormDescription>
                      Your branch ID is located in the certificate offered by
                      the CAC
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Branch ID"
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
                name="businessSerialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Serial Number</FormLabel>
                    <FormDescription>
                      Your CAC Serial Number is important for verifying the
                      owner of the business as legally recognized by the
                      government
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter Business Serial Number"
                        type="text"
                      />
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

          {/* TODO: add disabled state when all the fields have not been added */}
          <Button disabled={isPending} type="submit" className="w-full">
            CONTINUE
          </Button>
        </form>
      </Form>

      <Modal
        title="BUSINESS ONBOARDED"
        content={
          <p>
            Your business has been successfully added. Our team will commence
            the verification process and reach out to you within 3 Business Days
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
