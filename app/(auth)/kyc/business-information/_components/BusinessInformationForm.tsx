"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

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
import Modal from "@/components/Modal";
import { ShieldSecurity } from "iconsax-react";
import { useToast } from "@/components/ui/use-toast";
import { useBusinessInformation } from "@/lib/hooks/useBusinessInformation";
import { BusinessInformationSchema } from "@/schemas";

const BusinessInformationForm = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof BusinessInformationSchema>>({
    resolver: zodResolver(BusinessInformationSchema),
    defaultValues: {
      businessAddress: "",
      businessName: "",
      businessIndustry: "",
      businessLocation: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const {
    data,
    mutate: informationKyc,
    isSuccess,
    isError,
    isPending,
  } = useBusinessInformation();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      setOpen(true);
    } else if (isError) {
      console.log(isError, data, "error state");
      toast({
        description: "An error has occured",
      });
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof BusinessInformationSchema>) => {
    console.log(values);
    const {
      businessAddress,
      businessName,
      businessIndustry,
      businessLocation,
    } = values;
    informationKyc({
      name: businessName,
      email: businessIndustry,
      address: businessAddress,
      country: businessLocation,
    });
  };

  const handleModalClose = () => {
    setOpen(false);
    router.push("/kyc/business-identity");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <>
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your official business name?</FormLabel>
                    <FormDescription>
                      This must be the actual name on your official document.
                      This info cannot be changed
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Your Business Name"
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
                name="businessIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Industry</FormLabel>
                    <FormDescription>
                      Choose the industry closest to the one in which your
                      business operates
                    </FormDescription>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Business Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Industry</SelectLabel>
                            <SelectItem value="technology2">
                              Technology
                            </SelectItem>
                            <SelectItem value="agriculture2">
                              Agriculture
                            </SelectItem>
                            <SelectItem value="construction2">
                              Construction
                            </SelectItem>
                            <SelectItem value="aviation2">Aviation</SelectItem>
                            <SelectItem value="fashion2">Fashion</SelectItem>
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
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verify your business address</FormLabel>
                    <FormDescription>
                      You will need to upload a copy of you utility bill
                      associated to this address in the documentation part of
                      the onboarding.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Your Business Address"
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
                name="businessLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verify your business country</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
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

          {/* TODO: add disabled state when all the fields have not been added */}
          <Button
            disabled={
              isPending ||
              !form.getValues().businessAddress ||
              !form.getValues().businessIndustry ||
              !form.getValues().businessName ||
              !form.getValues().businessLocation
            }
            type="submit"
            className="w-full"
          >
            CONTINUE
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

export default BusinessInformationForm;
