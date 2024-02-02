"use client";

import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react";
import { Icon } from "iconsax-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import OTPInput from "react-otp-input";
import { Button } from "./ui/button";

interface ModalProps {
  title: string;
  content: ReactNode;
  icon?: Icon;
  isOtp?: boolean;
  otp?: string;
  setOtp?: Dispatch<SetStateAction<string>>;
  open: boolean;
  isPending?: boolean;
  isPendingText?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cancelButton?: string;
  primaryButton?: string;
  primaryButtonAction?: () => void;
  resendOtp?: () => void;
  headerTextColor?: string;
}

const Modal: FC<ModalProps> = ({
  title,
  content,
  icon: ModalIcon,
  otp,
  setOtp,
  open,
  setOpen,
  cancelButton,
  primaryButton,
  primaryButtonAction,
  isPending,
  isPendingText,
  isOtp,
  headerTextColor,
  resendOtp,
}) => {
  const handleSubmitOtp = () => {
    if (!otp) return;
    if (otp?.length === 6 && !isPending && primaryButtonAction) {
      console.log("submitting");

      primaryButtonAction();
    }
  };
  useEffect(() => {
    handleSubmitOtp();
  }, [otp]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className=" bg-white p-0 overflow-clip border-none">
        <div className=" p-4 lg:p-8 flex flex-col justify-center items-center">
          {ModalIcon && (
            <ModalIcon
              size="75px"
              color="#0071F2"
              variant="Bold"
              fill="#0071F2"
            />
          )}
          <AlertDialogHeader className=" pt-5">
            <AlertDialogTitle
              className={`font-black text-3xl uppercase ${
                headerTextColor ? `text-[${headerTextColor}]` : "text-bgPrimary"
              } `}
            >
              {title}
            </AlertDialogTitle>
            <div className=" text-black text-base">{content}</div>
          </AlertDialogHeader>
          {isOtp && setOtp && resendOtp && (
            <>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                placeholder="------"
                renderInput={(props) => (
                  <input {...props} className="bg-[#F0F4F9]" />
                )}
                inputStyle={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  width: "40px",
                  height: "50px",
                  fontSize: "20px",
                  color: "#0071F2",
                  fontWeight: "4700",
                  caretColor: "blue",
                }}
                containerStyle={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "20px",
                }}
                shouldAutoFocus
                inputType="text"
              />
              <div className=" p-2 px-5 rounded-lg shadow mt-5 w-full">
                <Button
                  variant="ghost"
                  className=" w-full text-bgPrimary hover:bg-transparent"
                  onClick={resendOtp}
                >
                  RESEND OTP
                </Button>
              </div>
            </>
          )}
        </div>

        {(cancelButton || primaryButton) && (
          <AlertDialogFooter>
            <div className=" w-full mt-5 flex gap-0 m-0 space-x-0">
              {cancelButton && (
                <AlertDialogCancel className=" flex-1 w-full h-[56px] border-none rounded-none">
                  {cancelButton}
                </AlertDialogCancel>
              )}
              {primaryButton && isOtp ? (
                <Button
                  className=" flex-1 w-full h-[56px] m-0 p-0 rounded-none z-20 "
                  onClick={primaryButtonAction}
                  disabled={isPending || !otp || otp?.length != 6}
                >
                  {isPending ? isPendingText : primaryButton}
                </Button>
              ) : (
                <Button
                  className=" flex-1 w-full h-[56px] m-0 p-0 rounded-none z-20 "
                  onClick={primaryButtonAction}
                  disabled={isPending}
                >
                  {isPending ? isPendingText : primaryButton}
                </Button>
              )}
            </div>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
