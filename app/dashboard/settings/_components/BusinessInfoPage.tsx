"use client";

import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface BusinessInfoPageProps {
  setHeader: Dispatch<
    SetStateAction<{
      title: string;
      subtitle: string;
    }>
  >;
}

const BusinessInfoPage: FC<BusinessInfoPageProps> = ({ setHeader }) => {
  useEffect(() => {
    setHeader({
      title: "Contact Setup",
      subtitle: "You can modify your business information here with ease",
    });
  }, []);
  return <div>BusinessInfoPage</div>;
};

export default BusinessInfoPage;
