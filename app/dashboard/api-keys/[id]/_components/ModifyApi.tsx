"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, FC, useState, useLayoutEffect } from "react";
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
import { toast } from "sonner";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Category2, Code1, Information, UserTag } from "iconsax-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { ModifyApiSchema } from "@/schemas";
import { useUserManagement } from "@/lib/hooks/useUserManagement";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiKeyData, fetchApiKeys } from "@/lib/hooks/api/apiKey.api";
import {
  handleModifyApiChange,
  modifyApiClose,
} from "@/redux/features/apiKeySlice";
import Modal from "@/components/Modal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ModifyApiManagement } from "@/lib/hooks/useAddApi";

type ModifyApiProps = {
  ApiKeyId: string;
};

const ModifyApi: FC<ModifyApiProps> = ({ ApiKeyId }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { isModifyApiOpen } = useAppSelector((state) => state.apiKey);

  const ModifyApiSchema = z.object({
    apiKeyName: z.string().min(1, {
      message: "App Name is required",
    }),
    isValid: z.boolean(),
  });

  const [api, setApi] = useState<ApiKeyData | null>(null);
  const [toggleApi, setToggleApi] = useState(false);
  const [disabledSuccess, setDisabledSuccess] = useState(false);

  const handleToggleApi = () => {};

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard");
      })
      .catch((err) => {
        toast.error("Error while copying to clipboard");
      });
  };

  const { userData } = useAppSelector((state) => state.user);

  const { data: apiKeys } = useQuery({
    queryKey: ["api"],
    queryFn: () => fetchApiKeys({ companyId: userData?.companyId }),
  });

  const {
    isError,
    isSuccess,
    isPending,
    mutate: modifyApi,
    error,
  } = ModifyApiManagement();

  const form = useForm<z.infer<typeof ModifyApiSchema>>({
    resolver: zodResolver(ModifyApiSchema),
    defaultValues: {
      apiKeyName: api?.apiKeyName,
      isValid: api?.isValid,
    },
  });

  useLayoutEffect(() => {
    if (apiKeys) {
      const api = apiKeys.find((api) => api.apiKeyId === ApiKeyId);
      if (api) {
        setApi(api);
        form.setValue("apiKeyName", api.apiKeyName);
        form.setValue("isValid", api.isValid);
      }
    }
  }, [apiKeys]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Api details successfully modified");
      dispatch(modifyApiClose());
      queryClient.refetchQueries({ queryKey: ["api"] });
      queryClient.invalidateQueries({ queryKey: ["api"] });
    } else if (isError) {
      toast.error("Api modification failed");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof ModifyApiSchema>) => {
    console.log(values);
    const { apiKeyName, isValid } = values;
    console.log("api name", apiKeyName);
    if (!api) return;
    modifyApi({ apiId: api.id, isValid, apiKeyName });
  };

  return (
    <div>
      <AlertDialog
        open={isModifyApiOpen}
        onOpenChange={() => dispatch(handleModifyApiChange())}
      >
        <AlertDialogContent className=" bg-white p-0 ">
          <div className="   p-5 rounded-lg">
            <div className=" flex items-center gap-5 text-left">
              <div className=" p-3 bg-white rounded-lg border border-bgPrimary">
                <Code1 variant="Bulk" color="#0062FF" size={24} />
              </div>
              <AlertDialogHeader className="text-left space-y-0">
                <AlertDialogTitle className=" font-bold">
                  Modify APP
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs">
                  Change the name of this app
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 lg:max-w-[440px] mx-auto"
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
                        name="apiKeyName"
                        render={({ field }) => (
                          <FormItem className=" flex-1 relative">
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="API Name"
                                type="text"
                                label="API Name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <hr className=" border-dashed border-[#9A9AAF]" />
                      <h6 className=" text-black text-xs flex items-center gap-2.5">
                        <Code1 variant="Bulk" size={18} color="#2E2E3A" />
                        Advanced Information
                      </h6>
                      <FormField
                        control={form.control}
                        name="apiKeyName"
                        render={({ field }) => (
                          <FormItem className=" flex-1 relative">
                            <FormControl>
                              <Input
                                {...field}
                                disabled={true}
                                placeholder="App Name"
                                type="text"
                                value={api?.apiKeyId}
                                label="API ID"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="apiKeyName"
                        render={({ field }) => (
                          <FormItem className=" flex-1 relative">
                            <FormControl>
                              <Input
                                {...field}
                                disabled={true}
                                placeholder="App Name"
                                type="text"
                                value={api?.apiKeyValue}
                                label="API Key"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <hr className=" border-dashed border-[#9A9AAF]" />
                      <FormField
                        control={form.control}
                        name="isValid"
                        render={({ field }) => (
                          <FormItem className=" flex-1 relative">
                            <FormControl>
                              <div className="flex items-center  justify-between space-x-2">
                                <Label htmlFor="airplane-mode">
                                  Toggle to Deactivate this App
                                </Label>
                                <Switch
                                  disabled={isPending}
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="app-toggle"
                                />
                              </div>
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
                    onClick={() => dispatch(modifyApiClose())}
                  >
                    CANCEL
                  </Button>
                  <Button
                    disabled={isPending || !form.getValues().apiKeyName}
                    type="submit"
                    className="flex-1"
                  >
                    {isPending ? "SAVING..." : "SAVE"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <Modal
        title="TOGGLE OFF API?"
        content={
          <>
            <p>
              When you toggle off the API, it will disrupt your current business
              operation.
            </p>
          </>
        }
        icon={Information}
        open={toggleApi}
        setOpen={setToggleApi}
        cancelButton="Close"
        primaryButton="Proceed"
        primaryButtonAction={handleToggleApi}
      />
      <Modal
        title="API DISABLED"
        content={
          <>
            <p>
              The API has been deactivated and will no longer monitor your
              business records
            </p>
            <p className=" text-xs font-bold pt-2">
              This can lead to issue with your tax issuance{" "}
            </p>
          </>
        }
        icon={Information}
        open={disabledSuccess}
        setOpen={setDisabledSuccess}
        cancelButton="Close"
        primaryButton="Proceed"
        primaryButtonAction={() => console.log("closing")}
      />
    </div>
  );
};

export default ModifyApi;
