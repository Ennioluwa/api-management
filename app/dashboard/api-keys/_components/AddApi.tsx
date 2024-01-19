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
  Eye,
  EyeSlash,
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
  const [apiId, setApiId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [hidden, setHidden] = useState(true);

  const form = useForm<z.infer<typeof AddApiKeySchema>>({
    resolver: zodResolver(AddApiKeySchema),
    defaultValues: {
      ApiKeyName: "",
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
        title: "Api successfully added",
      });
      dispatch(onClose());
      setOpen(true);
      console.log(data.data.apiKeyId, "api key data");

      setApiKey(data.data.apiKeyId);
      setApiId(data.data.apiKeyValue);
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
    const { ApiKeyName } = values;

    addApi(values);
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
                        name="ApiKeyName"
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
                    disabled={isPending || !form.getValues().ApiKeyName}
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
            <p className=" text-xs pt-2">
              By default, this application is set to “Active”. To deactivate,
              click on he “Manage” button and switch the “Status” toggle from
              the manage page
            </p>
            <div className="font-bold mt-4 p-2.5 bg-[#F0F4F9] rounded-lg text-black space-y-2.5 text-left w-full ">
              <p className=" uppercase">New API Key info</p>
              <p className=" uppercase flex gap-3">
                <span className=" shrink-0">api id</span>
                <span className=" font-normal overflow-auto">{apiId}</span>
              </p>
              <div className=" flex items-center justify-between gap-6">
                <p className="uppercase shrink-0">api key </p>
                <div className=" grow w-full flex items-center gap-2">
                  <p className=" flex flex-wrap justify-start items-center gap-2.5 p-2.5 min-h-[50px] border border-dashed border-[#9A9AAF] rounded-lg grow">
                    {hidden
                      ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <circle cx="6" cy="6" r="6" fill="#2E2E3A" />
                          </svg>
                        ))
                      : apiKey}
                  </p>
                  {hidden ? (
                    <Eye
                      variant="Bulk"
                      size={18}
                      onClick={() => setHidden(false)}
                      className=" shrink-0 cursor-pointer"
                    />
                  ) : (
                    <EyeSlash
                      variant="Bulk"
                      size={18}
                      onClick={() => setHidden(true)}
                      className=" shrink-0 cursor-pointer"
                    />
                  )}
                </div>
              </div>
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
