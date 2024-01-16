import { PuffLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" w-full h-full grid place-items-center py-20">
      <PuffLoader color="#0062FF" />
    </div>
  );
}
