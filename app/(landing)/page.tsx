"use client";

import { FC } from "react";
import HeroPage from "./_components/HeroPage";
import OpenAccount from "./_components/OpenAccount";
import Services from "./_components/Services";
import Documentation from "./_components/Documentation";
import Questions from "./_components/Questions";
import Footer from "./_components/Footer";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className=" h-full w-full">
      <HeroPage />
      <OpenAccount />
      <Services />
      <Documentation />
      <Questions />
      <Footer />
    </div>
  );
};

export default page;
