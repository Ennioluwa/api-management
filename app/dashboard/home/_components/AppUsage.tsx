import { FC } from "react";

interface AppUsageProps {}

const AppUsage: FC<AppUsageProps> = ({}) => {
  return (
    <div className=" text-white bg-bgPrimary p-6 rounded-lg">
      <h5>App Usage</h5>
      <p>
        View your daily, weekly, and monthly usage of the service via this
        oversimplified overview interface to help you understand how you are
        using the service.
      </p>
      <div className=" flex flex-col lg:flex-row">
        <div>
          <p>INVOICES PROCESSED</p>
          <p>129324</p>
          <p>Compared to 399201 last month</p>
        </div>
      </div>
    </div>
  );
};

export default AppUsage;
