import Logo from "@/app/(landing)/_components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  text: string;
  link: string;
}

const Navbar: FC<NavbarProps> = ({ text, link }) => {
  return (
    <div className=" fixed top-0 left-0 right-0 h-[80px] w-full ">
      <div className="container flex justify-between items-center p-5">
        <Logo />
        <Link href={link}>
          <Button className=" font-bold text-dark" variant="ghost">
            {text}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
