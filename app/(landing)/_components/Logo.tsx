import Image from "next/image";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return <Image src={"/logo_gray.png"} alt="logo" width={267} height={32} />;
};

export default Logo;
