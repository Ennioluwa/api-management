import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className=" p-5 lg:container flex items-center justify-between gap-5 text-dark">
      <div>
        <h5 className=" font-bold mb-2.5">
          Setup your API MANAGEMENT APP account
        </h5>
        <p className=" text-xs">Takes approximately 10 minutes</p>
      </div>
      <div className=" flex items-center gap-2.5">
        <p className="shrink-0 h-8 w-8 rounded-full bg-gray-200"></p>
        <p className=" text-sm font-semibold">Hello, Nusaiba</p>
      </div>
    </nav>
  );
};

export default Navbar;
