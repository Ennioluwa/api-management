"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, FC, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Category2,
  Code,
  Code1,
  Information,
  ShieldSecurity,
  UserTag,
} from "iconsax-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AddApiKeySchema } from "@/schemas";
import { useQueryClient } from "@tanstack/react-query";
import { useApiManagement } from "@/lib/hooks/useAddApi";
import Modal from "@/components/Modal";
import { handleOpenChange, onClose } from "@/redux/features/apiKeySlice";
import { Textarea } from "@/components/ui/textarea";

const AddApiKey = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { isOpen } = useAppSelector((state) => state.apiKey);
  console.log(isOpen, "is open status");

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof AddApiKeySchema>>({
    resolver: zodResolver(AddApiKeySchema),
    defaultValues: {
      email: "",
      name: "",
      description: "",
    },
  });

  const {
    data,
    mutate: addApi,
    isSuccess,
    isError,
    isPending,
  } = useApiManagement();

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast({
        title: "User successfully added",
        description: "An email has been sent to the user to be added",
      });
      dispatch(onClose());
      setOpen(true);
      queryClient.refetchQueries({ queryKey: ["api"] });
      queryClient.invalidateQueries({ queryKey: ["api"] });
    } else if (isError) {
      console.log(isError, data, "error state");
      toast({
        description: "Add user failed",
      });
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof AddApiKeySchema>) => {
    console.log(values);
    const { description, name, email } = values;

    addApi({ name, email, description });
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AlertDialog
        open={isOpen}
        onOpenChange={() => dispatch(handleOpenChange())}
      >
        <AlertDialogContent className=" bg-white p-0 ">
          <div className="   p-5 rounded-lg">
            <div className=" flex items-center gap-5 text-left">
              <div className=" p-3 bg-white rounded-lg border border-bgPrimary">
                <Code1 variant="Bulk" color="#0062FF" size={24} />
              </div>
              <AlertDialogHeader className="text-left space-y-0">
                <AlertDialogTitle className=" font-bold">
                  Create a New Application
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs">
                  Define all the parameters to create a new API
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 lg:max-w-xl mx-auto"
              >
                <div className="">
                  <div className=" p-5 bg-white rounded-lg mt-5 flex flex-col gap-5">
                    <>
                      <h6 className=" text-black text-xs flex items-center gap-2.5">
                        <Information variant="Bulk" size={18} color="#2E2E3A" />
                        Basic Customer Information
                      </h6>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className=" flex-1 relative">
                            {field.value && (
                              <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                                App Name
                              </FormLabel>
                            )}
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="App Name"
                                type="text"
                                className={`${
                                  field.value && "border-bgPrimary bg-white "
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className=" relative">
                            {field.value && (
                              <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                                App Contact Email Address
                              </FormLabel>
                            )}
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="Enter Email Address"
                                type="email"
                                className={`${
                                  field.value && "border-bgPrimary bg-white"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className=" relative">
                            {field.value && (
                              <FormLabel className=" absolute left-5 top-[0px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                                Description
                              </FormLabel>
                            )}
                            <FormControl>
                              <Textarea
                                {...field}
                                disabled={isPending}
                                placeholder="Add Description"
                                className={`${
                                  field.value && "border-bgPrimary bg-white"
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-5">
                  <Button
                    variant="ghost"
                    className="flex-1 bg-white font-bold text-bgPrimary"
                    type="button"
                    onClick={() => dispatch(onClose())}
                  >
                    CANCEL
                  </Button>
                  <Button
                    disabled={
                      isPending ||
                      !form.getValues().email ||
                      !form.getValues().name ||
                      !form.getValues().description
                    }
                    type="submit"
                    className="flex-1"
                  >
                    {isPending ? "CREATING API..." : "CREATE API"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <Modal
        title="NEW APP CREATED"
        content={
          <>
            <p>
              Your new API app has been created. Below are the relevant
              information
            </p>
            <p>
              By default, this application is set to “Inactive” as you can only
              have only one API app “Active” at once. To activate, click on he
              “Manage” button and switch the “Status” toggle from the manage
              page
            </p>
            <div>
              <p className=" uppercase">New API Key info</p>
              <p className=" uppercase">api id</p>
              <p className="uppercase">api key</p>
            </div>
          </>
        }
        icon={ShieldSecurity}
        open={open}
        setOpen={setOpen}
        primaryButton="Close"
        primaryButtonAction={handleModalClose}
      />
    </div>
  );
};

export default AddApiKey;
