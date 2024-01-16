"use client";

import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface PreferencesPageProps {
  setHeader: Dispatch<
    SetStateAction<{
      title: string;
      subtitle: string;
    }>
  >;
}

const PreferencesPage: FC<PreferencesPageProps> = ({ setHeader }) => {
  useEffect(() => {
    setHeader({
      title: "Preferences",
      subtitle:
        "Change appropriate settings relating to your account on the platform",
    });
  }, []);
  return <div>PreferencesPage</div>;
};

export default PreferencesPage;
