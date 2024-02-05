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
import { AddUserModalSchema } from "@/schemas";
import { useUserManagement } from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  handleaddCardChange,
  onaddCardClose,
} from "@/redux/features/subscriptionSlice";

type ModifyCardModalProps = {};

const ModifyCardModal: FC<ModifyCardModalProps> = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { addCard } = useAppSelector((state) => state.subscription);

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

  const form = useForm<z.infer<typeof AddUserModalSchema>>({
    resolver: zodResolver(AddUserModalSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      roles: [],
    },
  });

  const {
    data,
    mutate: addUser,
    isSuccess,
    isError,
    isPending,
  } = useUserManagement();

  useEffect(() => {
    if (isSuccess) {
    } else if (isError) {
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof AddUserModalSchema>) => {
    console.log(values);
    const { firstName, lastName, email, roles } = values;
    console.log(roles, "user role");
    const userRoles = roles.map((role) => role.value);

    addUser({ email, firstName, lastName, roles: userRoles });
  };

  return (
    <div>
      <AlertDialog
        open={addCard}
        onOpenChange={() => dispatch(handleaddCardChange())}
      >
        <AlertDialogContent className=" bg-[#F1F1F1] p-0 ">
          <div className=" bg-white/80  p-5 rounded-lg">
            <div className=" flex items-center gap-5 text-left">
              <div className=" p-2.5 bg-white rounded-lg">
                <UserTag variant="Bulk" color="#0062FF" className=" h-5 w-5" />
              </div>
              <AlertDialogHeader className="text-left space-y-0">
                <AlertDialogTitle className=" font-bold">
                  Modify Card
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs">
                  Change existing parameters of this card
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
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className=" relative">
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="Enter Card Name"
                                type="text"
                                label="Card Name"
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
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="Enter Card Number"
                                type="number"
                                label="Card Number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 text-left">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem className=" flex-1 relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="CCV"
                                  type="number"
                                  label="CCV"
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
                            <FormItem className=" flex-1 relative">
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="Expiry Date"
                                  type="date"
                                  label="Expiry Date"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className=" flex-1 relative">
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  disabled={isPending}
                                  id="airplane-mode"
                                />
                                <Label htmlFor="airplane-mode">
                                  Make default
                                </Label>
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
                    onClick={() => dispatch(onaddCardClose())}
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
                    {isPending ? "SAVING..." : "SAVE INFORMATION"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModifyCardModal;
