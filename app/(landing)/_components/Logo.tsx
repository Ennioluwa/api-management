import Image from "next/image";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return <Image src={"/fiscal.png"} alt="logo" width={110} height={33} />;
};

export default Logo;
