"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { ContactSchema } from "@/schemas";
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
import { Textarea } from "@/components/ui/textarea";
// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
// import { login } from "@/actions/login";

export const ContactForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      title: "",
      body: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    setError("");
    setSuccess("");
    console.log(values);

    // startTransition(() => {
    //   send(values, callbackUrl)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data.error);
    //       }

    //       if (data?.success) {
    //         form.reset();
    //         setSuccess(data.success);
    //       }

    //       if (data?.twoFactor) {
    //         setShowTwoFactor(true);
    //       }
    //     })
    //     .catch(() => setError("Something went wrong"));
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 lg:max-w-[440px] mx-auto"
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Message Title"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      disabled={isPending}
                      placeholder="Message Body"
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
          Alternatively, you can check our FAQ and Support documentation pages
          in case you have a similar issue so that you wouldn’t have to wait in
          queue for our support team’s response.
        </p>
        <Button disabled={isPending} type="submit" className="w-full">
          SEND MESSAGE
        </Button>
      </form>
    </Form>
    // </CardWrapper>
  );
};
