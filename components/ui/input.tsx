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
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ PrefixIcon, PrefixSvg, variant, className, type, ...props }, ref) => {
    return (
      <div className="relative">
        {PrefixIcon && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute left-0 top-0 h-full px-5 py-2 hover:bg-transparent cursor-default"
            >
              <PrefixIcon
                variant={variant}
                size={18}
                color={`${props.value ? "#0062FF" : "#292D32"}`}
              />
            </Button>
            <div className="absolute left-0 top-0 h-6  mx-12 my-[13px] grid place-items-center hover:bg-transparent">
              <Separator orientation="vertical" />
            </div>
          </>
        )}
        {PrefixSvg && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute left-0 top-0 h-full px-5 py-2 hover:bg-transparent cursor-default"
            >
              <Image src={PrefixSvg} alt="Image" height={24} width={24} />
            </Button>
            <div className="absolute left-0 top-0 h-6  ml-14 my-[13px] grid place-items-center hover:bg-transparent">
              <Separator orientation="vertical" />
            </div>
          </>
        )}

        <input
          type={type}
          className={cn(
            `flex h-[50px] w-full rounded-md border border-input bg-background py-2 px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border focus-visible:border-bgPrimary  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              PrefixIcon && "px-14"
            } ${PrefixSvg && "px-16"} `,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
