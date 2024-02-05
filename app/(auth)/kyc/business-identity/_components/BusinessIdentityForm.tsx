"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { ShieldSecurity } from "iconsax-react";
import { toast } from "sonner";
import { useBusinessIdentity } from "@/lib/hooks/useBusinessIdentity";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import IsAdminAuth from "@/components/isAdminAuth";
import { setSetupStatus } from "@/redux/features/userSlice";

const BusinessIdentityForm = () => {
  const [open, setOpen] = useState(false);
  const { userData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof BusinessIdentitySchema>>({
    resolver: zodResolver(BusinessIdentitySchema),
    defaultValues: {
      businessTpid: "",
      branchId: "",
      businessSerialNumber: "",
    },
  });

  const router = useRouter();

  const {
    data,
    mutate: identityKyc,
    isPending,
    isSuccess,
    isError,
  } = useBusinessIdentity();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast.success("Information under review");
      dispatch(setSetupStatus("Completed"));
      setOpen(true);
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("An error has occured");
      setOpen(true);
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof BusinessIdentitySchema>) => {
    console.log(values);
    const { businessTpid, branchId, businessSerialNumber } = values;
    identityKyc({
      tpin: businessTpid,
      branchId,
      deviceSerialNumber: businessSerialNumber,
    });
  };
  const handleModalClose = () => {
    setOpen(false);
    router.push("/dashboard/home");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <div className="space-y-6">
            <>
              <FormField
                control={form.control}
                name="businessTpid"
                render={({ field }) => (
                  <FormItem className=" space-y-4">
                    <FormLabel>Your Business TPID</FormLabel>
                    <FormDescription>
                      Enter your business TPID which can be found on your
                      business registration form
                    </FormDescription>
                    <div className="relative w-full h-full">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter TPID"
                          label="Business TPID"
                          type="text"
                        />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr />
              <FormField
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem className=" space-y-4">
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
                        label="Branch Id"
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
                  <FormItem className=" space-y-4">
                    <FormLabel>Business Serial Number</FormLabel>
                    <FormDescription>
                      Your CAC Serial Number is important for verifying the
                      owner of the business as legally recognized by the
                      government
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        label="Serial Number"
                        disabled={isPending}
                        placeholder="Enter Business Serial Number"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>

          {/* TODO: add disabled state when all the fields have not been added */}
          <Button
            disabled={
              isPending ||
              !form.getValues().businessTpid ||
              !form.getValues().businessSerialNumber ||
              !form.getValues().branchId
            }
            type="submit"
            className="w-full"
          >
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
export default IsAdminAuth(BusinessIdentityForm);
