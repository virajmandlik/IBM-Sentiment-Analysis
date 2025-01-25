import React from "react";
import { Tilt } from "@/components/ui/tilt";

export const TiltCardDemo: React.FC = () => {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: "12px",
        }}
        className="flex max-w-[300px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
      >
        <div className="p-4">
          <h1 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-2">
            Instructions
          </h1>
          <p className="text-sm text-zinc-700 dark:text-zinc-400">
            Before scratching, copy the URL of any image you want to reveal
            underneath. Make sure to have the image ready for upload or reference.
          </p>
        </div>
        <img
          src="https://images.beta.cosmos.so/f7fcb95d-981b-4cb3-897f-e35f6c20e830?format=jpeg"
          alt="Ghost in the shell - Kôkaku kidôtai"
          className="h-48 w-full object-cover"
        />
        <div className="p-2">
          <h1 className="font-mono leading-snug text-zinc-950 dark:text-zinc-50">
           <p className="text-xl font-semibold mb-4">Scratch to get amazed</p>
          </h1>
        </div>
      </div>
    </Tilt>
  );
};
