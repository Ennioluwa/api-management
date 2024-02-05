import { Home2 } from "iconsax-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface HomeNavProps {
  text: string;
}

const HomeNav: FC<HomeNavProps> = ({ text }) => {
  return (
    <div className=" flex items-center gap-2 mb-2 py-2 text-xs font-bold text-dark ">
      <Link href="/dashboard/home" className=" contents">
        <Home2 variant="Outline" size="18px" color="#292D32" />
        <span className=" font-normal">Home</span>
      </Link>
      <ChevronRight size="16px" />
      <span className=" text-black">{text}</span>
    </div>
  );
};

export default HomeNav;
