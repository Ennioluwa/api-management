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
import { toast } from "sonner";
import { useBusinessInformation } from "@/lib/hooks/useBusinessInformation";
import { BusinessInformationSchema } from "@/schemas";
import { setCompanyId, setSetupStatus } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import Loader from "@/components/Loader";
import { optionsCategory } from "@/data/data";

const BusinessInformationForm = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof BusinessInformationSchema>>({
    resolver: zodResolver(BusinessInformationSchema),
    defaultValues: {
      businessAddress: "",
      businessName: "",
      businessIndustry: "",
      businessLocation: "",
      phone: "",
    },
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

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
      dispatch(setSetupStatus("CompanyCreated"));
      dispatch(setCompanyId(data.data.id));
      toast.success("Details captured successfully");
      setOpen(true);
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("An error has occured");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof BusinessInformationSchema>) => {
    console.log(values);
    const {
      businessAddress,
      businessName,
      businessIndustry,
      businessLocation,
      phone,
    } = values;
    informationKyc({
      name: businessName,
      email: businessIndustry,
      address: businessAddress,
      country: businessLocation,
      phone: phone,
    });
  };

  const handleModalClose = () => {
    setOpen(false);
    router.push("/kyc/business-identity");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <div className=" gap-6 flex flex-col">
            <>
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <FormLabel>What is your official business name?</FormLabel>
                    <FormDescription>
                      This must be the actual name on your official document.
                      This info cannot be changed
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        label="Business Name"
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
                  <FormItem className="relative w-full">
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
                        <SelectTrigger
                          label="Business Industry"
                          selectValue={field.value}
                          className="w-full"
                        >
                          <SelectValue placeholder="Select Business Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Industry</SelectLabel>
                            {optionsCategory.map((category, index) => (
                              <SelectItem key={index} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}

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
                  <FormItem className="relative w-full">
                    <FormLabel>Verify your business address</FormLabel>
                    <FormDescription>
                      You will need to upload a copy of you utility bill
                      associated to this address in the documentation part of
                      the onboarding.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        label="Business Address"
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
                  <FormItem className="relative w-full">
                    <FormLabel>Verify your business country</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger
                          label="Country"
                          selectValue={field.value}
                        >
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className=" w-full">
                    <FormLabel className=" mb-2">
                      Verify your phone number
                    </FormLabel>
                    <div className="relative">
                      {field.value && (
                        <FormLabel className=" font-normal absolute left-5 -top-[8px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                          Phone
                        </FormLabel>
                      )}
                      <FormControl>
                        <PhoneInputWithCountrySelect
                          {...field}
                          defaultCountry="NG"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          disabled={isPending}
                          placeholder="Enter phone number"
                          className={` flex h-[50px] mt-2 w-full rounded-md border-[2px] border-bgPrimary bg-background py-2 px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border focus-visible:border-bgPrimary  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-within:border-bgPrimary ${
                            field.value
                              ? "border-bgPrimary bg-white "
                              : "border-border"
                          } `}
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <Button
            disabled={
              isPending ||
              !form.getValues().businessAddress ||
              !form.getValues().businessIndustry ||
              !form.getValues().businessName ||
              !form.getValues().businessLocation ||
              !form.getValues().phone
            }
            type="submit"
            className="w-full"
          >
            CONTINUE
          </Button>
        </form>
      </Form>
      {isPending && <Loader />}

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
