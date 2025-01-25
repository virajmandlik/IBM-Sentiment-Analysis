import React from "react";
import { RetroGrid } from "@/components/ui/retro-grid";

export const RetroGridBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {/* RetroGrid as the background */}
      <RetroGrid className="absolute inset-0 z-0" />
      
      {/* Horizontal layout with increased spacing */}
      <div className="z-10 flex flex-row items-center justify-center gap-24">
        {children}
      </div>
    </div>
  );
};
