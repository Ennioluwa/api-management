"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, FC } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Category2, Information, UserTag } from "iconsax-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleModifyUserOpenChange,
  onModifyUserClose,
  onModifyUserOpen,
} from "@/redux/features/addUserSlice";
import {
  useModifyUserManagement,
  useModifyUserManagementRole,
  useUserManagement,
} from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { AddUserModalSchema } from "@/schemas";
import { handleRole } from "@/lib/utils";

type ModifyUserModalProps = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

const ModifyUserModal: FC<ModifyUserModalProps> = ({
  firstName,
  lastName,
  email,
  roles,
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { isModifyOpen } = useAppSelector((state) => state.userManagement);

  const OPTIONS: Option[] = [
    { label: "Super Admin", value: "ClientAdmins" },
    {
      label: "Sales Representative",
      value: "ClientSalesReps",
    },
    {
      label: "Finance Officers",
      value: "ClientFinanceOfficers",
    },
  ];

  console.log(roles);

  const form = useForm<z.infer<typeof AddUserModalSchema>>({
    resolver: zodResolver(AddUserModalSchema),
    defaultValues: {
      email,
      firstName,
      lastName,
      roles: roles.map((role) => {
        return { value: role, label: handleRole(role) };
      }),
    },
  });

  const {
    data,
    mutate: modifyUser,
    isSuccess,
    isError,
    isPending,
  } = useModifyUserManagementRole();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      toast.success("User successfully modified");
      dispatch(onModifyUserClose());
      queryClient.refetchQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("Modify user failed");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof AddUserModalSchema>) => {
    console.log(values);
    const { firstName, lastName, email, roles } = values;
    const userRoles = roles.map((role) => role.value);

    if (!userRoles.length) {
      return toast.error("Role is required");
    }

    modifyUser({ firstName, lastName, roles: userRoles, email });
  };

  return (
    <div>
      <AlertDialog
        open={isModifyOpen}
        onOpenChange={() => dispatch(handleModifyUserOpenChange())}
      >
        <AlertDialogContent className="p-0 bg-transparent ">
          <div className=" bg-[rgba(255,255,255,0.8)] p-5 rounded-lg">
            <div className=" flex items-center gap-5 text-left">
              <div className=" p-2.5 bg-white z-50 rounded-lg">
                <UserTag variant="Bulk" color="#0062FF" className=" h-5 w-5" />
              </div>
              <AlertDialogHeader className="text-left space-y-0">
                <AlertDialogTitle className=" font-bold">
                  Modify user
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs">
                  Change information to this user such as name and roles
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
                        Basic User Information
                      </h6>
                      <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-left">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className="w-full flex-1 relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="First Name"
                                  type="text"
                                  label="First Name"
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
                            <FormItem className="w-full flex-1 relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="Last Name"
                                  type="text"
                                  label="Last Name"
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
                          <FormItem className=" relative">
                            <FormControl>
                              <Input
                                {...field}
                                disabled={true}
                                placeholder="Enter Email Address"
                                type="email"
                                label="Email Address"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h6 className=" text-black text-xs flex items-center gap-2.5">
                        <Category2 variant="Bulk" size={18} color="#2E2E3A" />
                        Assign Role to user
                      </h6>
                      <FormField
                        control={form.control}
                        name="roles"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <MultipleSelector
                                value={field.value}
                                onChange={field.onChange}
                                options={OPTIONS}
                                className={`${
                                  field.value && "border-bgPrimary bg-white"
                                }`}
                                placeholder="Add More Roles..."
                                emptyIndicator={
                                  <p className="text-center text-lg leading-10 text-bgPrimary ">
                                    No results found.
                                  </p>
                                }
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
                    onClick={() => dispatch(onModifyUserClose())}
                  >
                    CANCEL
                  </Button>
                  <Button
                    disabled={
                      isPending ||
                      !form.getValues().email ||
                      !form.getValues().firstName ||
                      !form.getValues().lastName ||
                      !form.getValues().roles
                    }
                    type="submit"
                    className="flex-1"
                  >
                    {isPending ? "SAVING USER..." : "SAVE USER"}
                  </Button>
                </div>
              </form>
            </Form>
            {isPending && <Loader />}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModifyUserModal;
