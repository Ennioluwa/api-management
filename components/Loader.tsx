"use client";

import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className=" fixed inset-0 m-0 p-0 space-y-0 w-full h-full grid place-items-center bg-black bg-opacity-50 z-[600]">
      <div className=" w-[88px] h-[88px] rounded-full bg-white grid place-items-center ">
        <ThreeCircles
          visible={true}
          height="48"
          width="48"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          innerCircleColor="#2D2D2D"
          middleCircleColor="#D9D9D9"
          outerCircleColor="#D9D9D9"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default Loader;
