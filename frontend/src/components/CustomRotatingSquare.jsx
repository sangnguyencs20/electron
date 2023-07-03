import { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";

const CustomRotatingSquare = () => {
  return (
    <div className="fixed w-full h-screen z-[500]">
      {/* Transparent overlay */}
      <div className="fixed w-full h-full  bg-slate-50 top-0 left-0 z-50 overflow-hidden opacity-50"></div>
      <div className="z-50 fixed w-full h-full flex justify-center items-center top-0 left-0">
        <ThreeCircles
          height="100"
          width="100"
          color="#3b82f6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>

      {/* RotatingSquare component */}
    </div>
  );
};

export default CustomRotatingSquare;
