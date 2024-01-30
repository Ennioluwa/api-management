import { FC } from "react";
import AccountUsers from "./AccountUsers";

interface ActivitiesProps {}

const Activities: FC<ActivitiesProps> = ({}) => {
  return (
    <div className=" p-5 bg-white rounded-lg flex flex-col gap-5">
      <AccountUsers />
    </div>
  );
};

export default Activities;
