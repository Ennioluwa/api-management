import Image from "next/image";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <img
      src={"/FiscalLogoNew.png"}
      alt="logo"
      width={150}
      height={33}
      // quality={100}
    />
  );
};

export default Logo;
