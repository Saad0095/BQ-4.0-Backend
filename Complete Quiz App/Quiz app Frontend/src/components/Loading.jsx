import React from "react";
import { ClockLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <ClockLoader />
    </div>
  );
};

export default Loading;
