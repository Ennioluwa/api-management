import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "iconsax-react";
import { Separator } from "./separator";
import { Button } from "./button";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  PrefixIcon?: Icon;
  PrefixSvg?: string;
  variant?:
    | "TwoTone"
    | "Linear"
    | "Outline"
    | "Broken"
    | "Bold"
    | "Bulk"
    | undefined;
  label?: string;
  inputValue?: string | number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      PrefixIcon,
      PrefixSvg,
      variant,
      className,
      type,
      label,
      inputValue,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        {PrefixIcon && (
          <>
            <div className="absolute z-50 h-full flex items-center gap-3 left-0 top-0 px-5 py-2 hover:bg-transparent cursor-default">
              <PrefixIcon
                variant={variant}
                size={20}
                color={`${props.value ? "#0062FF" : "#292D32"}`}
              />
              <Separator orientation="vertical" className=" h-6" />
            </div>
          </>
        )}
        {
          <div className="relative w-full h-full pt-1">
            {label && props.value && (
              <span className=" absolute left-5 top-[-4px] text-bgPrimary z-20 bg-white px-2.5 py-0 text-xs">
                {label}
              </span>
            )}
            <input
              type={type}
              className={cn(
                `flex h-[50px] w-full rounded-md border-[2px] border-input bg-background py-2 px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[2px] focus-visible:border-bgPrimary  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  PrefixIcon && "px-[60px]"
                } ${props.value && "border-bgPrimary"} `,
                className
              )}
              ref={ref}
              {...props}
            />
          </div>
        }
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
