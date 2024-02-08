"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getOtp } from "@/lib/hooks/api/otp.api";
import { Button } from "./ui/button";
import Loader from "./Loader";

const OtpTimer = ({ email }: { email: string }) => {
  const [seconds, setSeconds] = useState(5);
  const [minutes, setMinutes] = useState(0);
  const [loading, setLoading] = useState(false);

  const resendOtp = () => {
    setMinutes(1);
    setSeconds(30);
  };

  const handleResendOtp = async (email: string) => {
    setLoading(true);
    try {
      const data = await getOtp({ email }).finally(() => {
        setLoading(false);
      });
      console.log(data);

      resendOtp();

      toast.success("Otp successfully sent");
    } catch (error) {
      toast.error("An error has occured here");
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <>
      <div className=" p-2 px-5 rounded-lg shadow my-5 w-full">
        <Button
          variant="ghost"
          className=" w-full text-bgPrimary hover:bg-transparent"
          onClick={() => handleResendOtp(email)}
          disabled={seconds > 0 || minutes > 0}
        >
          RESEND OTP
        </Button>
      </div>
      <div>
        <span
          className={`font-bold ${
            minutes === 0 && seconds === 0 && "text-red-500"
          }`}
        >
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default OtpTimer;
