import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className=" bg-[#2E2E3A] text-white py-24 px-5 lg:px-10">
      <div className="lg:container text-center flex flex-col gap-5">
        <h3 className=" text-4xl font-bold">API MGT. APP</h3>
        <p className=" text-xl text-[#F7F7EE] ">
          Our Service was created for the new ways we live and work. We make
          automation faster and easier for businesses thanks to our incredible
          technology.
        </p>
        <div className=" h-[1px] border-dashed border-[1px]" />
        <div className="flex items-center justify-between gap-5">
          <p>© 2023 API MGT. Inc. Copyright and rights reserved</p>
          <p>Icons</p>
          <p>Terms and Conditions . Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
