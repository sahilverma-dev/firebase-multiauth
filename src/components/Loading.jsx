import React from "react";
// icons
import { ImSpinner8 as SpinnerIcon } from "react-icons/im";

const Loading = () => {
  return (
    <div className="min-h-screen w-screen flex items-center flex-col gap-2 justify-center">
      <SpinnerIcon className="animate-spin text-blue-500 text-3xl" />
      <p>Loading</p>
    </div>
  );
};

export default Loading;
