"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface LogoProps {
  landing?: boolean;
}

const Logo: FC<LogoProps> = ({ landing }) => {
  return (
    <Link href={landing ? "/" : "/dashboard/home"}>
      <Image
        src={"/FiscalLogoNew.png"}
        alt="logo"
        width={150}
        height={33}
        priority
      />
    </Link>
  );
};

export default Logo;
