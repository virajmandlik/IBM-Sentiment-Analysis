import React from "react";
import ScratchToRevealDemo from "./ScratchToRevealDemo";

const Temp: React.FC = () => {
  return (
    <section className="my-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Try Our Magic Scratch Feature
      </h2>
      <div className="mt-8 flex justify-center">
        <ScratchToRevealDemo />
      </div>
    </section>
  );
};

export default Temp;
