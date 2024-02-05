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
import { handleOpenChange, onClose } from "@/redux/features/addUserSlice";
import { AddUserModalSchema } from "@/schemas";
import { useUserManagement } from "@/lib/hooks/useUserManagement";
import { useQueryClient } from "@tanstack/react-query";
import AtmCard from "./AtmCard";
import {
  handlechangePaymentChange,
  handlerevertPromptChange,
  onaddCardOpen,
  onchangePaymentClose,
  onrevertSuccessOpen,
} from "@/redux/features/subscriptionSlice";

type ChangePaymentMethodProps = {};

const ChangePaymentMethod: FC<ChangePaymentMethodProps> = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const {
    deletePrompt,
    deleteSuccess,
    addCard,
    revertPrompt,
    revertSuccess,
    modifyCard,
    changePayment,
  } = useAppSelector((state) => state.subscription);

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
      console.log(isSuccess, data, "success state");
      toast.success("");
      dispatch(onClose());
      queryClient.refetchQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("");
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
        open={changePayment}
        onOpenChange={() => dispatch(handlechangePaymentChange())}
      >
        <AlertDialogContent className=" bg-transparent p-0 ">
          <div className=" bg-white/80  p-5 rounded-lg">
            <div className=" flex items-center gap-5 text-left">
              <div className=" p-2.5 bg-white rounded-lg">
                <UserTag variant="Bulk" color="#0062FF" className=" h-5 w-5" />
              </div>
              <AlertDialogHeader className="text-left space-y-0">
                <AlertDialogTitle className=" font-bold">
                  Change Payment Option
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs">
                  Switch to another option to receive payment easily
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 lg:max-w-[440px] mx-auto bg-white p-5 rounded-lg mt-5"
              >
                <AtmCard />
                <hr className=" border-dashed border-[#9A9AAF)]" />
                <div
                  onClick={() => {
                    dispatch(onaddCardOpen());
                    dispatch(onchangePaymentClose());
                  }}
                  className=" cursor-pointer hover:bg-gray-100 border border-dashed rounded-lg p-5 flex flex-col gap-2 items-center"
                >
                  <div className="h-[50px] w-[50px] rounded-full grid place-items-center text-bgPrimary border border-dashed ">
                    +
                  </div>
                  <p className=" font-bold text-xs">Add New Payment Method</p>
                </div>
                <hr className=" border-dashed border-[#9A9AAF)]" />
                <p
                  onClick={() => {
                    dispatch(onrevertSuccessOpen());
                    dispatch(onchangePaymentClose());
                  }}
                  className=" text-bgPrimary underline decoration-bgPrimary text-center font-bold cursor-pointer"
                >
                  Revert to Default
                </p>
                <div className="flex justify-between items-center gap-5">
                  <Button
                    variant="ghost"
                    className="flex-1 bg-white font-bold text-bgPrimary"
                    type="button"
                    onClick={() => dispatch(onchangePaymentClose())}
                  >
                    CANCEL SELECTION
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
                    {isPending ? "PROCESSING..." : "CONTINUE WITH SELECTION"}
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

export default ChangePaymentMethod;
