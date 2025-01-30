import React from "react";
import { RetroGrid } from "@/components/ui/retro-grid";
import insta_pic from "../assets/insta-pic-removebg-preview.png";

export const RetroGridBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen w-full items-center justify-start overflow-y-auto rounded-lg border bg-background md:shadow-xl px-6 md:px-16">
      {/* Header Text */}
      <div className="w-full flex justify-center mb-8 text-center my-10 px-4">
        <p className="text-3xl md:text-5xl font-bold text-primary py-1 my-9 px-4 rounded-md shadow-lg">
          This tool is like a cheat code for social media
        </p>
      </div>

      {/* RetroGrid as the background */}
      <RetroGrid className="absolute inset-0 z-0" />

      {/* Flex container for image and components */}
      <div className="z-10 flex w-full max-w-7xl items-center justify-between gap-8 md:gap-12 flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src={insta_pic}
            alt="Feature Illustration"
            className="w-full max-w-[900px] md:max-w-none h-auto md:h-[90vh] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - ScratchToRevealDemo & TiltCardDemo (Aligned Horizontally) */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center gap-7 md:gap-8">
          {children}
        </div>
      </div>
    </div>
  );
};
