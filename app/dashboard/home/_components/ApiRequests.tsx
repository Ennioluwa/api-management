import { FC } from "react";

interface ApiRequestsProps {
  empty?: boolean;
}

const ApiRequests: FC<ApiRequestsProps> = ({ empty }) => {
  return (
    <div
      className={`${
        empty
          ? " bg-white text-black"
          : " bg-transparent p-5 border border-dashed border-white text-white"
      } flex  justify-between items-center gap-5 rounded-lg w-full flex-1`}
    >
      <div className=" space-y-1">
        <p className=" text-xs font-bold">API REQUESTS</p>
        <p className=" text-3xl font-bold">137001321</p>
        <p className=" font-bold text-xs">from last 10 days</p>
      </div>
      <svg
        width="114"
        height="74"
        viewBox="0 0 114 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4.83325" y="55" width="5" height="14" fill="#F1F1F1" />
        <rect x="14.8333" y="43" width="5" height="26" fill="#F1F1F1" />
        <rect x="24.8333" y="62" width="5" height="7" fill="#F1F1F1" />
        <rect x="34.8333" y="22" width="5" height="47" fill="#F1F1F1" />
        <rect x="44.8333" y="29" width="5" height="40" fill="#F1F1F1" />
        <rect x="54.8333" y="16" width="5" height="53" fill="#F1F1F1" />
        <rect x="64.8333" y="35" width="5" height="34" fill="#F1F1F1" />
        <rect x="74.8333" y="40" width="5" height="29" fill="#F1F1F1" />
        <rect x="84.8333" y="25" width="5" height="44" fill="#F1F1F1" />
        <rect x="94.8333" y="22" width="5" height="47" fill="#F1F1F1" />
        <rect x="104.833" y="58" width="5" height="11" fill="#F1F1F1" />
      </svg>
    </div>
  );
};

export default ApiRequests;
