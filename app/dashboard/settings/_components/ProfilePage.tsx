"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUserRegister } from "@/lib/hooks/useUserRegister";
import { Direct, UserCirlceAdd } from "iconsax-react";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import Loader from "@/components/Loader";
import { useModifyUserManagement } from "@/lib/hooks/useUserManagement";
import { setName } from "@/redux/features/userSlice";

interface ProfilePageProps {
  setHeader: Dispatch<
    SetStateAction<{
      title: string;
      subtitle: string;
    }>
  >;
}

const ProfilePage: FC<ProfilePageProps> = ({ setHeader }) => {
  const { userData } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const roles = [
    { label: "Super Admin", id: "ClientAdmins" },
    {
      label: "Sales Representative",
      id: "ClientSalesReps",
    },
    {
      label: "Finance Officers",
      id: "ClientFinanceOfficers",
    },
  ];

  const FormSchema = z.object({
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    roles: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      roles: userData?.roles || [],
    },
  });

  // TODO  change endpoint

  const {
    data,
    mutate: modify,
    isSuccess,
    isError,
    isPending,
  } = useModifyUserManagement();

  useEffect(() => {
    if (isSuccess) {
      console.log(isSuccess, data, "success state");
      dispatch(
        setName({
          firstName: form.getValues().firstName,
          lastName: form.getValues().lastName,
        })
      );
      toast.success("User details saved");
    } else if (isError) {
      console.log(isError, data, "error state");
      toast.error("Error while saving user details");
    } else return;
  }, [isSuccess, isError]);

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const { firstName, lastName } = values;

    modify({ firstName, lastName });
  };

  useEffect(() => {
    setHeader({
      title: "Profile Settings",
      subtitle:
        "Modify your profile information and make adjustments to the editable ones below",
    });
  }, []);

  return (
    <div className="py-3 px-5 bg-white lg:max-w-[468px]">
      <p className=" flex gap-2 items-center text-black text-xs pb-5">
        <UserCirlceAdd variant="Bulk" size={18} />
        Profile Settings
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="flex flex-col gap-5">
            <>
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-left">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className=" w-full relative">
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
                    <FormItem className=" w-full relative">
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
              <p className=" font-bold">Role at the business</p>
              <FormField
                control={form.control}
                name="roles"
                render={() => (
                  <FormItem>
                    <div className="mb-4 flex items-center justify-between gap-5">
                      {/* <FormLabel className="text-base">Sidebar</FormLabel> */}
                      {roles.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="roles"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row flex-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    disabled
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-xs">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
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
              !form.getValues().firstName ||
              !form.getValues().lastName
            }
            type="submit"
            className="w-full"
          >
            {isPending ? "SAVING..." : "SAVE"}
          </Button>
        </form>
      </Form>
      {isPending && <Loader />}
    </div>
  );
};

export default ProfilePage;
