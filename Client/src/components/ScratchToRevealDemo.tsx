import React, { useState } from "react";
import { ScratchToReveal } from "@/components/ui/scratch-to-reveal";
import { ShinyButtonDemo } from "./ShinyButtonDemo";

const ScratchToRevealDemo: React.FC = () => {
  const [isScratched, setIsScratched] = useState(false);

  const handleComplete = () => {
    console.log("Scratch complete!");
    setIsScratched(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background p-6">
      {/* Text above the scratch card */}
      

      <ScratchToReveal
        width={250}
        height={250}
        minScratchPercentage={70}
        className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
        onComplete={handleComplete}
        gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
      >
        <p className="text-9xl">😎</p>
      </ScratchToReveal>

      {isScratched && (
        <div className="mt-4">
          <ShinyButtonDemo />
        </div>
      )}
    </div>
  );
};

export default ScratchToRevealDemo;
