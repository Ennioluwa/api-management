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
    <div className=" fixed top-0 left-0 right-0 h-16 w-full bg-white z-50 shadow ">
      <div className="container flex justify-between items-center px-5 h-full">
        <Logo landing />
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
