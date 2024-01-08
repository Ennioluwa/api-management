import { FC } from "react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="fixed top-0 left-0 w-full p-5  text-dark z-10 bg-white shadow-sm">
      <div className="lg:container flex items-center justify-between gap-5">
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
      </div>
    </nav>
  );
};

export default Navbar;
