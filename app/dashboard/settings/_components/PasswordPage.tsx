"use client";

import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface PasswordPageProps {
  setHeader: Dispatch<
    SetStateAction<{
      title: string;
      subtitle: string;
    }>
  >;
}

const PasswordPage: FC<PasswordPageProps> = ({ setHeader }) => {
  useEffect(() => {
    setHeader({
      title: "Modify Password",
      subtitle: "Easily change your password here",
    });
  }, []);
  return <div>PasswordPage</div>;
};

export default PasswordPage;
