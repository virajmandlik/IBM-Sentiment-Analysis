import React from "react";
import { RetroGrid } from "@/components/ui/retro-grid";

export const RetroGridBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {/* Ensure RetroGrid is at the back with z-0 */}
      <RetroGrid className="absolute inset-0 z-0" />
      
      <div className="z-10">
        {children}
      </div>
    </div>
  );
};
