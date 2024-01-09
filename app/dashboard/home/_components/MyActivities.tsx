import { FC } from "react";

interface MyActivitiesProps {}

const MyActivities: FC<MyActivitiesProps> = ({}) => {
  const items = [1, 2, 3, 4, 5];
  return (
    <div className=" p-5 border border-[#9A9AAF] border-dashed rounded-lg">
      <h2 className=" text-3xl font-bold pb-4">My Activities</h2>
      <div className=" flex flex-col gap-4">
        {items.map((number, index) => {
          return (
            <div className=" flex flex-col gap-4">
              <div className=" flex justify-between items-center">
                <div>
                  <h4 className=" font-bold pb-2">Invoice Generation</h4>
                  <div className="flex gap-2">
                    <p>22/2/2022</p>
                    <p>9:35:51 PM</p>
                  </div>
                </div>
                <p className=" rounded-lg py-1 px-2.5 bg-[#FFCF5C]/5 text-[#FFCF5C]">
                  Pending
                </p>
              </div>
              {index !== items.length && (
                <hr className=" border-dashed border-[#9A9AAF)]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyActivities;
