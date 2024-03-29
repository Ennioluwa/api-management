import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className=" fixed top-0 left-0 right-0 h-16 w-full bg-white z-50 shadow ">
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
    </div>
  );
};

export default Navbar;
